<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  deserializeLoliSpecFromJson,
  LoliError,
  type LoliSpec,
  LoliSpecInvalidSchemaError,
  LoliSpecMalformedJsonError,
  LoliSpecSemanticIssuesError,
  serializeLoliSpecAsJson
} from '@loli-feature-flags/loli-sdk'
import { useWorkbench } from '../../stores/workbench/store'
import LoliView from '../../components/LoliView.vue'
import Button from '../../components/ui/Button.vue'

const { t } = useI18n()
const workbench = useWorkbench()

const workbenchSpecJson = computed<string>(() => {
  if (workbench.canBeEditedVisually) {
    return serializeLoliSpecAsJson(workbench.spec, true)
  }

  if (workbench.rawSpec) {
    try {
      return JSON.stringify(JSON.parse(workbench.rawSpec), null, 4)
    } catch (error) {
      return workbench.rawSpec
    }
  }

  return ''
})

const editorJson = ref<string>(workbenchSpecJson.value)
const editorSpec = ref<LoliSpec | null>(workbench.spec)
const currentErrorTitle = ref<string | null>(null)
const currentErrorDetails = ref<string[]>([])

const hasCodeChanged = computed(() => {
  try {
    return workbenchSpecJson.value !== editorJson.value
  } catch (e) {
    return true
  }
})

const canReset = computed(() => hasCodeChanged.value)
const canSave = computed(() => hasCodeChanged.value && !currentErrorTitle.value)

watch(
  editorJson,
  (newEditorJson) => {
    try {
      editorSpec.value = deserializeLoliSpecFromJson(newEditorJson)
      currentErrorTitle.value = null
      currentErrorDetails.value = []
    } catch (e) {
      editorSpec.value = null

      if (e instanceof LoliError) {
        if (e instanceof LoliSpecMalformedJsonError) {
          currentErrorTitle.value = t('views.jsonEditor.errors.malformedJson')
          currentErrorDetails.value = []
        } else if (e instanceof LoliSpecInvalidSchemaError) {
          currentErrorTitle.value = t('views.jsonEditor.errors.invalidSchema')
          currentErrorDetails.value = e.errors.map(
            (zodError) => `[${zodError.path.join('.')}]: ${zodError.message}`
          )
        } else if (e instanceof LoliSpecSemanticIssuesError) {
          currentErrorTitle.value = t('views.jsonEditor.errors.semanticIssues')
          currentErrorDetails.value = e.getIssues().map((semanticIssue) => semanticIssue.toString())
        } else {
          currentErrorTitle.value = `Unknown Loli error: ${e}`
          currentErrorDetails.value = []
        }
      } else {
        currentErrorTitle.value = `Unknown error: ${e}`
        currentErrorDetails.value = []
      }
    }
  },
  { immediate: true }
)

function cancel() {
  editorJson.value = workbenchSpecJson.value
}

function save() {
  workbench.updateSpec({ ...editorSpec.value })
  editorJson.value = workbenchSpecJson.value
}
</script>

<template>
  <LoliView :title="$t('views.jsonEditor.title')" class="json-editor">
    <div v-if="currentErrorTitle" class="text-red-500 mb-4">{{ currentErrorTitle }}</div>

    <textarea
      :class="[
        'p-4 rounded-md border w-full min-h-[35em] font-mono text-xs focus-ring transition resize-y',
        'border-gray-300 bg-white',
        'dark:border-gray-400 dark:bg-gray-900'
      ]"
      v-model="editorJson"
      spellcheck="false"
    />

    <div class="flex flex-row justify-end gap-4 mt-6">
      <Button :disabled="!canReset" @click="cancel">
        {{ $t('views.jsonEditor.reset') }}
      </Button>

      <Button :disabled="!canSave" @click="save">{{ $t('views.jsonEditor.save') }}</Button>
    </div>

    <div class="text-red-500 mt-4" v-if="currentErrorDetails.length > 0">
      <div class="text-2xl">
        {{ $t('views.jsonEditor.errorDetails.title') }}
      </div>

      <ul class="list-disc space-y-4 mt-4 pl-4">
        <li v-for="(errorDetail, index) of currentErrorDetails" :key="index">
          {{ errorDetail }}
        </li>
      </ul>
    </div>
  </LoliView>
</template>
