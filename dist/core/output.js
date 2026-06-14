import { t } from "../i18n/index.js";
export class ConsoleOutput {
    info(message) {
        console.log(message);
    }
    success(message) {
        console.log(`✓ ${message}`);
    }
    warning(message) {
        console.log(`! ${message}`);
    }
    error(message) {
        console.error(`✗ ${message}`);
    }
    status(kind, message, detail) {
        const marker = kind === "ok" ? "✓" : kind === "fail" ? "✗" : "!";
        console.log(`${marker} ${message}${detail ? ` - ${detail}` : ""}`);
    }
}
export class MemoryOutput {
    lines = [];
    errorLines = [];
    info(message) {
        this.lines.push(message);
    }
    success(message) {
        this.lines.push(`✓ ${message}`);
    }
    warning(message) {
        this.lines.push(`! ${message}`);
    }
    error(message) {
        this.errorLines.push(`✗ ${message}`);
    }
    status(kind, message, detail) {
        const marker = kind === "ok" ? "✓" : kind === "fail" ? "✗" : "!";
        this.lines.push(`${marker} ${message}${detail ? ` - ${detail}` : ""}`);
    }
}
export function nextStep(language, key) {
    return `${t(language, "common.nextStep")} ${t(language, key)}`;
}
//# sourceMappingURL=output.js.map