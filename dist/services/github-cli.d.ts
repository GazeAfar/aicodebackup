import type { CommandRunner } from "../core/command-runner.js";
export interface GitHubUser {
    login: string;
    id: number;
    name?: string;
}
export declare class GitHubCliService {
    private readonly runner;
    private readonly cwd;
    constructor(runner: CommandRunner, cwd?: string);
    isInstalled(): Promise<boolean>;
    isAuthenticated(): Promise<boolean>;
    login(): Promise<boolean>;
    createPrivateRepository(name: string): Promise<void>;
    getCurrentUser(): Promise<GitHubUser>;
}
