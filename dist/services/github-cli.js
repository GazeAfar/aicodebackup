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
    async login() {
        const result = await this.runner.run("gh", ["auth", "login", "--web"], {
            cwd: this.cwd,
            interactive: true,
        });
        return !result.failed;
    }
    async createPrivateRepository(name) {
        const result = await this.runner.run("gh", ["repo", "create", name, "--private", "--source=.", "--remote=origin"], { cwd: this.cwd });
        if (result.failed) {
            throw new CommandFailedError("gh repo create", result);
        }
    }
    async getCurrentUser() {
        const result = await this.runner.run("gh", ["api", "user", "--jq", "{login:.login,id:.id,name:.name}"], { cwd: this.cwd });
        if (result.failed) {
            throw new CommandFailedError("gh api user", result);
        }
        return JSON.parse(result.stdout);
    }
}
//# sourceMappingURL=github-cli.js.map