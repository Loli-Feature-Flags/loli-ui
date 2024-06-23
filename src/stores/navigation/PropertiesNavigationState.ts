import { z } from 'zod'

export const PropertiesNavigationStateSchema = z.object({
  view: z.literal('properties'),
  subview: z
    .discriminatedUnion('type', [
      z.object({
        type: z.literal('edit'),
        propertyId: z.string()
      }),
      z.object({
        type: z.literal('add')
      })
    ])
    .optional()
})

export type PropertiesNavigationState = z.infer<typeof PropertiesNavigationStateSchema>
