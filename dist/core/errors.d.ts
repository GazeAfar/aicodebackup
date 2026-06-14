import type { CommandResult } from "./command-runner.js";
export declare class AICodeBackupError extends Error {
    readonly nextStep?: string | undefined;
    constructor(message: string, nextStep?: string | undefined);
}
export declare class CommandFailedError extends AICodeBackupError {
    readonly command: string;
    readonly result: CommandResult;
    constructor(command: string, result: CommandResult, nextStep?: string);
}
export declare function normalizeError(error: unknown): AICodeBackupError;
