import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { runRestore } from "../src/commands/restore.js";
import { MemoryOutput } from "../src/core/output.js";
import { GitService } from "../src/services/git.js";
import { MockRunner } from "./helpers/mock-runner.js";

const tempRoots: string[] = [];

async function createTempRoot(): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "aicodebackup-restore-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  await Promise.all(tempRoots.splice(0).map((root) => fs.rm(root, { recursive: true, force: true })));
});

describe("runRestore", () => {
  it("lists recent remote backups", async () => {
    const runner = new MockRunner()
      .queue({ stdout: "true" })
      .queue({ stdout: "https://github.com/user/repo.git" })
      .queue({ stdout: "ref: refs/heads/main\tHEAD\n" })
      .queue({})
      .queue({ stdout: "abc1234 Backup: 2026-06-20 10:00:00\nfed9876 Backup: 2026-06-19 10:00:00\n" });
    const output = new MemoryOutput();

    await runRestore(new GitService(runner, "C:/project"), output, "en", {
      cwd: "C:/project",
      list: true,
      limit: 2,
    });

    expect(output.lines).toEqual([
      "Recent remote backups:",
      "abc1234 Backup: 2026-06-20 10:00:00",
      "fed9876 Backup: 2026-06-19 10:00:00",
    ]);
    expect(runner.commands.map((entry) => entry.args)).toEqual([
      ["rev-parse", "--is-inside-work-tree"],
      ["remote", "get-url", "origin"],
      ["ls-remote", "--symref", "origin", "HEAD"],
      ["fetch", "origin", "main:refs/remotes/origin/main", "--quiet"],
      ["log", "--max-count=2", "--format=%h %s", "origin/main"],
    ]);
  });

  it("restores into a new folder outside the current project", async () => {
    const root = await createTempRoot();
    const projectPath = path.join(root, "project");
    const restorePath = path.join(root, "project-restored");
    await fs.mkdir(projectPath);
    const runner = new MockRunner()
      .queue({ stdout: "true" })
      .queue({ stdout: "https://github.com/user/repo.git" })
      .queue({});
    const output = new MemoryOutput();

    await runRestore(new GitService(runner, projectPath), output, "en", {
      cwd: projectPath,
      limit: 5,
      target: restorePath,
    });

    expect(runner.commands.map((entry) => entry.args)).toEqual([
      ["rev-parse", "--is-inside-work-tree"],
      ["remote", "get-url", "origin"],
      ["clone", "https://github.com/user/repo.git", restorePath],
    ]);
    expect(output.lines.some((line) => line.includes(`Project restored to ${restorePath}.`))).toBe(true);
  });

  it("checks out a requested restore ref after cloning", async () => {
    const root = await createTempRoot();
    const projectPath = path.join(root, "project");
    const restorePath = path.join(root, "project-restored");
    await fs.mkdir(projectPath);
    const runner = new MockRunner()
      .queue({ stdout: "true" })
      .queue({ stdout: "https://github.com/user/repo.git" })
      .queue({})
      .queue({});
    const output = new MemoryOutput();

    await runRestore(new GitService(runner, projectPath), output, "en", {
      cwd: projectPath,
      limit: 5,
      ref: "abc1234",
      target: restorePath,
    });

    expect(runner.commands.map((entry) => entry.args)).toEqual([
      ["rev-parse", "--is-inside-work-tree"],
      ["remote", "get-url", "origin"],
      ["clone", "https://github.com/user/repo.git", restorePath],
      ["checkout", "--detach", "abc1234"],
    ]);
    expect(runner.commandOptions.at(-1)?.cwd).toBe(restorePath);
    expect(output.lines).toContain("Checked out restore ref: abc1234");
  });

  it("requires a restore target unless listing backups", async () => {
    const runner = new MockRunner()
      .queue({ stdout: "true" })
      .queue({ stdout: "https://github.com/user/repo.git" });

    await expect(
      runRestore(new GitService(runner, "C:/project"), new MemoryOutput(), "en", {
        cwd: "C:/project",
        limit: 5,
      }),
    ).rejects.toThrow("Choose a restore folder with --to <new-folder>.");
  });

  it("rejects restore targets inside the current project", async () => {
    const root = await createTempRoot();
    const projectPath = path.join(root, "project");
    await fs.mkdir(projectPath);
    const runner = new MockRunner()
      .queue({ stdout: "true" })
      .queue({ stdout: "https://github.com/user/repo.git" });

    await expect(
      runRestore(new GitService(runner, projectPath), new MemoryOutput(), "en", {
        cwd: projectPath,
        limit: 5,
        target: path.join(projectPath, "restored"),
      }),
    ).rejects.toThrow("Restore target must be outside the current project folder.");
  });

  it("rejects non-empty restore targets", async () => {
    const root = await createTempRoot();
    const projectPath = path.join(root, "project");
    const restorePath = path.join(root, "project-restored");
    await fs.mkdir(projectPath);
    await fs.mkdir(restorePath);
    await fs.writeFile(path.join(restorePath, "existing.txt"), "keep this");
    const runner = new MockRunner()
      .queue({ stdout: "true" })
      .queue({ stdout: "https://github.com/user/repo.git" });

    await expect(
      runRestore(new GitService(runner, projectPath), new MemoryOutput(), "en", {
        cwd: projectPath,
        limit: 5,
        target: restorePath,
      }),
    ).rejects.toThrow("Restore target already exists and is not empty.");
  });
});
