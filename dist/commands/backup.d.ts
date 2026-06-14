import type { Output } from "../core/output.js";
import { type Language } from "../i18n/index.js";
import type { GitService } from "../services/git.js";
export interface BackupResult {
    backedUp: boolean;
    commitMessage?: string;
}
export declare function runBackup(git: GitService, output: Output, language: Language, timestamp?: Date): Promise<BackupResult>;
