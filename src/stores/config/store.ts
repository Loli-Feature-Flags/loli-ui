import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { LoliSpec } from '@loli-feature-flags/loli-sdk'
import type { NavigationState } from '@/stores/navigation/NavigationState'
import type {
  HideableView,
  SpecIssueListener,
  SpecIssueType,
  NavigationStateChangeListener,
  NavigationStateChangeSource,
  NavigationStateChangeType,
  SpecChangeListener
} from '@/stores/config/types'

export const useConfig = defineStore('config', () => {
  const specChangeListeners = ref<Set<SpecChangeListener>>(new Set())
  const changeListeners = ref<Set<NavigationStateChangeListener>>(new Set())
  const specIssueListeners = ref<Set<SpecIssueListener>>(new Set())
  const hiddenViews = ref<HideableView[]>([])
  const floatingZIndex = ref<number>(2000)

  // Spec change listener related functions
  function unregisterSpecChangeListener(specChangeListener: SpecChangeListener) {
    specChangeListeners.value.delete(specChangeListener)
  }

  function registerSpecChangeListener(specChangeListener: SpecChangeListener) {
    specChangeListeners.value.add(specChangeListener)

    return () => {
      unregisterSpecChangeListener(specChangeListener)
    }
  }

  function informSpecChangeListeners(spec: LoliSpec) {
    specChangeListeners.value.forEach((changeListener) => changeListener(spec))
  }

  // Navigation state change listener related functions
  function unregisterNavigationChangeListener(changeListener: NavigationStateChangeListener) {
    changeListeners.value.delete(changeListener)
  }

  function registerNavigationChangeListener(
    changeListener: NavigationStateChangeListener
  ): () => void {
    changeListeners.value.add(changeListener)

    return () => {
      unregisterNavigationChangeListener(changeListener)
    }
  }

  function informNavigationChangeListeners(
    state: NavigationState,
    source: NavigationStateChangeSource,
    changeType: NavigationStateChangeType
  ) {
    changeListeners.value.forEach((changeListener) => {
      changeListener(state, source, changeType)
    })
  }

  // Issue listener related functions
  function unregisterSpecIssueListener(issueListener: SpecIssueListener) {
    specIssueListeners.value.delete(issueListener)
  }

  function registerSpecIssueListener(specIssueListener: SpecIssueListener): () => void {
    specIssueListeners.value.add(specIssueListener)

    return () => {
      unregisterSpecIssueListener(specIssueListener)
    }
  }

  function informSpecIssueListeners(type: SpecIssueType) {
    specIssueListeners.value.forEach((specIssueListener) => {
      specIssueListener(type)
    })
  }

  // Hidden views related functions
  function setHiddenViews(viewsToHide: HideableView[]) {
    hiddenViews.value = viewsToHide
  }

  function isViewHidden(view: HideableView) {
    return hiddenViews.value.includes(view)
  }

  function isViewVisible(view: HideableView) {
    return !isViewHidden(view)
  }

  function setFloatingZIndex(zIndex: number) {
    floatingZIndex.value = zIndex
  }

  function getFloatingZIndexStyle() {
    return `z-index: ${floatingZIndex.value};`
  }

  return {
    registerSpecChangeListener,
    unregisterSpecChangeListener,
    informSpecChangeListeners,
    registerNavigationChangeListener,
    unregisterNavigationChangeListener,
    informNavigationChangeListeners,
    registerSpecIssueListener,
    unregisterSpecIssueListener,
    informSpecIssueListeners,
    setHiddenViews,
    isViewHidden,
    isViewVisible,
    floatingZIndex,
    setFloatingZIndex,
    getFloatingZIndexStyle
  }
})
