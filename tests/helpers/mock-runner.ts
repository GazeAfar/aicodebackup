import type { CommandResult, CommandRunner, RunCommandOptions } from "../../src/core/command-runner.js";

export interface RecordedCommand {
  command: string;
  args: string[];
}

export class MockRunner implements CommandRunner {
  readonly commands: RecordedCommand[] = [];
  readonly commandOptions: Array<RunCommandOptions | undefined> = [];
  private responses: CommandResult[] = [];

  queue(response: Partial<CommandResult>): this {
    this.responses.push({
      exitCode: response.exitCode ?? (response.failed ? 1 : 0),
      stdout: response.stdout ?? "",
      stderr: response.stderr ?? "",
      failed: response.failed ?? false,
    });
    return this;
  }

  async run(
    command: string,
    args: string[] = [],
    options?: RunCommandOptions,
  ): Promise<CommandResult> {
    this.commands.push({ command, args });
    this.commandOptions.push(options);
    return this.responses.shift() ?? { exitCode: 0, stdout: "", stderr: "", failed: false };
  }
}
