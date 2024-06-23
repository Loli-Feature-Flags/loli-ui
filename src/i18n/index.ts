import type { I18nLocaleMessages, I18nSupportedLocales } from '@/i18n/types'
import en from './en'
import { createI18n } from 'vue-i18n'

function replaceLetters(inputString: string, characters: string): string {
  let result = ''

  for (const char of inputString) {
    if (/[a-zA-Z]/.test(char)) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      result += characters[randomIndex]
    } else {
      result += char
    }
  }

  return result
}

const RANDOM_LETTERS = '?=*+#%§&abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

type Messages = { [key: string]: string | Messages }

function randomizeMessages(value: Messages): Messages {
  const clone: Messages = structuredClone(value)

  Object.entries(clone).forEach(([key, value]) => {
    if (typeof value === 'string') {
      clone[key] = replaceLetters(value, RANDOM_LETTERS)
    } else {
      clone[key] = randomizeMessages(value)
    }
  })

  return clone
}

export const I18nMessages: { [key in I18nSupportedLocales]: I18nLocaleMessages } = {
  // en: randomizeMessages(en) as I18nLocaleMessages
  en: en
}

export const i18n = createI18n<[I18nLocaleMessages], I18nSupportedLocales>({
  legacy: false,
  locale: navigator.language.substring(0, 2).toLowerCase(),
  fallbackLocale: 'en' satisfies I18nSupportedLocales,
  messages: I18nMessages
})
