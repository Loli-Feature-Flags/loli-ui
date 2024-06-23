import type { NavigationState } from '@/stores/navigation/NavigationState'
import type { LoliSpec } from '@loli-feature-flags/loli-sdk-js'

export type SpecChangeListener = (spec: LoliSpec) => void

export type NavigationStateChangeType = 'push' | 'replace'

export type NavigationStateChangeSource = 'loli-app' | 'external'

export type NavigationStateChangeListener = (
  newState: NavigationState,
  source: NavigationStateChangeSource,
  changeType: NavigationStateChangeType
) => void

export type HideableView = NavigationState['view'] | 'initializeSpec'

export type SpecIssueType = 'malformed-json' | 'invalid-schema' | 'semantic-issue'

export type SpecIssueListener = (type: SpecIssueType) => void
