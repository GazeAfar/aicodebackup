import type { CommandRunner } from "../core/command-runner.js";
export type SupportedPlatform = "win32" | "darwin" | "other";
export declare class InstallerService {
    private readonly runner;
    private readonly platform;
    constructor(runner: CommandRunner, platform?: NodeJS.Platform);
    getPlatform(): SupportedPlatform;
    installGit(): Promise<boolean>;
    installGitHubCli(): Promise<boolean>;
    openGitHubSignup(): Promise<boolean>;
    openGitHubLogin(): Promise<boolean>;
    openUrl(url: string): Promise<boolean>;
    private succeeds;
}
