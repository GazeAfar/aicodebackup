import type { CommandRunner } from "../core/command-runner.js";
import { CommandFailedError } from "../core/errors.js";

export interface GitHubUser {
  login: string;
  id: number;
  name?: string;
}

const GITHUB_DEVICE_LOGIN_URL = "https://github.com/login/device";

export class GitHubCliService {
  constructor(
    private readonly runner: CommandRunner,
    private readonly cwd = process.cwd(),
    private readonly platform: NodeJS.Platform = process.platform,
  ) {}

  async isInstalled(): Promise<boolean> {
    const result = await this.runner.run("gh", ["--version"], { cwd: this.cwd });
    return !result.failed;
  }

  async isAuthenticated(): Promise<boolean> {
    const result = await this.runner.run("gh", ["auth", "status"], { cwd: this.cwd });
    return !result.failed;
  }

  async login(): Promise<boolean> {
    await this.openDeviceLoginPage();

    const result = await this.runner.run(
      "gh",
      ["auth", "login", "--web", "--hostname", "github.com", "--git-protocol", "https", "--skip-ssh-key"],
      {
        cwd: this.cwd,
        interactive: true,
        input: "Y\n",
      },
    );

    if (result.failed) {
      return false;
    }

    const setupGitResult = await this.runner.run("gh", ["auth", "setup-git", "--hostname", "github.com"], {
      cwd: this.cwd,
    });

    return !setupGitResult.failed;
  }

  async createPrivateRepository(name: string): Promise<void> {
    const result = await this.runner.run(
      "gh",
      ["repo", "create", name, "--private", "--source=.", "--remote=origin"],
      { cwd: this.cwd },
    );

    if (result.failed) {
      throw new CommandFailedError("gh repo create", result);
    }
  }

  async getCurrentUser(): Promise<GitHubUser> {
    const result = await this.runner.run(
      "gh",
      ["api", "user", "--jq", "{login:.login,id:.id,name:.name}"],
      { cwd: this.cwd },
    );

    if (result.failed) {
      throw new CommandFailedError("gh api user", result);
    }

    return JSON.parse(result.stdout) as GitHubUser;
  }

  private async openDeviceLoginPage(): Promise<void> {
    if (this.platform === "win32") {
      await this.runner.run("powershell", [
        "-NoProfile",
        "-Command",
        "Start-Process",
        GITHUB_DEVICE_LOGIN_URL,
      ]);
      return;
    }

    if (this.platform === "darwin") {
      await this.runner.run("open", [GITHUB_DEVICE_LOGIN_URL]);
      return;
    }

    await this.runner.run("xdg-open", [GITHUB_DEVICE_LOGIN_URL]);
  }
}
