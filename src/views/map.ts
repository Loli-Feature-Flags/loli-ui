import type { Component } from 'vue'
import type { NavigationState } from '../stores/navigation/NavigationState'
import FeatureFlagsView from './featureFlags/FeatureFlagsView.vue'
import SegmentsView from './segments/SegmentsView.vue'
import PropertiesView from './properties/PropertiesView.vue'
import JsonEditorView from './jsonEditor/JsonEditorView.vue'

export const LoliViewMap: { [key in NavigationState['view']]: Component } = {
  featureFlags: FeatureFlagsView,
  segments: SegmentsView,
  properties: PropertiesView,
  jsonEditor: JsonEditorView
}
