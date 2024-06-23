import type { App } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from '@/i18n/index'

/**
 * Initializes all Vue plugins that Loli UI uses.
 * This includes:
 *  - Pinia
 *  - i18n
 *
 * @param app App to install plugins on.
 */
export function initializePlugins(app: App) {
  app.use(createPinia())
  app.use(i18n)
}
