export interface CommandResult {
    exitCode: number;
    stdout: string;
    stderr: string;
    failed: boolean;
}
export interface RunCommandOptions {
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    interactive?: boolean;
    input?: string;
}
export interface CommandRunner {
    run(command: string, args?: string[], options?: RunCommandOptions): Promise<CommandResult>;
}
export declare class ExecaCommandRunner implements CommandRunner {
    run(command: string, args?: string[], options?: RunCommandOptions): Promise<CommandResult>;
}
