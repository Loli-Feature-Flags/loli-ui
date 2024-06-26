import { z } from 'zod'
import { FeatureFlagsNavigationStateSchema } from './FeatureFlagsNavigationState'
import { SegmentsNavigationStateSchema } from './SegmentsNavigationState'
import { PropertiesNavigationStateSchema } from './PropertiesNavigationState'
import { JsonEditorNavigationStateSchema } from './JsonEditorNavigationState'

export const NavigationStateSchema = z.discriminatedUnion('view', [
  FeatureFlagsNavigationStateSchema,
  SegmentsNavigationStateSchema,
  PropertiesNavigationStateSchema,
  JsonEditorNavigationStateSchema
])

export type NavigationState = z.infer<typeof NavigationStateSchema>
