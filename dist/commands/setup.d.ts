import type { Output } from "../core/output.js";
import { type Language } from "../i18n/index.js";
import type { GitService } from "../services/git.js";
import type { GitHubCliService } from "../services/github-cli.js";
import type { InstallerService } from "../services/installer.js";
export interface SetupPrompt {
    hasGitHubAccount(language: Language): Promise<boolean>;
    repositoryName(defaultName: string, language: Language): Promise<string>;
    githubAccountReady(language: Language): Promise<void>;
}
export declare class InquirerSetupPrompt implements SetupPrompt {
    hasGitHubAccount(language: Language): Promise<boolean>;
    githubAccountReady(language: Language): Promise<void>;
    repositoryName(defaultName: string, language: Language): Promise<string>;
}
export declare function runSetup(git: GitService, gh: GitHubCliService, installer: InstallerService, output: Output, language: Language, prompt?: SetupPrompt, cwd?: string): Promise<void>;
