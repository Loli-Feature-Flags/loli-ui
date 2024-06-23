import type { App } from 'vue'

/**
 * Initializes custom Vue directives. This includes:
 *  - v-button-keyboard: Directive that executes "element.click" when the element receives a space bar or enter press.
 *
 * @param app App to install directives on.
 */
export function initializeDirectives(app: App) {
  app.directive('button-keyboard', {
    mounted(el) {
      el.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.keyCode === 13 || event.keyCode === 32) {
          event.preventDefault()
          el.click()
        }
      })
    }
  })
}
