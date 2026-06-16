import { execa } from "execa";
export class ExecaCommandRunner {
    async run(command, args = [], options = {}) {
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
//# sourceMappingURL=command-runner.js.map