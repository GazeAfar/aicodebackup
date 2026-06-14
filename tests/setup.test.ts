import { describe, expect, it } from "vitest";
import { MemoryOutput } from "../src/core/output.js";
import { runSetup, type SetupPrompt } from "../src/commands/setup.js";
import { GitService } from "../src/services/git.js";
import { GitHubCliService } from "../src/services/github-cli.js";
import { MockRunner } from "./helpers/mock-runner.js";

const prompt: SetupPrompt = {
  async repositoryName() {
    return "demo";
  },
};

describe("runSetup", () => {
  it("fails with guidance when GitHub CLI is missing", async () => {
    const runner = new MockRunner()
      .queue({ stdout: "git version 2.0.0" })
      .queue({ failed: true, stderr: "not found" });
    const output = new MemoryOutput();

    await expect(
      runSetup(
        new GitService(runner, "C:/project"),
        new GitHubCliService(runner, "C:/project"),
        output,
        "en",
        prompt,
        "C:/project",
      ),
    ).rejects.toThrow("GitHub CLI is not installed.");
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
});
