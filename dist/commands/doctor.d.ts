import type { Output } from "../core/output.js";
import { type Language } from "../i18n/index.js";
import type { GitService } from "../services/git.js";
import type { GitHubCliService } from "../services/github-cli.js";
export interface DoctorSummary {
    ok: boolean;
}
export declare function runDoctor(git: GitService, gh: GitHubCliService, output: Output, language: Language): Promise<DoctorSummary>;
