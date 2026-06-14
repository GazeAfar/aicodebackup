import type { Output } from "../core/output.js";
import { type Language } from "../i18n/index.js";
import type { GitService } from "../services/git.js";
import type { GitHubCliService } from "../services/github-cli.js";
export interface SetupPrompt {
    repositoryName(defaultName: string, language: Language): Promise<string>;
}
export declare class InquirerSetupPrompt implements SetupPrompt {
    repositoryName(defaultName: string, language: Language): Promise<string>;
}
export declare function runSetup(git: GitService, gh: GitHubCliService, output: Output, language: Language, prompt?: SetupPrompt, cwd?: string): Promise<void>;
