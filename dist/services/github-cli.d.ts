import type { CommandRunner } from "../core/command-runner.js";
export declare class GitHubCliService {
    private readonly runner;
    private readonly cwd;
    constructor(runner: CommandRunner, cwd?: string);
    isInstalled(): Promise<boolean>;
    isAuthenticated(): Promise<boolean>;
    createPrivateRepository(name: string): Promise<void>;
}
