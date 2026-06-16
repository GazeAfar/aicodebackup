export class InstallerService {
    runner;
    platform;
    constructor(runner, platform = process.platform) {
        this.runner = runner;
        this.platform = platform;
    }
    getPlatform() {
        if (this.platform === "win32" || this.platform === "darwin") {
            return this.platform;
        }
        return "other";
    }
    async installGit() {
        if (this.platform === "win32") {
            return this.succeeds("winget", ["install", "--id", "Git.Git", "-e", "--source", "winget"], true);
        }
        if (this.platform === "darwin") {
            if (await this.succeeds("brew", ["--version"])) {
                return this.succeeds("brew", ["install", "git"], true);
            }
            return this.succeeds("xcode-select", ["--install"], true);
        }
        return false;
    }
    async installGitHubCli() {
        if (this.platform === "win32") {
            return this.succeeds("winget", ["install", "--id", "GitHub.cli", "-e", "--source", "winget"], true);
        }
        if (this.platform === "darwin") {
            if (await this.succeeds("brew", ["--version"])) {
                return this.succeeds("brew", ["install", "gh"], true);
            }
            await this.openUrl("https://cli.github.com/");
            return false;
        }
        return false;
    }
    async openGitHubSignup() {
        return this.openUrl("https://github.com/signup");
    }
    async openUrl(url) {
        if (this.platform === "win32") {
            return this.succeeds("powershell", ["-NoProfile", "-Command", "Start-Process", url]);
        }
        if (this.platform === "darwin") {
            return this.succeeds("open", [url]);
        }
        return this.succeeds("xdg-open", [url]);
    }
    async succeeds(command, args, interactive = false) {
        const result = await this.runner.run(command, args, { interactive });
        return !result.failed;
    }
}
//# sourceMappingURL=installer.js.map