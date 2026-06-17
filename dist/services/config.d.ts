import { type Language } from "../i18n/index.js";
export declare class ConfigService {
    private readonly conf;
    getLanguage(): Language;
    setLanguage(language: Language): void;
    getLastBackupAt(): string | undefined;
    setLastBackupAt(timestamp: string): void;
}
