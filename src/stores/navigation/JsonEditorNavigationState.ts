import { z } from 'zod'

export const JsonEditorNavigationStateSchema = z.object({
  view: z.literal('jsonEditor')
})

export type JsonEditorNavigationState = z.infer<typeof JsonEditorNavigationStateSchema>
