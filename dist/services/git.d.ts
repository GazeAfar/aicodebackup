import type { CommandRunner } from "../core/command-runner.js";
export declare class GitService {
    private readonly runner;
    private readonly cwd;
    constructor(runner: CommandRunner, cwd?: string);
    isInstalled(): Promise<boolean>;
    isRepository(): Promise<boolean>;
    init(): Promise<void>;
    hasRemote(name?: string): Promise<boolean>;
    getRemoteUrl(name?: string): Promise<string | undefined>;
    hasAuthorIdentity(): Promise<boolean>;
    setLocalAuthorIdentity(name: string, email: string): Promise<void>;
    statusPorcelain(): Promise<string>;
    hasChanges(): Promise<boolean>;
    changedFileCount(): Promise<number>;
    diffLineCount(): Promise<number>;
    addAll(): Promise<void>;
    commit(message: string): Promise<void>;
    push(): Promise<void>;
    lastCommit(): Promise<string | undefined>;
    private getConfig;
    private succeeds;
    private mustRun;
}
