import { z } from 'zod'

export const FeatureFlagsNavigationStateSchema = z.object({
  view: z.literal('featureFlags'),
  subview: z
    .discriminatedUnion('type', [
      z.object({
        type: z.literal('edit'),
        featureFlagId: z.string()
      }),
      z.object({
        type: z.literal('add')
      })
    ])
    .optional()
})

export type FeatureFlagsNavigationState = z.infer<typeof FeatureFlagsNavigationStateSchema>
