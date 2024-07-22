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
  /**
   * Optional Loli specification that shall be shown
   * when the UI is created. This can either be a
   * JSON string or an object.
   *
   * If it is "null", the UI assumes no specification is present yet.
   *
   * Then the UI will show a "Create a new specification" screen.
   */
  initialSpec?: LoliSpec | object | string | null

  /**
   * Optional initial UI navigation state.
   *
   * If null is supplied, the UI will show the following:
   *  - the "create new spec" screen (if no spec is given),
   *  - the feature flags tab (if a spec is given),
   *  - or the JSON editor view (in case the given spec has severe issues).
   */
  initialNavigationState?: NavigationState | null

  /**
   * Optional array of views to be hidden from the user.
   * If all views are hidden, the user sees a "no view accessible" screen.
   *
   * Default value: [] (empty array: all views are visible)
   */
  hiddenViews?: HideableView[]

  /**
   * Optional listener that is executed by the UI
   * whenever a change resulted in a new and changed spec version.
   *
   * The listener receives the newest spec version.
   *
   * If any change in the UI causes schema or semantic issues, this listener
   * will never be called.
   */
  specChangeListener?: SpecChangeListener

  /**
   * Optional listener that is executed by the UI
   * whenever a change made in the UI causes results in an invalid
   * spec. This can mean the spec has either schema or semantic issues.
   * This listener also receives the issue type.
   */
  specIssueListener?: SpecIssueListener

  /**
   * Optional listener that is executed by the UI whenever the user
   * navigates to a different tab or modal. The listener
   * receives the newest NavigationState. The listener
   * can for example serialize the state and attach it as a query
   * parameter to the URL or save it to the localStorage.
   */
  navigationStateChangeListener?: NavigationStateChangeListener

  /**
   * Optional CSS z-index to be used for all floating elements
   * like select dropdowns, modals, or tooltips.
   *
   * You may override this to prevent conflicts with floating elements
   * of your host application.
   *
   * Default value: 2000
   */
  floatingZIndex?: number

  /**
   * Optional setting which color theme to display. If this is "system",
   * the UI will automatically show the "light" or "dark" theme
   * depending on the system's appearance. If this value is "light" or "dark"
   * instead, the UI uses a fixed "light" respectively "dark" appearance.
   *
   * Default value: system
   */
  appearance?: LoliUiAppearance
}

export type LoliUiInterface = {
  /**
   * Unmounts the Loli UI from the container, removes all injected font style tags, and
   * removes all injected CSS style tags.
   */
  unmount: () => void

  /**
   * Allows you to override the specification the UI shall display. This may be necessary
   * when polling new versions or when displaying updates from others.
   *
   * If the given spec is nullish, the UI is reset and displays again the "create new spec" screen.
   *
   * @param spec Loli spec to show. Either JSON string, object, or null/undefined.
   */
  updateSpec: (spec: LoliSpec | object | string | null | undefined) => void

  /**
   * This function updates the internal UI navigation state with the given one. If null is supplied,
   * the UI will show the following:
   *  - the "create new spec" screen (if no spec is given),
   *  - the feature flags tab (if a spec is given),
   *  - the JSON editor view (in case the given spec has severe issues)
   *
   * @param navigationState New navigation state to display or nullish value to reset navigation state.
   */
  updateNavigationState: (navigationState: NavigationState | null | undefined) => void

  /**
   * This function update's the appearance setting. This is related to
   * the "appearance" option you can set on mount.
   *
   * If set the appearance to "system", the UI will automatically show the
   * "light" or "dark" theme depending on the system's appearance. If this value
   * is "light" or "dark" instead, the UI uses a fixed "light" respectively "dark" appearance.
   *
   * @param newAppearance New appearance setting to use.
   */
  updateAppearance: (newAppearance: LoliUiAppearance) => void
}
