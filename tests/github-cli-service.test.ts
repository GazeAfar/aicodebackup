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

  it("starts browser login", async () => {
    const openedUrls: string[] = [];
    const runner = new MockRunner().queue({}).queue({});
    const gh = new GitHubCliService(runner, "C:/project", "win32", (url) => {
      openedUrls.push(url);
    });

    await expect(gh.login()).resolves.toBe(true);
    expect(runner.commands).toEqual([
      {
        command: "gh",
        args: ["auth", "login", "--web", "--hostname", "github.com", "--git-protocol", "https", "--skip-ssh-key"],
      },
      {
        command: "gh",
        args: ["auth", "setup-git", "--hostname", "github.com"],
      },
    ]);
    expect(openedUrls).toEqual(["https://github.com/login/device"]);
    expect(runner.commandOptions[0]).toMatchObject({ interactive: true, input: "Y\n" });
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

  it("reads the current GitHub user", async () => {
    const runner = new MockRunner().queue({
      stdout: '{"login":"GazeAfar","id":33276444,"name":"Gaze Afar"}',
    });
    const gh = new GitHubCliService(runner, "C:/project");

    await expect(gh.getCurrentUser()).resolves.toEqual({
      login: "GazeAfar",
      id: 33276444,
      name: "Gaze Afar",
    });
    expect(runner.commands[0]).toEqual({
      command: "gh",
      args: ["api", "user", "--jq", "{login:.login,id:.id,name:.name}"],
    });
  });
});
