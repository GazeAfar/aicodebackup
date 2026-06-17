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
export async function runSetup(git, gh, installer, output, language, prompt = new InquirerSetupPrompt(), cwd = process.cwd()) {
    output.info(t(language, "setup.title"));
    if (!(await git.isInstalled())) {
        output.info(t(language, "setup.installingGit"));
        await installer.installGit();
        if (!(await git.isInstalled())) {
            throw new AICodeBackupError(t(language, "setup.gitInstallFailed"), t(language, "doctor.installGit"));
        }
    }
    if (!(await gh.isInstalled())) {
        output.info(t(language, "setup.installingGh"));
        await installer.installGitHubCli();
        if (!(await gh.isInstalled())) {
            throw new AICodeBackupError(t(language, "setup.ghInstallFailed"), t(language, "setup.ghMissingHelp"));
        }
    }
    if (!(await gh.isAuthenticated())) {
        output.info(t(language, "setup.ghNotLoggedIn"));
        output.info(t(language, "setup.startingGhLogin"));
        await gh.login();
        if (!(await gh.isAuthenticated())) {
            throw new AICodeBackupError(t(language, "setup.ghLoginFailed"), t(language, "setup.ghLoginHelp"));
        }
    }
    if (!(await git.isRepository())) {
        await git.init();
        output.success(t(language, "setup.repoInitialized"));
    }
    if (!(await git.hasAuthorIdentity())) {
        const user = await gh.getCurrentUser();
        const name = user.name?.trim() || user.login;
        const email = `${user.id}+${user.login}@users.noreply.github.com`;
        await git.setLocalAuthorIdentity(name, email);
        output.success(t(language, "setup.gitIdentityConfigured"));
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