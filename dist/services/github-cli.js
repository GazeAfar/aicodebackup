import { CommandFailedError } from "../core/errors.js";
export class GitHubCliService {
    runner;
    cwd;
    constructor(runner, cwd = process.cwd()) {
        this.runner = runner;
        this.cwd = cwd;
    }
    async isInstalled() {
        const result = await this.runner.run("gh", ["--version"], { cwd: this.cwd });
        return !result.failed;
    }
    async isAuthenticated() {
        const result = await this.runner.run("gh", ["auth", "status"], { cwd: this.cwd });
        return !result.failed;
    }
    async createPrivateRepository(name) {
        const result = await this.runner.run("gh", ["repo", "create", name, "--private", "--source=.", "--remote=origin"], { cwd: this.cwd });
        if (result.failed) {
            throw new CommandFailedError("gh repo create", result);
        }
    }
}
//# sourceMappingURL=github-cli.js.map