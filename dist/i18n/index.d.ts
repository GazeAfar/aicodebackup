import { type Language, type MessageKey } from "./messages.js";
export type { Language, MessageKey } from "./messages.js";
export declare function resolveLanguage(language?: string): Language;
export declare function t(language: Language, key: MessageKey, values?: Record<string, string>): string;
