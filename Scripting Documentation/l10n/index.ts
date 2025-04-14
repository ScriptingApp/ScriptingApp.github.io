import { l10nEN } from "./en"
import { l10nZH } from "./zh"

export function getL10n(locale: string) {
  return locale.startsWith('zh') ? l10nZH : l10nEN
}

export const supportedLanguages: {
  locale: string
  name: string
}[] = [{
  locale: "en",
  name: "English",
}, {
  locale: "zh",
  name: "中文",
}]