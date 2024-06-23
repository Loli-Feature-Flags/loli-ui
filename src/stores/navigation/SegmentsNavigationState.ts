import { z } from 'zod'

export const SegmentsNavigationStateSchema = z.object({
  view: z.literal('segments'),
  subview: z
    .discriminatedUnion('type', [
      z.object({
        type: z.literal('edit'),
        segmentId: z.string()
      }),
      z.object({
        type: z.literal('add')
      })
    ])
    .optional()
})

export type SegmentsNavigationState = z.infer<typeof SegmentsNavigationStateSchema>
