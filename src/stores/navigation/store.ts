import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type NavigationState, NavigationStateSchema } from './NavigationState'
import { useConfig } from '../config/store'
import type { NavigationStateChangeSource, NavigationStateChangeType } from '../config/types'

const DEFAULT_NAVIGATION_STATE: NavigationState = {
  view: 'featureFlags'
}

export const useNavigation = defineStore('navigation', () => {
  const config = useConfig()

  const state = ref<NavigationState>(DEFAULT_NAVIGATION_STATE)

  function setNewState(
    newState: NavigationState,
    changeType: NavigationStateChangeType,
    source?: NavigationStateChangeSource
  ) {
    const validationResult = NavigationStateSchema.safeParse(newState)

    if (validationResult.success) {
      state.value = newState
      config.informNavigationChangeListeners(
        validationResult.data,
        source ?? 'loli-app',
        changeType
      )
    } else {
      console.error(
        'Loli UI: Received an invalid navigation state. Resetting navigation to default state.'
      )

      state.value = DEFAULT_NAVIGATION_STATE
      config.informNavigationChangeListeners(DEFAULT_NAVIGATION_STATE, 'loli-app', 'replace')
    }
  }

  function push(newState: NavigationState, source?: NavigationStateChangeSource) {
    setNewState(newState, 'push', source)
  }

  function replace(newState: NavigationState, source?: NavigationStateChangeSource) {
    setNewState(newState, 'replace', source)
  }

  function reset(source?: NavigationStateChangeSource) {
    replace(DEFAULT_NAVIGATION_STATE, source)
  }

  return {
    state,
    push,
    replace,
    reset
  }
})
