import { z } from 'zod'
import { FeatureFlagsNavigationStateSchema } from '@/stores/navigation/FeatureFlagsNavigationState'
import { SegmentsNavigationStateSchema } from '@/stores/navigation/SegmentsNavigationState'
import { PropertiesNavigationStateSchema } from '@/stores/navigation/PropertiesNavigationState'
import { JsonEditorNavigationStateSchema } from '@/stores/navigation/JsonEditorNavigationState'

export const NavigationStateSchema = z.discriminatedUnion('view', [
  FeatureFlagsNavigationStateSchema,
  SegmentsNavigationStateSchema,
  PropertiesNavigationStateSchema,
  JsonEditorNavigationStateSchema
])

export type NavigationState = z.infer<typeof NavigationStateSchema>
