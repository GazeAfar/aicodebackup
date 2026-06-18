import type { CommandRunner } from "../core/command-runner.js";
export interface GitHubUser {
    login: string;
    id: number;
    name?: string;
}
type BrowserOpener = (url: string, platform: NodeJS.Platform) => void;
export declare class GitHubCliService {
    private readonly runner;
    private readonly cwd;
    private readonly platform;
    private readonly openBrowser;
    constructor(runner: CommandRunner, cwd?: string, platform?: NodeJS.Platform, openBrowser?: BrowserOpener);
    isInstalled(): Promise<boolean>;
    isAuthenticated(): Promise<boolean>;
    login(): Promise<boolean>;
    createPrivateRepository(name: string): Promise<void>;
    getCurrentUser(): Promise<GitHubUser>;
    private openDeviceLoginPage;
}
export {};
