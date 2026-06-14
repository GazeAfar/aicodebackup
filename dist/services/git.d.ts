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
    statusPorcelain(): Promise<string>;
    hasChanges(): Promise<boolean>;
    addAll(): Promise<void>;
    commit(message: string): Promise<void>;
    push(): Promise<void>;
    lastCommit(): Promise<string | undefined>;
    private succeeds;
    private mustRun;
}
