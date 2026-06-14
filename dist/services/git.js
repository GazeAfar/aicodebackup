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
    async statusPorcelain() {
        const result = await this.mustRun("git status --porcelain", "git", ["status", "--porcelain"]);
        return result.stdout;
    }
    async hasChanges() {
        const status = await this.statusPorcelain();
        return status.trim().length > 0;
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
//# sourceMappingURL=git.js.map