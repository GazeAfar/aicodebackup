import { execa } from "execa";
export class ExecaCommandRunner {
    async run(command, args = [], options = {}) {
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
function getStdio(options) {
    if (options.interactive && options.input) {
        return ["pipe", "inherit", "inherit"];
    }
    return options.interactive ? "inherit" : "pipe";
}
//# sourceMappingURL=command-runner.js.map