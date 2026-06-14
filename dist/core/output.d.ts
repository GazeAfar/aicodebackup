import { type Language } from "../i18n/index.js";
import type { MessageKey } from "../i18n/messages.js";
export interface Output {
    info(message: string): void;
    success(message: string): void;
    warning(message: string): void;
    error(message: string): void;
    status(kind: "ok" | "fail" | "warn", message: string, detail?: string): void;
}
export declare class ConsoleOutput implements Output {
    info(message: string): void;
    success(message: string): void;
    warning(message: string): void;
    error(message: string): void;
    status(kind: "ok" | "fail" | "warn", message: string, detail?: string): void;
}
export declare class MemoryOutput implements Output {
    readonly lines: string[];
    readonly errorLines: string[];
    info(message: string): void;
    success(message: string): void;
    warning(message: string): void;
    error(message: string): void;
    status(kind: "ok" | "fail" | "warn", message: string, detail?: string): void;
}
export declare function nextStep(language: Language, key: MessageKey): string;
