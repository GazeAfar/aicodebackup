import { describe, expect, it } from "vitest";
import { GitHubCliService } from "../src/services/github-cli.js";
import { MockRunner } from "./helpers/mock-runner.js";

describe("GitHubCliService", () => {
  it("checks GitHub CLI installation", async () => {
    const runner = new MockRunner().queue({ stdout: "gh version 2.0.0" });
    const gh = new GitHubCliService(runner, "C:/project");

    await expect(gh.isInstalled()).resolves.toBe(true);
    expect(runner.commands[0]).toEqual({ command: "gh", args: ["--version"] });
  });

  it("checks authentication status", async () => {
    const runner = new MockRunner().queue({});
    const gh = new GitHubCliService(runner, "C:/project");

    await expect(gh.isAuthenticated()).resolves.toBe(true);
    expect(runner.commands[0]).toEqual({ command: "gh", args: ["auth", "status"] });
  });

  it("creates private repositories by default", async () => {
    const runner = new MockRunner().queue({});
    const gh = new GitHubCliService(runner, "C:/project");

    await gh.createPrivateRepository("demo");
    expect(runner.commands[0]).toEqual({
      command: "gh",
      args: ["repo", "create", "demo", "--private", "--source=.", "--remote=origin"],
    });
  });
});
