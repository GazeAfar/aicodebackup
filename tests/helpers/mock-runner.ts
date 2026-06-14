import type { CommandResult, CommandRunner } from "../../src/core/command-runner.js";

export interface RecordedCommand {
  command: string;
  args: string[];
}

export class MockRunner implements CommandRunner {
  readonly commands: RecordedCommand[] = [];
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

  async run(command: string, args: string[] = []): Promise<CommandResult> {
    this.commands.push({ command, args });
    return this.responses.shift() ?? { exitCode: 0, stdout: "", stderr: "", failed: false };
  }
}
