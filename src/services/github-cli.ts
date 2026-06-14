import type { CommandRunner } from "../core/command-runner.js";
import { CommandFailedError } from "../core/errors.js";

export interface GitHubUser {
  login: string;
  id: number;
  name?: string;
}

export class GitHubCliService {
  constructor(
    private readonly runner: CommandRunner,
    private readonly cwd = process.cwd(),
  ) {}

  async isInstalled(): Promise<boolean> {
    const result = await this.runner.run("gh", ["--version"], { cwd: this.cwd });
    return !result.failed;
  }

  async isAuthenticated(): Promise<boolean> {
    const result = await this.runner.run("gh", ["auth", "status"], { cwd: this.cwd });
    return !result.failed;
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
}
