import { spawn } from "node:child_process";
import { CommandFailedError } from "../core/errors.js";
const GITHUB_DEVICE_LOGIN_URL = "https://github.com/login/device";
export class GitHubCliService {
    runner;
    cwd;
    platform;
    openBrowser;
    constructor(runner, cwd = process.cwd(), platform = process.platform, openBrowser = openExternalUrl) {
        this.runner = runner;
        this.cwd = cwd;
        this.platform = platform;
        this.openBrowser = openBrowser;
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
        this.openDeviceLoginPage();
        const result = await this.runner.run("gh", ["auth", "login", "--web", "--hostname", "github.com", "--git-protocol", "https", "--skip-ssh-key"], {
            cwd: this.cwd,
            interactive: true,
            input: "Y\n",
        });
        if (result.failed) {
            return false;
        }
        const setupGitResult = await this.runner.run("gh", ["auth", "setup-git", "--hostname", "github.com"], {
            cwd: this.cwd,
        });
        return !setupGitResult.failed;
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
    openDeviceLoginPage() {
        try {
            this.openBrowser(GITHUB_DEVICE_LOGIN_URL, this.platform);
        }
        catch {
            // GitHub CLI still prints the device URL, so browser launch failure is non-fatal.
        }
    }
}
function openExternalUrl(url, platform) {
    const command = platform === "win32" ? "cmd" : platform === "darwin" ? "open" : "xdg-open";
    const args = platform === "win32" ? ["/c", "start", "", url] : [url];
    const child = spawn(command, args, {
        detached: true,
        stdio: "ignore",
        windowsHide: true,
    });
    child.unref();
}
//# sourceMappingURL=github-cli.js.map