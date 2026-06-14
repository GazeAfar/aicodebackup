import { AICodeBackupError } from "../core/errors.js";
import { nextStep } from "../core/output.js";
import { t } from "../i18n/index.js";
export async function runBackup(git, output, language, timestamp = new Date()) {
    if (!(await git.isRepository())) {
        throw new AICodeBackupError(t(language, "backup.requireGitRepo"), nextStep(language, "backup.nextSetup"));
    }
    if (!(await git.hasRemote())) {
        throw new AICodeBackupError(t(language, "backup.requireRemote"), nextStep(language, "backup.nextSetup"));
    }
    if (!(await git.hasChanges())) {
        output.info(t(language, "backup.noChanges"));
        return { backedUp: false };
    }
    const commitMessage = t(language, "backup.commitMessage", {
        timestamp: formatTimestamp(timestamp),
    });
    await git.addAll();
    await git.commit(commitMessage);
    await git.push();
    output.success(t(language, "backup.success"));
    return { backedUp: true, commitMessage };
}
function formatTimestamp(date) {
    const pad = (value) => String(value).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
//# sourceMappingURL=backup.js.map