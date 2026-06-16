import { Command } from "commander";
import { ExecaCommandRunner } from "./core/command-runner.js";
import { normalizeError } from "./core/errors.js";
import { ConsoleOutput } from "./core/output.js";
import { runBackup } from "./commands/backup.js";
import { runDoctor } from "./commands/doctor.js";
import { runSetup } from "./commands/setup.js";
import { resolveLanguage } from "./i18n/index.js";
import { ConfigService } from "./services/config.js";
import { GitService } from "./services/git.js";
import { GitHubCliService } from "./services/github-cli.js";
import { InstallerService } from "./services/installer.js";
import { version } from "./version.js";
export function createCli() {
    const program = new Command();
    program
        .name("aicodebackup")
        .description("Automatic private GitHub backups for AI-generated code.")
        .version(version)
        .option("--lang <language>", "Output language: en or zh-CN");
    program
        .command("doctor")
        .description("Check whether AICodeBackup can back up this project.")
        .option("--lang <language>", "Output language: en or zh-CN")
        .action(async (options, command) => {
        await withServices(readLanguageOption(options, command), async ({ git, gh, output, language }) => {
            await runDoctor(git, gh, output, language);
        });
    });
    program
        .command("backup")
        .description("Back up the current project to GitHub.")
        .option("--lang <language>", "Output language: en or zh-CN")
        .action(async (options, command) => {
        await withServices(readLanguageOption(options, command), async ({ git, output, language, config }) => {
            const result = await runBackup(git, output, language);
            if (result.backedUp) {
                config.setLastBackupAt(new Date().toISOString());
            }
        });
    });
    program
        .command("setup")
        .description("Connect this project to a private GitHub repository and run the first backup.")
        .option("--lang <language>", "Output language: en or zh-CN")
        .action(async (options, command) => {
        await withServices(readLanguageOption(options, command), async ({ git, gh, installer, output, language, config }) => {
            await runSetup(git, gh, installer, output, language);
            config.setLastBackupAt(new Date().toISOString());
        });
    });
    return program;
}
function readLanguageOption(options, command) {
    return options.lang ?? (command.parent?.opts().lang);
}
async function withServices(languageInput, action) {
    const config = new ConfigService();
    const language = resolveLanguage(languageInput ?? config.getLanguage());
    const output = new ConsoleOutput();
    const runner = new ExecaCommandRunner();
    const git = new GitService(runner);
    const gh = new GitHubCliService(runner);
    const installer = new InstallerService(runner);
    try {
        if (languageInput) {
            config.setLanguage(language);
        }
        await action({ git, gh, installer, output, language, config });
    }
    catch (error) {
        const normalized = normalizeError(error);
        output.error(normalized.message);
        if (normalized.nextStep) {
            output.info(normalized.nextStep);
        }
        process.exitCode = 1;
    }
}
//# sourceMappingURL=cli.js.map