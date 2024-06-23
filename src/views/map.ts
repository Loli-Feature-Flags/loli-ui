import type { Component } from 'vue'
import FeatureFlagsView from '@/views/featureFlags/FeatureFlagsView.vue'
import SegmentsView from '@/views/segments/SegmentsView.vue'
import PropertiesView from '@/views/properties/PropertiesView.vue'
import JsonEditorView from '@/views/jsonEditor/JsonEditorView.vue'
import type { NavigationState } from '@/stores/navigation/NavigationState'

export const LoliViewMap: { [key in NavigationState['view']]: Component } = {
  featureFlags: FeatureFlagsView,
  segments: SegmentsView,
  properties: PropertiesView,
  jsonEditor: JsonEditorView
}
