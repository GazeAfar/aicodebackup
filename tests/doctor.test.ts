import { describe, expect, it } from "vitest";
import { MemoryOutput } from "../src/core/output.js";
import { runDoctor } from "../src/commands/doctor.js";
import { GitService } from "../src/services/git.js";
import { GitHubCliService } from "../src/services/github-cli.js";
import { MockRunner } from "./helpers/mock-runner.js";

describe("runDoctor", () => {
  it("prints a successful English state", async () => {
    const runner = new MockRunner()
      .queue({ stdout: "git version 2.0.0" })
      .queue({ stdout: "gh version 2.0.0" })
      .queue({})
      .queue({ stdout: "true" })
      .queue({ stdout: "https://github.com/user/repo.git" })
      .queue({ stdout: "" })
      .queue({ stdout: "abc123 Backup" });
    const output = new MemoryOutput();

    const summary = await runDoctor(
      new GitService(runner, "C:/project"),
      new GitHubCliService(runner, "C:/project"),
      output,
      "en",
    );

    expect(summary.ok).toBe(true);
    expect(output.lines).toContain("✓ Git Installed");
    expect(output.lines).toContain("✓ Remote Repository Connected");
  });

  it("prints an actionable failure when GitHub CLI is missing", async () => {
    const runner = new MockRunner()
      .queue({ stdout: "git version 2.0.0" })
      .queue({ failed: true, stderr: "not found" });
    const output = new MemoryOutput();

    const summary = await runDoctor(
      new GitService(runner, "C:/project"),
      new GitHubCliService(runner, "C:/project"),
      output,
      "zh-CN",
    );

    expect(summary.ok).toBe(false);
    expect(output.lines).toContain("✗ GitHub CLI 已安装");
    expect(output.lines.some((line) => line.includes("https://cli.github.com/"))).toBe(true);
  });
});
