export class AICodeBackupError extends Error {
    nextStep;
    constructor(message, nextStep) {
        super(message);
        this.nextStep = nextStep;
        this.name = "AICodeBackupError";
    }
}
export class CommandFailedError extends AICodeBackupError {
    command;
    result;
    constructor(command, result, nextStep) {
        const detail = result.stderr.trim() || result.stdout.trim() || `Exit code ${result.exitCode}`;
        super(`${command} failed: ${detail}`, nextStep);
        this.command = command;
        this.result = result;
        this.name = "CommandFailedError";
    }
}
export function normalizeError(error) {
    if (error instanceof AICodeBackupError) {
        return error;
    }
    if (error instanceof Error) {
        return new AICodeBackupError(error.message);
    }
    return new AICodeBackupError("An unknown error occurred.");
}
//# sourceMappingURL=errors.js.map