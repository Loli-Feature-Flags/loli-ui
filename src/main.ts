import type { LoliUiMountOptions, LoliUiMountResult } from './main/types'
import { initializeFonts } from './main/fonts'
import { initializeApp } from './main/app'
import { initializePlugins } from './main/plugins'
import { initializeDirectives } from './main/directives'
import { initializeStores } from './main/stores'
import { initializeStyles } from './main/styles'
import { mountApp } from './main/mount'
import { useWorkbench } from './stores/workbench/store'
import { useNavigation } from './stores/navigation/store'

/**
 * Initializes and mounts an instance of Loli UI
 * in the given container and with the given options.
 *
 * @param container Container element to add Loli UI to.
 * @param options Optional options.
 */
export function mountLoliUi(
  container: HTMLElement,
  options?: LoliUiMountOptions
): LoliUiMountResult {
  const removeFonts = initializeFonts()

  const app = initializeApp()

  initializePlugins(app)
  initializeDirectives(app)

  // Important: We configure the stores before mounting the app
  // to not cause flashing changes on start!
  initializeStores(options)

  const removeStyles = initializeStyles(container)
  const unmountApp = mountApp(app, container)

  return {
    unmount: () => {
      unmountApp()
      removeFonts()
      removeStyles()
    },
    updateSpec: (spec) => {
      useWorkbench().setRawSpec(spec)
    },
    updateNavigationState: (navigationState) => {
      if (navigationState) {
        useNavigation().replace(navigationState, 'external')
      } else {
        useNavigation().reset('external')
      }
    }
  }
}

declare global {
  interface Window {
    mountLoliUi: typeof mountLoliUi
  }
}

window.mountLoliUi = mountLoliUi

// We fire a custom event to let consumers now that the global function is available
window.dispatchEvent(new CustomEvent('loli-ui-library-available'))
