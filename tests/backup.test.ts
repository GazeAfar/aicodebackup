import { describe, expect, it } from "vitest";
import { MemoryOutput } from "../src/core/output.js";
import { runBackup } from "../src/commands/backup.js";
import { GitService } from "../src/services/git.js";
import { MockRunner } from "./helpers/mock-runner.js";

describe("runBackup", () => {
  it("handles no-change state cleanly", async () => {
    const runner = new MockRunner()
      .queue({ stdout: "true" })
      .queue({ stdout: "https://github.com/user/repo.git" })
      .queue({ stdout: "" });
    const output = new MemoryOutput();

    const result = await runBackup(new GitService(runner, "C:/project"), output, "en");

    expect(result.backedUp).toBe(false);
    expect(output.lines).toContain("No changes detected. Your project is already backed up.");
  });

  it("fails clearly when no remote is connected", async () => {
    const runner = new MockRunner().queue({ stdout: "true" }).queue({ failed: true });
    const output = new MemoryOutput();

    await expect(runBackup(new GitService(runner, "C:/project"), output, "en")).rejects.toThrow(
      "No remote repository is connected.",
    );
  });

  it("adds, commits, and pushes changes", async () => {
    const runner = new MockRunner()
      .queue({ stdout: "true" })
      .queue({ stdout: "https://github.com/user/repo.git" })
      .queue({ stdout: " M index.ts" })
      .queue({})
      .queue({})
      .queue({});
    const output = new MemoryOutput();

    const result = await runBackup(
      new GitService(runner, "C:/project"),
      output,
      "en",
      new Date("2026-06-14T10:30:00"),
    );

    expect(result).toEqual({ backedUp: true, commitMessage: "Backup: 2026-06-14 10:30:00" });
    expect(runner.commands.map((entry) => entry.args)).toEqual([
      ["rev-parse", "--is-inside-work-tree"],
      ["remote", "get-url", "origin"],
      ["status", "--porcelain"],
      ["add", "."],
      ["commit", "-m", "Backup: 2026-06-14 10:30:00"],
      ["push", "-u", "origin", "HEAD"],
    ]);
  });
});
