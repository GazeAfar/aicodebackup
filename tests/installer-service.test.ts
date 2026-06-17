import { describe, expect, it } from "vitest";
import { InstallerService } from "../src/services/installer.js";
import { MockRunner } from "./helpers/mock-runner.js";

describe("InstallerService", () => {
  it("installs Git on Windows through winget", async () => {
    const runner = new MockRunner().queue({});
    const installer = new InstallerService(runner, "win32");

    await expect(installer.installGit()).resolves.toBe(true);
    expect(runner.commands[0]).toEqual({
      command: "winget",
      args: ["install", "--id", "Git.Git", "-e", "--source", "winget"],
    });
  });

  it("installs GitHub CLI on Windows through winget", async () => {
    const runner = new MockRunner().queue({});
    const installer = new InstallerService(runner, "win32");

    await expect(installer.installGitHubCli()).resolves.toBe(true);
    expect(runner.commands[0]).toEqual({
      command: "winget",
      args: ["install", "--id", "GitHub.cli", "-e", "--source", "winget"],
    });
  });

  it("installs GitHub CLI on macOS through Homebrew when available", async () => {
    const runner = new MockRunner().queue({}).queue({});
    const installer = new InstallerService(runner, "darwin");

    await expect(installer.installGitHubCli()).resolves.toBe(true);
    expect(runner.commands.map((entry) => entry.args)).toEqual([["--version"], ["install", "gh"]]);
  });

  it("opens GitHub signup with the platform browser command", async () => {
    const runner = new MockRunner().queue({});
    const installer = new InstallerService(runner, "darwin");

    await expect(installer.openGitHubSignup()).resolves.toBe(true);
    expect(runner.commands[0]).toEqual({
      command: "open",
      args: ["https://github.com/signup"],
    });
  });

  it("opens GitHub login with the platform browser command", async () => {
    const runner = new MockRunner().queue({});
    const installer = new InstallerService(runner, "darwin");

    await expect(installer.openGitHubLogin()).resolves.toBe(true);
    expect(runner.commands[0]).toEqual({
      command: "open",
      args: ["https://github.com/login"],
    });
  });
});
