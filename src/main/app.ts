import { type App, createApp } from 'vue'
import LoliApp from './../LoliApp.ce.vue'

/**
 * Creates a Vue app for {@link LoliApp}.
 *
 * @returns Returns the created Vue app.
 */
export function initializeApp(): App {
  return createApp(LoliApp)
}
