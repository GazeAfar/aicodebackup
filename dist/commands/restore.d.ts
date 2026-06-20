import type { Output } from "../core/output.js";
import { type Language } from "../i18n/index.js";
import type { GitService } from "../services/git.js";
export interface RestoreOptions {
    cwd: string;
    list?: boolean;
    limit: number;
    ref?: string;
    target?: string;
}
export declare function runRestore(git: GitService, output: Output, language: Language, options: RestoreOptions): Promise<void>;
