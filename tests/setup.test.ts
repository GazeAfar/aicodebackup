import { describe, expect, it } from "vitest";
import { MemoryOutput } from "../src/core/output.js";
import { runSetup, type SetupPrompt } from "../src/commands/setup.js";
import { GitService } from "../src/services/git.js";
import { GitHubCliService } from "../src/services/github-cli.js";
import { InstallerService } from "../src/services/installer.js";
import { MockRunner } from "./helpers/mock-runner.js";

const prompt: SetupPrompt = {
  async githubAccountReady() {},
  async repositoryName() {
    return "demo";
  },
};

class TestInstaller extends InstallerService {
  installGitCalls = 0;
  installGitHubCliCalls = 0;
  openGitHubSignupCalls = 0;

  constructor() {
    super(new MockRunner(), "win32");
  }

  override async installGit(): Promise<boolean> {
    this.installGitCalls += 1;
    return true;
  }

  override async installGitHubCli(): Promise<boolean> {
    this.installGitHubCliCalls += 1;
    return true;
  }

  override async openGitHubSignup(): Promise<boolean> {
    this.openGitHubSignupCalls += 1;
    return true;
  }
}

describe("runSetup", () => {
  it("tries to install GitHub CLI when it is missing", async () => {
    const runner = new MockRunner()
      .queue({ stdout: "git version 2.0.0" })
      .queue({ failed: true, stderr: "not found" })
      .queue({ failed: true, stderr: "not found" });
    const output = new MemoryOutput();
    const installer = new TestInstaller();

    await expect(
      runSetup(
        new GitService(runner, "C:/project"),
        new GitHubCliService(runner, "C:/project"),
        installer,
        output,
        "en",
        prompt,
        "C:/project",
      ),
    ).rejects.toThrow("AICodeBackup could not install GitHub CLI automatically.");
    expect(installer.installGitHubCliCalls).toBe(1);
  });

  it("does not overwrite an existing remote", async () => {
    const runner = new MockRunner()
      .queue({ stdout: "git version 2.0.0" })
      .queue({ stdout: "gh version 2.0.0" })
      .queue({})
      .queue({ stdout: "true" })
      .queue({ stdout: "Existing User" })
      .queue({ stdout: "existing@example.com" })
      .queue({ stdout: "https://github.com/user/repo.git" })
      .queue({ stdout: "true" })
      .queue({ stdout: "https://github.com/user/repo.git" })
      .queue({ stdout: "" });
    const output = new MemoryOutput();

    await runSetup(
      new GitService(runner, "C:/project"),
      new GitHubCliService(runner, "C:/project"),
      new TestInstaller(),
      output,
      "en",
      prompt,
      "C:/project",
    );

    expect(runner.commands.some((entry) => entry.command === "gh" && entry.args[0] === "repo")).toBe(
      false,
    );
    expect(output.lines).toContain("Existing remote repository found. It will not be overwritten.");
  });

  it("creates a private repository when remote is missing", async () => {
    const runner = new MockRunner()
      .queue({ stdout: "git version 2.0.0" })
      .queue({ stdout: "gh version 2.0.0" })
      .queue({})
      .queue({ stdout: "true" })
      .queue({ stdout: "Existing User" })
      .queue({ stdout: "existing@example.com" })
      .queue({ failed: true })
      .queue({})
      .queue({ stdout: "true" })
      .queue({ stdout: "https://github.com/user/repo.git" })
      .queue({ stdout: "" });
    const output = new MemoryOutput();

    await runSetup(
      new GitService(runner, "C:/project"),
      new GitHubCliService(runner, "C:/project"),
      new TestInstaller(),
      output,
      "en",
      prompt,
      "C:/project",
    );

    expect(runner.commands.map((entry) => entry.args)).toContainEqual([
      "repo",
      "create",
      "demo",
      "--private",
      "--source=.",
      "--remote=origin",
    ]);
  });

  it("configures local Git identity from GitHub when missing", async () => {
    const runner = new MockRunner()
      .queue({ stdout: "git version 2.0.0" })
      .queue({ stdout: "gh version 2.0.0" })
      .queue({})
      .queue({ stdout: "true" })
      .queue({ failed: true })
      .queue({ failed: true })
      .queue({ stdout: '{"login":"GazeAfar","id":33276444,"name":"Gaze Afar"}' })
      .queue({})
      .queue({})
      .queue({ stdout: "https://github.com/user/repo.git" })
      .queue({ stdout: "true" })
      .queue({ stdout: "https://github.com/user/repo.git" })
      .queue({ stdout: "" });
    const output = new MemoryOutput();

    await runSetup(
      new GitService(runner, "C:/project"),
      new GitHubCliService(runner, "C:/project"),
      new TestInstaller(),
      output,
      "en",
      prompt,
      "C:/project",
    );

    expect(runner.commands.map((entry) => entry.args)).toContainEqual([
      "config",
      "user.email",
      "33276444+GazeAfar@users.noreply.github.com",
    ]);
    expect(output.lines).toContain("✓ Git author identity configured for this project.");
  });

  it("starts GitHub browser login when not authenticated", async () => {
    const runner = new MockRunner()
      .queue({ stdout: "git version 2.0.0" })
      .queue({ stdout: "gh version 2.0.0" })
      .queue({ failed: true })
      .queue({})
      .queue({})
      .queue({ stdout: "true" })
      .queue({ stdout: "true" })
      .queue({ stdout: "Existing User" })
      .queue({ stdout: "existing@example.com" })
      .queue({ stdout: "https://github.com/user/repo.git" })
      .queue({ stdout: "true" })
      .queue({ stdout: "https://github.com/user/repo.git" })
      .queue({ stdout: "" });
    const output = new MemoryOutput();
    const installer = new TestInstaller();

    await runSetup(
      new GitService(runner, "C:/project"),
      new GitHubCliService(runner, "C:/project"),
      installer,
      output,
      "en",
      prompt,
      "C:/project",
    );

    expect(installer.openGitHubSignupCalls).toBe(1);
    expect(runner.commands.map((entry) => entry.args)).toContainEqual([
      "auth",
      "login",
      "--web",
      "--hostname",
      "github.com",
      "--git-protocol",
      "https",
      "--skip-ssh-key",
    ]);
    expect(runner.commands.map((entry) => entry.args)).toContainEqual([
      "auth",
      "setup-git",
      "--hostname",
      "github.com",
    ]);
  });
});
