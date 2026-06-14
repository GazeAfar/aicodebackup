import { messages, type Language, type MessageKey } from "./messages.js";

export type { Language, MessageKey } from "./messages.js";

export function resolveLanguage(language?: string): Language {
  if (language === "zh-CN" || language === "en") {
    return language;
  }

  return "en";
}

export function t(language: Language, key: MessageKey, values: Record<string, string> = {}): string {
  let template: string = messages[language][key] ?? messages.en[key];

  for (const [name, value] of Object.entries(values)) {
    template = template.replaceAll(`{${name}}`, value);
  }

  return template;
}
