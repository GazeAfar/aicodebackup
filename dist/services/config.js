import Conf from "conf";
import { resolveLanguage } from "../i18n/index.js";
export class ConfigService {
    conf = new Conf({
        projectName: "aicodebackup",
    });
    getLanguage() {
        return resolveLanguage(this.conf.get("language"));
    }
    setLanguage(language) {
        this.conf.set("language", language);
    }
    setLastBackupAt(timestamp) {
        this.conf.set("lastBackupAt", timestamp);
    }
}
//# sourceMappingURL=config.js.map