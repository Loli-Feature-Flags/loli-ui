import en from './en'
import { createI18n } from 'vue-i18n'
import type { I18nLocaleMessages, I18nSupportedLocales } from './types'

export const I18nMessages: { [key in I18nSupportedLocales]: I18nLocaleMessages } = {
  en: en
}

export const i18n = createI18n<[I18nLocaleMessages], I18nSupportedLocales>({
  legacy: false,
  locale: navigator.language.substring(0, 2).toLowerCase(),
  fallbackLocale: 'en' satisfies I18nSupportedLocales,
  messages: I18nMessages
})
