import path from "node:path";
import inquirer from "inquirer";
import { AICodeBackupError } from "../core/errors.js";
import { t } from "../i18n/index.js";
import { runBackup } from "./backup.js";
export class InquirerSetupPrompt {
    async repositoryName(defaultName, language) {
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "repositoryName",
                message: t(language, "setup.repoNameQuestion"),
                default: defaultName,
            },
        ]);
        return answers.repositoryName.trim() || defaultName;
    }
}
export async function runSetup(git, gh, output, language, prompt = new InquirerSetupPrompt(), cwd = process.cwd()) {
    output.info(t(language, "setup.title"));
    if (!(await git.isInstalled())) {
        throw new AICodeBackupError(t(language, "setup.gitMissing"));
    }
    if (!(await gh.isInstalled())) {
        throw new AICodeBackupError(t(language, "setup.ghMissing"), t(language, "setup.ghMissingHelp"));
    }
    if (!(await gh.isAuthenticated())) {
        throw new AICodeBackupError(t(language, "setup.ghNotLoggedIn"), t(language, "setup.ghLoginHelp"));
    }
    if (!(await git.isRepository())) {
        await git.init();
        output.success(t(language, "setup.repoInitialized"));
    }
    if (await git.hasRemote()) {
        output.info(t(language, "setup.remoteExists"));
    }
    else {
        const defaultName = path.basename(cwd);
        const repositoryName = await prompt.repositoryName(defaultName, language);
        await gh.createPrivateRepository(repositoryName);
        output.success(t(language, "setup.privateRepoCreated"));
    }
    output.info(t(language, "setup.firstBackup"));
    await runBackup(git, output, language);
    output.success(t(language, "setup.success"));
}
//# sourceMappingURL=setup.js.map