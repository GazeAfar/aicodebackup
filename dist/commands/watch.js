import { setTimeout as sleep } from "node:timers/promises";
import inquirer from "inquirer";
import { AICodeBackupError } from "../core/errors.js";
import { nextStep } from "../core/output.js";
import { t } from "../i18n/index.js";
import { runBackup } from "./backup.js";
export class InquirerWatchPrompt {
    async confirmBackup(language) {
        const answers = await inquirer.prompt([
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
export const defaultWatchThresholds = {
    changedFiles: 5,
    diffLines: 200,
    minutesSinceLastBackup: 30,
};
export async function runWatch(git, output, language, config, options, prompt = new InquirerWatchPrompt()) {
    if (!(await git.isRepository())) {
        throw new AICodeBackupError(t(language, "watch.requireGitRepo"), nextStep(language, "watch.nextSetup"));
    }
    if (!(await git.hasRemote())) {
        throw new AICodeBackupError(t(language, "watch.requireRemote"), nextStep(language, "watch.nextSetup"));
    }
    output.info(t(language, "watch.title"));
    output.info(t(language, options.auto ? "watch.modeAuto" : "watch.modePrompt"));
    output.info(t(language, "watch.thresholds", {
        files: String(options.thresholds.changedFiles),
        lines: String(options.thresholds.diffLines),
        minutes: String(options.thresholds.minutesSinceLastBackup),
    }));
    let lastPromptSignature;
    while (true) {
        const report = await getWatchRiskReport(git, config, options.thresholds, options.now?.() ?? new Date());
        if (report.risky) {
            printRiskReport(output, language, report);
            if (options.auto) {
                output.info(t(language, "watch.autoBackupStarted"));
                await runWatchBackup(git, output, language, config, options.now?.() ?? new Date());
                lastPromptSignature = undefined;
            }
            else {
                const signature = getRiskSignature(report);
                if (signature !== lastPromptSignature) {
                    lastPromptSignature = signature;
                    if (await prompt.confirmBackup(language)) {
                        await runWatchBackup(git, output, language, config, options.now?.() ?? new Date());
                        lastPromptSignature = undefined;
                    }
                    else {
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
export async function getWatchRiskReport(git, config, thresholds, now = new Date()) {
    const changedFiles = await git.changedFileCount();
    const diffLines = changedFiles > 0 ? await git.diffLineCount() : 0;
    const lastBackupAt = config.getLastBackupAt();
    const minutesSinceLastBackup = lastBackupAt ? minutesBetween(lastBackupAt, now) : undefined;
    return {
        changedFiles,
        diffLines,
        minutesSinceLastBackup,
        hasLastBackup: Boolean(lastBackupAt),
        risky: changedFiles > 0 &&
            (changedFiles >= thresholds.changedFiles ||
                diffLines >= thresholds.diffLines ||
                !lastBackupAt ||
                (minutesSinceLastBackup ?? 0) >= thresholds.minutesSinceLastBackup),
    };
}
function printRiskReport(output, language, report) {
    output.warning(t(language, "watch.riskDetected"));
    output.info(t(language, "watch.changedFiles", { count: String(report.changedFiles) }));
    output.info(t(language, "watch.diffLines", { count: String(report.diffLines) }));
    output.info(report.hasLastBackup
        ? t(language, "watch.lastBackupAge", { minutes: String(report.minutesSinceLastBackup ?? 0) })
        : t(language, "watch.noLastBackup"));
}
async function runWatchBackup(git, output, language, config, timestamp) {
    const result = await runBackup(git, output, language, timestamp);
    if (result.backedUp) {
        config.setLastBackupAt(timestamp.toISOString());
    }
}
function getRiskSignature(report) {
    return [
        report.changedFiles,
        report.diffLines,
        report.hasLastBackup ? report.minutesSinceLastBackup : "none",
    ].join(":");
}
function minutesBetween(start, end) {
    const parsed = new Date(start);
    if (Number.isNaN(parsed.getTime())) {
        return undefined;
    }
    return Math.max(0, Math.floor((end.getTime() - parsed.getTime()) / 60000));
}
//# sourceMappingURL=watch.js.map