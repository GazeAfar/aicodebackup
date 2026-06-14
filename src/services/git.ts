import type { CommandRunner } from "../core/command-runner.js";
import { CommandFailedError } from "../core/errors.js";

export class GitService {
  constructor(
    private readonly runner: CommandRunner,
    private readonly cwd = process.cwd(),
  ) {}

  async isInstalled(): Promise<boolean> {
    return this.succeeds("git", ["--version"]);
  }

  async isRepository(): Promise<boolean> {
    const result = await this.runner.run("git", ["rev-parse", "--is-inside-work-tree"], {
      cwd: this.cwd,
    });
    return !result.failed && result.stdout.trim() === "true";
  }

  async init(): Promise<void> {
    await this.mustRun("git init", "git", ["init"]);
  }

  async hasRemote(name = "origin"): Promise<boolean> {
    return this.succeeds("git", ["remote", "get-url", name]);
  }

  async getRemoteUrl(name = "origin"): Promise<string | undefined> {
    const result = await this.runner.run("git", ["remote", "get-url", name], { cwd: this.cwd });
    return result.failed ? undefined : result.stdout.trim();
  }

  async hasAuthorIdentity(): Promise<boolean> {
    const name = await this.getConfig("user.name");
    const email = await this.getConfig("user.email");
    return Boolean(name && email);
  }

  async setLocalAuthorIdentity(name: string, email: string): Promise<void> {
    await this.mustRun("git config user.name", "git", ["config", "user.name", name]);
    await this.mustRun("git config user.email", "git", ["config", "user.email", email]);
  }

  async statusPorcelain(): Promise<string> {
    const result = await this.mustRun("git status --porcelain", "git", ["status", "--porcelain"]);
    return result.stdout;
  }

  async hasChanges(): Promise<boolean> {
    const status = await this.statusPorcelain();
    return status.trim().length > 0;
  }

  async addAll(): Promise<void> {
    await this.mustRun("git add .", "git", ["add", "."]);
  }

  async commit(message: string): Promise<void> {
    await this.mustRun("git commit", "git", ["commit", "-m", message]);
  }

  async push(): Promise<void> {
    await this.mustRun("git push", "git", ["push", "-u", "origin", "HEAD"]);
  }

  async lastCommit(): Promise<string | undefined> {
    const result = await this.runner.run("git", ["log", "-1", "--format=%h %s"], {
      cwd: this.cwd,
    });
    return result.failed ? undefined : result.stdout.trim();
  }

  private async getConfig(key: string): Promise<string | undefined> {
    const result = await this.runner.run("git", ["config", "--get", key], { cwd: this.cwd });
    return result.failed ? undefined : result.stdout.trim();
  }

  private async succeeds(command: string, args: string[]): Promise<boolean> {
    const result = await this.runner.run(command, args, { cwd: this.cwd });
    return !result.failed;
  }

  private async mustRun(label: string, command: string, args: string[]) {
    const result = await this.runner.run(command, args, { cwd: this.cwd });
    if (result.failed) {
      throw new CommandFailedError(label, result);
    }

    return result;
  }
}
