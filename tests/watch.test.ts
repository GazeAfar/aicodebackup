import { describe, expect, it } from "vitest";
import { runWatch, getWatchRiskReport, type WatchConfig, type WatchPrompt } from "../src/commands/watch.js";
import { MemoryOutput } from "../src/core/output.js";
import { GitService } from "../src/services/git.js";
import { MockRunner } from "./helpers/mock-runner.js";

class TestConfig implements WatchConfig {
  lastBackupAt: string | undefined;

  constructor(lastBackupAt?: string) {
    this.lastBackupAt = lastBackupAt;
  }

  getLastBackupAt(): string | undefined {
    return this.lastBackupAt;
  }

  setLastBackupAt(timestamp: string): void {
    this.lastBackupAt = timestamp;
  }
}

class TestPrompt implements WatchPrompt {
  calls = 0;

  constructor(private readonly answer: boolean) {}

  async confirmBackup(): Promise<boolean> {
    this.calls += 1;
    return this.answer;
  }
}

describe("watch", () => {
  it("detects risk from changed file count", async () => {
    const runner = new MockRunner()
      .queue({ stdout: " M a.ts\n M b.ts\n M c.ts\n M d.ts\n M e.ts" })
      .queue({ stdout: "10\t2\ta.ts" });

    const report = await getWatchRiskReport(
      new GitService(runner, "C:/project"),
      new TestConfig("2026-06-17T10:00:00.000Z"),
      { changedFiles: 5, diffLines: 200, minutesSinceLastBackup: 30 },
      new Date("2026-06-17T10:05:00.000Z"),
    );

    expect(report).toMatchObject({
      risky: true,
      changedFiles: 5,
      diffLines: 12,
      minutesSinceLastBackup: 5,
    });
  });

  it("detects risk from diff line count", async () => {
    const runner = new MockRunner()
      .queue({ stdout: " M app.ts" })
      .queue({ stdout: "120\t90\tapp.ts" });

    const report = await getWatchRiskReport(
      new GitService(runner, "C:/project"),
      new TestConfig("2026-06-17T10:00:00.000Z"),
      { changedFiles: 5, diffLines: 200, minutesSinceLastBackup: 30 },
      new Date("2026-06-17T10:05:00.000Z"),
    );

    expect(report.risky).toBe(true);
    expect(report.diffLines).toBe(210);
  });

  it("detects risk from time since last backup", async () => {
    const runner = new MockRunner()
      .queue({ stdout: " M app.ts" })
      .queue({ stdout: "1\t1\tapp.ts" });

    const report = await getWatchRiskReport(
      new GitService(runner, "C:/project"),
      new TestConfig("2026-06-17T10:00:00.000Z"),
      { changedFiles: 5, diffLines: 200, minutesSinceLastBackup: 30 },
      new Date("2026-06-17T10:31:00.000Z"),
    );

    expect(report.risky).toBe(true);
    expect(report.minutesSinceLastBackup).toBe(31);
  });

  it("does not report risk when the working tree has no changes", async () => {
    const runner = new MockRunner().queue({ stdout: "" });

    const report = await getWatchRiskReport(
      new GitService(runner, "C:/project"),
      new TestConfig("2026-06-17T10:00:00.000Z"),
      { changedFiles: 5, diffLines: 200, minutesSinceLastBackup: 30 },
      new Date("2026-06-17T11:00:00.000Z"),
    );

    expect(report).toMatchObject({ risky: false, changedFiles: 0, diffLines: 0 });
    expect(runner.commands.map((entry) => entry.args)).toEqual([["status", "--porcelain"]]);
  });

  it("asks before backing up in prompt mode", async () => {
    const runner = new MockRunner()
      .queue({ stdout: "true" })
      .queue({ stdout: "https://github.com/user/repo.git" })
      .queue({ stdout: " M a.ts\n M b.ts\n M c.ts\n M d.ts\n M e.ts" })
      .queue({ stdout: "10\t2\ta.ts" })
      .queue({ stdout: "true" })
      .queue({ stdout: "https://github.com/user/repo.git" })
      .queue({ stdout: " M a.ts" })
      .queue({})
      .queue({})
      .queue({});
    const output = new MemoryOutput();
    const config = new TestConfig("2026-06-17T10:00:00.000Z");
    const prompt = new TestPrompt(true);

    await runWatch(
      new GitService(runner, "C:/project"),
      output,
      "en",
      config,
      {
        auto: false,
        intervalMs: 1,
        once: true,
        thresholds: { changedFiles: 5, diffLines: 200, minutesSinceLastBackup: 30 },
        now: () => new Date("2026-06-17T10:05:00.000Z"),
      },
      prompt,
    );

    expect(prompt.calls).toBe(1);
    expect(config.lastBackupAt).toBe("2026-06-17T10:05:00.000Z");
    expect(output.lines).toContain("✓ Project backed up to GitHub.");
  });

  it("runs backup automatically in auto mode", async () => {
    const runner = new MockRunner()
      .queue({ stdout: "true" })
      .queue({ stdout: "https://github.com/user/repo.git" })
      .queue({ stdout: " M app.ts" })
      .queue({ stdout: "120\t90\tapp.ts" })
      .queue({ stdout: "true" })
      .queue({ stdout: "https://github.com/user/repo.git" })
      .queue({ stdout: " M app.ts" })
      .queue({})
      .queue({})
      .queue({});
    const output = new MemoryOutput();
    const config = new TestConfig("2026-06-17T10:00:00.000Z");

    await runWatch(new GitService(runner, "C:/project"), output, "en", config, {
      auto: true,
      intervalMs: 1,
      once: true,
      thresholds: { changedFiles: 5, diffLines: 200, minutesSinceLastBackup: 30 },
      now: () => new Date("2026-06-17T10:05:00.000Z"),
    });

    expect(output.lines).toContain("Auto backup started...");
    expect(output.lines).toContain("✓ Project backed up to GitHub.");
    expect(config.lastBackupAt).toBe("2026-06-17T10:05:00.000Z");
  });
});
