import { messages } from "./messages.js";
export function resolveLanguage(language) {
    if (language === "zh-CN" || language === "en") {
        return language;
    }
    return "en";
}
export function t(language, key, values = {}) {
    let template = messages[language][key] ?? messages.en[key];
    for (const [name, value] of Object.entries(values)) {
        template = template.replaceAll(`{${name}}`, value);
    }
    return template;
}
//# sourceMappingURL=index.js.map