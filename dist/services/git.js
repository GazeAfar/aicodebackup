import { CommandFailedError } from "../core/errors.js";
export class GitService {
    runner;
    cwd;
    constructor(runner, cwd = process.cwd()) {
        this.runner = runner;
        this.cwd = cwd;
    }
    async isInstalled() {
        return this.succeeds("git", ["--version"]);
    }
    async isRepository() {
        const result = await this.runner.run("git", ["rev-parse", "--is-inside-work-tree"], {
            cwd: this.cwd,
        });
        return !result.failed && result.stdout.trim() === "true";
    }
    async init() {
        await this.mustRun("git init", "git", ["init"]);
    }
    async hasRemote(name = "origin") {
        return this.succeeds("git", ["remote", "get-url", name]);
    }
    async getRemoteUrl(name = "origin") {
        const result = await this.runner.run("git", ["remote", "get-url", name], { cwd: this.cwd });
        return result.failed ? undefined : result.stdout.trim();
    }
    async remoteHeadBranch(remote = "origin") {
        const result = await this.runner.run("git", ["ls-remote", "--symref", remote, "HEAD"], {
            cwd: this.cwd,
        });
        if (result.failed) {
            return undefined;
        }
        const match = result.stdout.match(/^ref:\s+refs\/heads\/(.+?)\s+HEAD$/m);
        return match?.[1];
    }
    async fetch(remote, branch) {
        await this.mustRun("git fetch", "git", [
            "fetch",
            remote,
            `${branch}:refs/remotes/${remote}/${branch}`,
            "--quiet",
        ]);
    }
    async listRecentCommits(ref, limit) {
        const result = await this.mustRun("git log", "git", [
            "log",
            `--max-count=${limit}`,
            "--format=%h %s",
            ref,
        ]);
        return result.stdout
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean);
    }
    async hasAuthorIdentity() {
        const name = await this.getConfig("user.name");
        const email = await this.getConfig("user.email");
        return Boolean(name && email);
    }
    async setLocalAuthorIdentity(name, email) {
        await this.mustRun("git config user.name", "git", ["config", "user.name", name]);
        await this.mustRun("git config user.email", "git", ["config", "user.email", email]);
    }
    async statusPorcelain() {
        const result = await this.mustRun("git status --porcelain", "git", ["status", "--porcelain"]);
        return result.stdout;
    }
    async hasChanges() {
        const status = await this.statusPorcelain();
        return status.trim().length > 0;
    }
    async changedFileCount() {
        const status = await this.statusPorcelain();
        return status
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean).length;
    }
    async diffLineCount() {
        const result = await this.runner.run("git", ["diff", "--numstat", "HEAD"], { cwd: this.cwd });
        if (result.failed) {
            return 0;
        }
        return result.stdout
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean)
            .reduce((total, line) => {
            const [additions, deletions] = line.split(/\s+/);
            return total + parseNumstatValue(additions) + parseNumstatValue(deletions);
        }, 0);
    }
    async addAll() {
        await this.mustRun("git add .", "git", ["add", "."]);
    }
    async commit(message) {
        await this.mustRun("git commit", "git", ["commit", "-m", message]);
    }
    async push() {
        await this.mustRun("git push", "git", ["push", "-u", "origin", "HEAD"]);
    }
    async lastCommit() {
        const result = await this.runner.run("git", ["log", "-1", "--format=%h %s"], {
            cwd: this.cwd,
        });
        return result.failed ? undefined : result.stdout.trim();
    }
    async clone(remoteUrl, targetPath) {
        await this.mustRun("git clone", "git", ["clone", remoteUrl, targetPath]);
    }
    async checkoutDetached(targetPath, ref) {
        const result = await this.runner.run("git", ["checkout", "--detach", ref], { cwd: targetPath });
        if (result.failed) {
            throw new CommandFailedError("git checkout", result);
        }
    }
    async getConfig(key) {
        const result = await this.runner.run("git", ["config", "--get", key], { cwd: this.cwd });
        return result.failed ? undefined : result.stdout.trim();
    }
    async succeeds(command, args) {
        const result = await this.runner.run(command, args, { cwd: this.cwd });
        return !result.failed;
    }
    async mustRun(label, command, args) {
        const result = await this.runner.run(command, args, { cwd: this.cwd });
        if (result.failed) {
            throw new CommandFailedError(label, result);
        }
        return result;
    }
}
function parseNumstatValue(value) {
    if (!value || value === "-") {
        return 0;
    }
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
}
//# sourceMappingURL=git.js.map