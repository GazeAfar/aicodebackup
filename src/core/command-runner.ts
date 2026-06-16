import { execa } from "execa";

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
}

export interface CommandRunner {
  run(command: string, args?: string[], options?: RunCommandOptions): Promise<CommandResult>;
}

export class ExecaCommandRunner implements CommandRunner {
  async run(
    command: string,
    args: string[] = [],
    options: RunCommandOptions = {},
  ): Promise<CommandResult> {
    const result = await execa(command, args, {
      cwd: options.cwd,
      env: options.env,
      stdio: options.interactive ? "inherit" : "pipe",
      reject: false,
      all: false,
    });

    return {
      exitCode: result.exitCode ?? 0,
      stdout: result.stdout ?? "",
      stderr: result.stderr ?? "",
      failed: result.failed,
    };
  }
}
