import type { CommandResult } from "./command-runner.js";

export class AICodeBackupError extends Error {
  constructor(
    message: string,
    public readonly nextStep?: string,
  ) {
    super(message);
    this.name = "AICodeBackupError";
  }
}

export class CommandFailedError extends AICodeBackupError {
  constructor(
    public readonly command: string,
    public readonly result: CommandResult,
    nextStep?: string,
  ) {
    const detail = result.stderr.trim() || result.stdout.trim() || `Exit code ${result.exitCode}`;
    super(`${command} failed: ${detail}`, nextStep);
    this.name = "CommandFailedError";
  }
}

export function normalizeError(error: unknown): AICodeBackupError {
  if (error instanceof AICodeBackupError) {
    return error;
  }

  if (error instanceof Error) {
    return new AICodeBackupError(error.message);
  }

  return new AICodeBackupError("An unknown error occurred.");
}
