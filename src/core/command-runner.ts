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
  input?: string;
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
      input: options.input,
      stdio: getStdio(options),
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

function getStdio(options: RunCommandOptions): "pipe" | "inherit" | ["pipe", "inherit", "inherit"] {
  if (options.interactive && options.input) {
    return ["pipe", "inherit", "inherit"];
  }

  return options.interactive ? "inherit" : "pipe";
}
