import { t, type Language } from "../i18n/index.js";
import type { MessageKey } from "../i18n/messages.js";

export interface Output {
  info(message: string): void;
  success(message: string): void;
  warning(message: string): void;
  error(message: string): void;
  status(kind: "ok" | "fail" | "warn", message: string, detail?: string): void;
}

export class ConsoleOutput implements Output {
  info(message: string): void {
    console.log(message);
  }

  success(message: string): void {
    console.log(`✓ ${message}`);
  }

  warning(message: string): void {
    console.log(`! ${message}`);
  }

  error(message: string): void {
    console.error(`✗ ${message}`);
  }

  status(kind: "ok" | "fail" | "warn", message: string, detail?: string): void {
    const marker = kind === "ok" ? "✓" : kind === "fail" ? "✗" : "!";
    console.log(`${marker} ${message}${detail ? ` - ${detail}` : ""}`);
  }
}

export class MemoryOutput implements Output {
  readonly lines: string[] = [];
  readonly errorLines: string[] = [];

  info(message: string): void {
    this.lines.push(message);
  }

  success(message: string): void {
    this.lines.push(`✓ ${message}`);
  }

  warning(message: string): void {
    this.lines.push(`! ${message}`);
  }

  error(message: string): void {
    this.errorLines.push(`✗ ${message}`);
  }

  status(kind: "ok" | "fail" | "warn", message: string, detail?: string): void {
    const marker = kind === "ok" ? "✓" : kind === "fail" ? "✗" : "!";
    this.lines.push(`${marker} ${message}${detail ? ` - ${detail}` : ""}`);
  }
}

export function nextStep(language: Language, key: MessageKey): string {
  return `${t(language, "common.nextStep")} ${t(language, key)}`;
}
