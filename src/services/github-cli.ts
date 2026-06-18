import { spawn } from "node:child_process";
import type { CommandRunner } from "../core/command-runner.js";
import { CommandFailedError } from "../core/errors.js";

export interface GitHubUser {
  login: string;
  id: number;
  name?: string;
}

const GITHUB_DEVICE_LOGIN_URL = "https://github.com/login/device";
type BrowserOpener = (url: string, platform: NodeJS.Platform) => void;

export class GitHubCliService {
  constructor(
    private readonly runner: CommandRunner,
    private readonly cwd = process.cwd(),
    private readonly platform: NodeJS.Platform = process.platform,
    private readonly openBrowser: BrowserOpener = openExternalUrl,
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
    this.openDeviceLoginPage();

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

  private openDeviceLoginPage(): void {
    try {
      this.openBrowser(GITHUB_DEVICE_LOGIN_URL, this.platform);
    } catch {
      // GitHub CLI still prints the device URL, so browser launch failure is non-fatal.
    }
  }
}

function openExternalUrl(url: string, platform: NodeJS.Platform): void {
  const command = platform === "win32" ? "cmd" : platform === "darwin" ? "open" : "xdg-open";
  const args = platform === "win32" ? ["/c", "start", "", url] : [url];
  const child = spawn(command, args, {
    detached: true,
    stdio: "ignore",
    windowsHide: true,
  });
  child.unref();
}
