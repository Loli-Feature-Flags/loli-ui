import type { LoliSpec } from '@loli-feature-flags/loli-sdk'
import type { NavigationState } from '../stores/navigation/NavigationState'
import type {
  HideableView,
  LoliUiAppearance,
  NavigationStateChangeListener,
  SpecChangeListener,
  SpecIssueListener
} from '../stores/config/types'

export type LoliUiMountOptions = {
  initialSpec?: LoliSpec | object | string | null
  initialNavigationState?: NavigationState | null
  hiddenViews?: HideableView[]
  specChangeListener?: SpecChangeListener
  specIssueListener?: SpecIssueListener
  navigationStateChangeListener?: NavigationStateChangeListener
  floatingZIndex?: number
  appearance?: LoliUiAppearance
}

export type LoliUiMountResult = {
  unmount: () => void
  updateSpec: (spec: LoliSpec | object | string | null | undefined) => void
  updateNavigationState: (navigationState: NavigationState | null | undefined) => void
  updateAppearance: (newAppearance: LoliUiAppearance) => void
}
