import Conf from "conf";
import { resolveLanguage, type Language } from "../i18n/index.js";

interface AICodeBackupConfig {
  language?: Language;
  lastBackupAt?: string;
}

export class ConfigService {
  private readonly conf = new Conf<AICodeBackupConfig>({
    projectName: "aicodebackup",
  });

  getLanguage(): Language {
    return resolveLanguage(this.conf.get("language"));
  }

  setLanguage(language: Language): void {
    this.conf.set("language", language);
  }

  setLastBackupAt(timestamp: string): void {
    this.conf.set("lastBackupAt", timestamp);
  }
}
