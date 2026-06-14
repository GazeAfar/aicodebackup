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
});
