import type { CommandRunner } from "../core/command-runner.js";

export type SupportedPlatform = "win32" | "darwin" | "other";

export class InstallerService {
  constructor(
    private readonly runner: CommandRunner,
    private readonly platform: NodeJS.Platform = process.platform,
  ) {}

  getPlatform(): SupportedPlatform {
    if (this.platform === "win32" || this.platform === "darwin") {
      return this.platform;
    }

    return "other";
  }

  async installGit(): Promise<boolean> {
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

  async installGitHubCli(): Promise<boolean> {
    if (this.platform === "win32") {
      return this.succeeds(
        "winget",
        ["install", "--id", "GitHub.cli", "-e", "--source", "winget"],
        true,
      );
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

  async openGitHubSignup(): Promise<boolean> {
    return this.openUrl("https://github.com/signup");
  }

  async openUrl(url: string): Promise<boolean> {
    if (this.platform === "win32") {
      return this.succeeds("powershell", ["-NoProfile", "-Command", "Start-Process", url]);
    }

    if (this.platform === "darwin") {
      return this.succeeds("open", [url]);
    }

    return this.succeeds("xdg-open", [url]);
  }

  private async succeeds(command: string, args: string[], interactive = false): Promise<boolean> {
    const result = await this.runner.run(command, args, { interactive });
    return !result.failed;
  }
}
