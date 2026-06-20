import { describe, expect, it } from "vitest";
import { GitService } from "../src/services/git.js";
import { MockRunner } from "./helpers/mock-runner.js";

describe("GitService", () => {
  it("checks whether the current folder is a Git repository", async () => {
    const runner = new MockRunner().queue({ stdout: "true" });
    const git = new GitService(runner, "C:/project");

    await expect(git.isRepository()).resolves.toBe(true);
    expect(runner.commands[0]).toEqual({
      command: "git",
      args: ["rev-parse", "--is-inside-work-tree"],
    });
  });

  it("runs backup commands in order", async () => {
    const runner = new MockRunner().queue({}).queue({}).queue({});
    const git = new GitService(runner, "C:/project");

    await git.addAll();
    await git.commit("Backup: test");
    await git.push();

    expect(runner.commands.map((entry) => [entry.command, entry.args])).toEqual([
      ["git", ["add", "."]],
      ["git", ["commit", "-m", "Backup: test"]],
      ["git", ["push", "-u", "origin", "HEAD"]],
    ]);
  });

  it("detects an existing remote", async () => {
    const runner = new MockRunner().queue({ stdout: "https://github.com/user/repo.git" });
    const git = new GitService(runner, "C:/project");

    await expect(git.hasRemote()).resolves.toBe(true);
    expect(runner.commands[0].args).toEqual(["remote", "get-url", "origin"]);
  });

  it("reads the remote default branch", async () => {
    const runner = new MockRunner().queue({ stdout: "ref: refs/heads/main\tHEAD\n" });
    const git = new GitService(runner, "C:/project");

    await expect(git.remoteHeadBranch()).resolves.toBe("main");
    expect(runner.commands[0].args).toEqual(["ls-remote", "--symref", "origin", "HEAD"]);
  });

  it("lists recent commits from a ref", async () => {
    const runner = new MockRunner().queue({
      stdout: "abc1234 Backup: 2026-06-20 10:00:00\nfed9876 Backup: 2026-06-19 10:00:00\n",
    });
    const git = new GitService(runner, "C:/project");

    await expect(git.listRecentCommits("origin/main", 2)).resolves.toEqual([
      "abc1234 Backup: 2026-06-20 10:00:00",
      "fed9876 Backup: 2026-06-19 10:00:00",
    ]);
    expect(runner.commands[0].args).toEqual([
      "log",
      "--max-count=2",
      "--format=%h %s",
      "origin/main",
    ]);
  });

  it("clones and checks out a detached restore ref", async () => {
    const runner = new MockRunner().queue({}).queue({});
    const git = new GitService(runner, "C:/project");

    await git.clone("https://github.com/user/repo.git", "C:/restored");
    await git.checkoutDetached("C:/restored", "abc1234");

    expect(runner.commands.map((entry) => entry.args)).toEqual([
      ["clone", "https://github.com/user/repo.git", "C:/restored"],
      ["checkout", "--detach", "abc1234"],
    ]);
    expect(runner.commandOptions.map((entry) => entry?.cwd)).toEqual(["C:/project", "C:/restored"]);
  });

  it("configures local author identity", async () => {
    const runner = new MockRunner().queue({}).queue({});
    const git = new GitService(runner, "C:/project");

    await git.setLocalAuthorIdentity("Gaze Afar", "33276444+GazeAfar@users.noreply.github.com");

    expect(runner.commands.map((entry) => entry.args)).toEqual([
      ["config", "user.name", "Gaze Afar"],
      ["config", "user.email", "33276444+GazeAfar@users.noreply.github.com"],
    ]);
  });

  it("counts changed files from porcelain status", async () => {
    const runner = new MockRunner().queue({ stdout: " M app.ts\n?? notes.md\nA  src/new.ts\n" });
    const git = new GitService(runner, "C:/project");

    await expect(git.changedFileCount()).resolves.toBe(3);
    expect(runner.commands[0].args).toEqual(["status", "--porcelain"]);
  });

  it("counts diff lines from numstat output", async () => {
    const runner = new MockRunner().queue({ stdout: "10\t5\tapp.ts\n-\t-\timage.png\n2\t3\tREADME.md" });
    const git = new GitService(runner, "C:/project");

    await expect(git.diffLineCount()).resolves.toBe(20);
    expect(runner.commands[0].args).toEqual(["diff", "--numstat", "HEAD"]);
  });

  it("returns zero diff lines when HEAD diff is unavailable", async () => {
    const runner = new MockRunner().queue({ failed: true, stderr: "bad revision HEAD" });
    const git = new GitService(runner, "C:/project");

    await expect(git.diffLineCount()).resolves.toBe(0);
  });
});
