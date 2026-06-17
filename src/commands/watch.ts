import { setTimeout as sleep } from "node:timers/promises";
import inquirer from "inquirer";
import { AICodeBackupError } from "../core/errors.js";
import type { Output } from "../core/output.js";
import { nextStep } from "../core/output.js";
import { t, type Language } from "../i18n/index.js";
import type { GitService } from "../services/git.js";
import { runBackup } from "./backup.js";

export interface WatchConfig {
  getLastBackupAt(): string | undefined;
  setLastBackupAt(timestamp: string): void;
}

export interface WatchThresholds {
  changedFiles: number;
  diffLines: number;
  minutesSinceLastBackup: number;
}

export interface WatchOptions {
  auto: boolean;
  intervalMs: number;
  once?: boolean;
  thresholds: WatchThresholds;
  now?: () => Date;
}

export interface WatchRiskReport {
  risky: boolean;
  changedFiles: number;
  diffLines: number;
  minutesSinceLastBackup?: number;
  hasLastBackup: boolean;
}

export interface WatchPrompt {
  confirmBackup(language: Language): Promise<boolean>;
}

export class InquirerWatchPrompt implements WatchPrompt {
  async confirmBackup(language: Language): Promise<boolean> {
    const answers = await inquirer.prompt<{ backupNow: boolean }>([
      {
        type: "confirm",
        name: "backupNow",
        message: t(language, "watch.prompt"),
        default: true,
      },
    ]);

    return answers.backupNow;
  }
}

export const defaultWatchThresholds: WatchThresholds = {
  changedFiles: 5,
  diffLines: 200,
  minutesSinceLastBackup: 30,
};

export async function runWatch(
  git: GitService,
  output: Output,
  language: Language,
  config: WatchConfig,
  options: WatchOptions,
  prompt: WatchPrompt = new InquirerWatchPrompt(),
): Promise<void> {
  if (!(await git.isRepository())) {
    throw new AICodeBackupError(
      t(language, "watch.requireGitRepo"),
      nextStep(language, "watch.nextSetup"),
    );
  }

  if (!(await git.hasRemote())) {
    throw new AICodeBackupError(
      t(language, "watch.requireRemote"),
      nextStep(language, "watch.nextSetup"),
    );
  }

  output.info(t(language, "watch.title"));
  output.info(t(language, options.auto ? "watch.modeAuto" : "watch.modePrompt"));
  output.info(
    t(language, "watch.thresholds", {
      files: String(options.thresholds.changedFiles),
      lines: String(options.thresholds.diffLines),
      minutes: String(options.thresholds.minutesSinceLastBackup),
    }),
  );

  let lastPromptSignature: string | undefined;

  while (true) {
    const report = await getWatchRiskReport(git, config, options.thresholds, options.now?.() ?? new Date());

    if (report.risky) {
      printRiskReport(output, language, report);

      if (options.auto) {
        output.info(t(language, "watch.autoBackupStarted"));
        await runWatchBackup(git, output, language, config, options.now?.() ?? new Date());
        lastPromptSignature = undefined;
      } else {
        const signature = getRiskSignature(report);
        if (signature !== lastPromptSignature) {
          lastPromptSignature = signature;
          if (await prompt.confirmBackup(language)) {
            await runWatchBackup(git, output, language, config, options.now?.() ?? new Date());
            lastPromptSignature = undefined;
          } else {
            output.info(t(language, "watch.backupSkipped"));
          }
        }
      }
    }

    if (options.once) {
      return;
    }

    await sleep(options.intervalMs);
  }
}

export async function getWatchRiskReport(
  git: GitService,
  config: WatchConfig,
  thresholds: WatchThresholds,
  now = new Date(),
): Promise<WatchRiskReport> {
  const changedFiles = await git.changedFileCount();
  const diffLines = changedFiles > 0 ? await git.diffLineCount() : 0;
  const lastBackupAt = config.getLastBackupAt();
  const minutesSinceLastBackup = lastBackupAt ? minutesBetween(lastBackupAt, now) : undefined;

  return {
    changedFiles,
    diffLines,
    minutesSinceLastBackup,
    hasLastBackup: Boolean(lastBackupAt),
    risky:
      changedFiles > 0 &&
      (changedFiles >= thresholds.changedFiles ||
        diffLines >= thresholds.diffLines ||
        !lastBackupAt ||
        (minutesSinceLastBackup ?? 0) >= thresholds.minutesSinceLastBackup),
  };
}

function printRiskReport(output: Output, language: Language, report: WatchRiskReport): void {
  output.warning(t(language, "watch.riskDetected"));
  output.info(t(language, "watch.changedFiles", { count: String(report.changedFiles) }));
  output.info(t(language, "watch.diffLines", { count: String(report.diffLines) }));
  output.info(
    report.hasLastBackup
      ? t(language, "watch.lastBackupAge", { minutes: String(report.minutesSinceLastBackup ?? 0) })
      : t(language, "watch.noLastBackup"),
  );
}

async function runWatchBackup(
  git: GitService,
  output: Output,
  language: Language,
  config: WatchConfig,
  timestamp: Date,
): Promise<void> {
  const result = await runBackup(git, output, language, timestamp);
  if (result.backedUp) {
    config.setLastBackupAt(timestamp.toISOString());
  }
}

function getRiskSignature(report: WatchRiskReport): string {
  return [
    report.changedFiles,
    report.diffLines,
    report.hasLastBackup ? report.minutesSinceLastBackup : "none",
  ].join(":");
}

function minutesBetween(start: string, end: Date): number | undefined {
  const parsed = new Date(start);
  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }

  return Math.max(0, Math.floor((end.getTime() - parsed.getTime()) / 60000));
}
