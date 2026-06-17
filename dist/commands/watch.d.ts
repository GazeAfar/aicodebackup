import type { Output } from "../core/output.js";
import { type Language } from "../i18n/index.js";
import type { GitService } from "../services/git.js";
export interface WatchConfig {
    getLastBackupAt(): string | undefined;
    setLastBackupAt(timestamp: string): void;
}
export interface WatchThresholds {
    changedFiles: number;
    diffLines: number;
    minutesSinceLastBackup: number;
}
export interface WatchOptions {
    auto: boolean;
    intervalMs: number;
    once?: boolean;
    thresholds: WatchThresholds;
    now?: () => Date;
}
export interface WatchRiskReport {
    risky: boolean;
    changedFiles: number;
    diffLines: number;
    minutesSinceLastBackup?: number;
    hasLastBackup: boolean;
}
export interface WatchPrompt {
    confirmBackup(language: Language): Promise<boolean>;
}
export declare class InquirerWatchPrompt implements WatchPrompt {
    confirmBackup(language: Language): Promise<boolean>;
}
export declare const defaultWatchThresholds: WatchThresholds;
export declare function runWatch(git: GitService, output: Output, language: Language, config: WatchConfig, options: WatchOptions, prompt?: WatchPrompt): Promise<void>;
export declare function getWatchRiskReport(git: GitService, config: WatchConfig, thresholds: WatchThresholds, now?: Date): Promise<WatchRiskReport>;
