import { promises as fs } from "node:fs";
import path from "node:path";
import { AICodeBackupError } from "../core/errors.js";
import { nextStep } from "../core/output.js";
import { t } from "../i18n/index.js";
export async function runRestore(git, output, language, options) {
    if (!(await git.isRepository())) {
        throw new AICodeBackupError(t(language, "restore.requireGitRepo"), nextStep(language, "restore.nextSetup"));
    }
    const remoteUrl = await git.getRemoteUrl();
    if (!remoteUrl) {
        throw new AICodeBackupError(t(language, "restore.requireRemote"), nextStep(language, "restore.nextSetup"));
    }
    if (options.list) {
        await listRecentBackups(git, output, language, options.limit);
        return;
    }
    if (!options.target) {
        throw new AICodeBackupError(t(language, "restore.requireTarget"));
    }
    const targetPath = await validateRestoreTarget(options.cwd, options.target, language);
    await git.clone(remoteUrl, targetPath);
    if (options.ref) {
        await git.checkoutDetached(targetPath, options.ref);
        output.info(t(language, "restore.refCheckedOut", { ref: options.ref }));
    }
    output.success(t(language, "restore.success", { path: targetPath }));
}
async function listRecentBackups(git, output, language, limit) {
    const branch = await git.remoteHeadBranch();
    if (!branch) {
        throw new AICodeBackupError(t(language, "restore.defaultBranchMissing"));
    }
    await git.fetch("origin", branch);
    const commits = await git.listRecentCommits(`origin/${branch}`, limit);
    output.info(t(language, "restore.listTitle"));
    if (commits.length === 0) {
        output.info(t(language, "restore.noBackups"));
        return;
    }
    for (const commit of commits) {
        output.info(commit);
    }
}
async function validateRestoreTarget(cwd, target, language) {
    const projectPath = path.resolve(cwd);
    const targetPath = path.resolve(cwd, target);
    if (isSameOrInside(projectPath, targetPath)) {
        throw new AICodeBackupError(t(language, "restore.targetInsideRepo"));
    }
    const parentPath = path.dirname(targetPath);
    if (!(await exists(parentPath))) {
        throw new AICodeBackupError(t(language, "restore.targetParentMissing"));
    }
    if (await isNonEmptyDirectory(targetPath)) {
        throw new AICodeBackupError(t(language, "restore.targetNotEmpty"));
    }
    return targetPath;
}
async function exists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    }
    catch {
        return false;
    }
}
async function isNonEmptyDirectory(filePath) {
    try {
        const stats = await fs.stat(filePath);
        if (!stats.isDirectory()) {
            return true;
        }
        const entries = await fs.readdir(filePath);
        return entries.length > 0;
    }
    catch (error) {
        if (isNodeError(error) && error.code === "ENOENT") {
            return false;
        }
        throw error;
    }
}
function isSameOrInside(parent, child) {
    const relative = path.relative(parent, child);
    return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}
function isNodeError(error) {
    return error instanceof Error && "code" in error;
}
//# sourceMappingURL=restore.js.map