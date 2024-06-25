import { defineStore } from 'pinia'
import type { LoliSpec } from '@loli-feature-flags/loli-sdk'
import {
  getAllIdsUsedInSpec,
  LoliSpecSchema,
  SemanticValidation,
  validateLoliSpecSemantically
} from '@loli-feature-flags/loli-sdk'
import { computed, ref, toRaw, watch, watchEffect } from 'vue'
import { init } from '@paralleldrive/cuid2'
import { useConfig } from '@/stores/config/store'

const createRandomId = init({
  length: 8
})

export const useWorkbench = defineStore('workbench', () => {
  const config = useConfig()

  const rawSpec = ref<string | null | undefined>(undefined)

  const isRawSpecPresent = computed(() => typeof rawSpec.value === 'string')

  function setRawSpec(spec: string | object | null | undefined) {
    if (spec) {
      if (typeof spec === 'string') {
        rawSpec.value = spec
      } else {
        rawSpec.value = JSON.stringify(spec)
      }
    }
  }

  const isRawSpecValidJson = computed(() => {
    if (!rawSpec.value) return false

    try {
      JSON.parse(rawSpec.value)
      return true
    } catch (e) {
      return false
    }
  })

  function initializeNewSpecIfNoRawSpec() {
    if (!rawSpec.value) {
      const spec: LoliSpec = {
        schemaVersion: 1,
        featureFlags: [],
        segments: [],
        evaluationContext: {
          properties: []
        }
      }

      setRawSpec(spec)
      config.informSpecChangeListeners(toRaw(spec))
    }
  }

  const spec = ref<LoliSpec>(
    rawSpec.value && isRawSpecValidJson.value
      ? JSON.parse(rawSpec.value)
      : ({
          schemaVersion: 1,
          featureFlags: [],
          segments: [],
          evaluationContext: { properties: [] }
        } as LoliSpec)
  )

  const schemaValidation = computed(() => {
    return LoliSpecSchema.safeParse(spec.value)
  })

  const semanticValidation = computed<SemanticValidation>(() => {
    if (schemaValidation.value.success) {
      return validateLoliSpecSemantically(spec.value)
    }

    return new SemanticValidation()
  })

  // Updates the stringified version.
  // If the new spec has a valid schema and no semantic issues
  // the spec change listeners are called.
  watch(
    spec,
    (newValue) => {
      const newSpecStringified = JSON.stringify(newValue)

      if (newSpecStringified !== rawSpec.value) {
        rawSpec.value = newSpecStringified

        if (schemaValidation.value.success && semanticValidation.value.isValid()) {
          config.informSpecChangeListeners(toRaw(newValue))
        }
      }
    },
    { deep: true }
  )

  // This effect must be after the "watch" on "spec".
  watchEffect(() => {
    const currentSpecStringified = JSON.stringify(spec.value)
    if (rawSpec.value && isRawSpecValidJson.value && currentSpecStringified !== rawSpec.value) {
      spec.value = JSON.parse(rawSpec.value)
    }
  })

  // Report issues to listeners
  watchEffect(() => {
    if (!isRawSpecValidJson.value) {
      config.informSpecIssueListeners('malformed-json')
    } else if (!schemaValidation.value.success) {
      config.informSpecIssueListeners('invalid-schema')
    } else if (!semanticValidation.value.isValid()) {
      config.informSpecIssueListeners('semantic-issue')
    }
  })

  const canBeEditedVisually = computed(() => {
    return isRawSpecValidJson.value && schemaValidation.value.success
  })

  function updateSpec(specUpdate: Partial<LoliSpec>) {
    spec.value = { ...spec.value, ...specUpdate }
  }

  function createNewSpecId(): string {
    const takenIds = getAllIdsUsedInSpec(spec.value)

    for (let i = 0; i < 500; i++) {
      const newId = createRandomId()
      if (!takenIds.includes(newId)) {
        return newId
      }
    }

    const errorMessage = 'Could not create new unique ID for spec elements after 500 attempts.'
    alert(errorMessage)
    throw new Error(errorMessage)
  }

  const jsonEditorIssueCount = computed<number>(() => {
    if (!isRawSpecValidJson.value) {
      return 1
    }

    if (!schemaValidation.value.success) {
      return schemaValidation.value.error.errors.length
    }

    return semanticValidation.value.getIssues().length
  })

  return {
    spec,
    updateSpec,
    schemaValidation,
    semanticValidation,
    createNewSpecId,
    isRawSpecValidJson,
    rawSpec,
    canBeEditedVisually,
    jsonEditorIssueCount,
    setRawSpec,
    isRawSpecPresent,
    initializeNewSpecIfNoRawSpec
  }
})
