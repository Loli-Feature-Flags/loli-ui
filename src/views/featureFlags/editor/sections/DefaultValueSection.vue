<script setup lang="ts">
import FeatureFlagEditorSection from '@/views/featureFlags/editor/FeatureFlagEditorSection.vue'
import type { FeatureFlag } from '@loli-feature-flags/loli-sdk'
import BooleanValueSelect from '@/views/featureFlags/editor/values/BooleanValueSelect.vue'
import NumberValueInput from '@/views/featureFlags/editor/values/NumberValueInput.vue'
import StringValueInput from '@/views/featureFlags/editor/values/StringValueInput.vue'

const featureFlag = defineModel<FeatureFlag>({ required: true })
</script>

<template>
  <FeatureFlagEditorSection :title="$t('views.featureFlags.editor.defaultValue.title')">
    <BooleanValueSelect
      v-if="featureFlag.type === 'boolean'"
      v-model="featureFlag.defaultValue"
      :label="$t('views.featureFlags.editor.defaultValue.label')"
    />

    <StringValueInput
      v-if="featureFlag.type === 'string'"
      v-model="featureFlag.defaultValue"
      :label="$t('views.featureFlags.editor.defaultValue.label')"
      :placeholder="$t('views.featureFlags.editor.defaultValue.stringPlaceholder')"
    />

    <NumberValueInput
      v-if="featureFlag.type === 'number'"
      v-model="featureFlag.defaultValue"
      :label="$t('views.featureFlags.editor.defaultValue.label')"
    />
  </FeatureFlagEditorSection>
</template>
