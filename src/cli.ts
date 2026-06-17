import { Command } from "commander";
import { ExecaCommandRunner } from "./core/command-runner.js";
import { normalizeError } from "./core/errors.js";
import { ConsoleOutput } from "./core/output.js";
import { runBackup } from "./commands/backup.js";
import { runDoctor } from "./commands/doctor.js";
import { runSetup } from "./commands/setup.js";
import { defaultWatchThresholds, runWatch } from "./commands/watch.js";
import { resolveLanguage } from "./i18n/index.js";
import { ConfigService } from "./services/config.js";
import { GitService } from "./services/git.js";
import { GitHubCliService } from "./services/github-cli.js";
import { InstallerService } from "./services/installer.js";
import { version } from "./version.js";

export function createCli(): Command {
  const program = new Command();

  program
    .name("aicodebackup")
    .description("Automatic private GitHub backups for AI-generated code.")
    .version(version)
    .option("--lang <language>", "Output language: en or zh-CN");

  program
    .command("doctor")
    .description("Check whether AICodeBackup can back up this project.")
    .option("--lang <language>", "Output language: en or zh-CN")
    .action(async (options: { lang?: string }, command: Command) => {
      await withServices(readLanguageOption(options, command), async ({ git, gh, output, language }) => {
        await runDoctor(git, gh, output, language);
      });
    });

  program
    .command("backup")
    .description("Back up the current project to GitHub.")
    .option("--lang <language>", "Output language: en or zh-CN")
    .action(async (options: { lang?: string }, command: Command) => {
      await withServices(readLanguageOption(options, command), async ({ git, output, language, config }) => {
        const result = await runBackup(git, output, language);
        if (result.backedUp) {
          config.setLastBackupAt(new Date().toISOString());
        }
      });
    });

  program
    .command("setup")
    .description("Connect this project to a private GitHub repository and run the first backup.")
    .option("--lang <language>", "Output language: en or zh-CN")
    .action(async (options: { lang?: string }, command: Command) => {
      await withServices(
        readLanguageOption(options, command),
        async ({ git, gh, installer, output, language, config }) => {
          await runSetup(git, gh, installer, output, language);
          config.setLastBackupAt(new Date().toISOString());
        },
      );
    });

  program
    .command("watch")
    .description("Watch local changes and recommend backups before risky work is left unprotected.")
    .option("--lang <language>", "Output language: en or zh-CN")
    .option("--auto", "Automatically back up when risk thresholds are reached.")
    .option("--interval <seconds>", "Watch interval in seconds.", "30")
    .option("--files <count>", "Changed file threshold.", String(defaultWatchThresholds.changedFiles))
    .option("--lines <count>", "Diff line threshold.", String(defaultWatchThresholds.diffLines))
    .option(
      "--minutes <count>",
      "Minutes since last backup threshold.",
      String(defaultWatchThresholds.minutesSinceLastBackup),
    )
    .option("--once", "Run one watch check and exit.")
    .action(async (options: WatchCommandOptions, command: Command) => {
      await withServices(readLanguageOption(options, command), async ({ git, output, language, config }) => {
        await runWatch(git, output, language, config, {
          auto: Boolean(options.auto),
          intervalMs: parsePositiveNumber(options.interval, 30) * 1000,
          once: Boolean(options.once),
          thresholds: {
            changedFiles: parsePositiveNumber(options.files, defaultWatchThresholds.changedFiles),
            diffLines: parsePositiveNumber(options.lines, defaultWatchThresholds.diffLines),
            minutesSinceLastBackup: parsePositiveNumber(
              options.minutes,
              defaultWatchThresholds.minutesSinceLastBackup,
            ),
          },
        });
      });
    });

  return program;
}

function readLanguageOption(options: { lang?: string }, command: Command): string | undefined {
  return options.lang ?? (command.parent?.opts<{ lang?: string }>().lang);
}

interface WatchCommandOptions {
  lang?: string;
  auto?: boolean;
  interval?: string;
  files?: string;
  lines?: string;
  minutes?: string;
  once?: boolean;
}

function parsePositiveNumber(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

interface Services {
  git: GitService;
  gh: GitHubCliService;
  installer: InstallerService;
  output: ConsoleOutput;
  language: ReturnType<typeof resolveLanguage>;
  config: ConfigService;
}

async function withServices(
  languageInput: string | undefined,
  action: (services: Services) => Promise<void>,
): Promise<void> {
  const config = new ConfigService();
  const language = resolveLanguage(languageInput ?? config.getLanguage());
  const output = new ConsoleOutput();
  const runner = new ExecaCommandRunner();
  const git = new GitService(runner);
  const gh = new GitHubCliService(runner);
  const installer = new InstallerService(runner);

  try {
    if (languageInput) {
      config.setLanguage(language);
    }
    await action({ git, gh, installer, output, language, config });
  } catch (error) {
    const normalized = normalizeError(error);
    output.error(normalized.message);
    if (normalized.nextStep) {
      output.info(normalized.nextStep);
    }
    process.exitCode = 1;
  }
}
