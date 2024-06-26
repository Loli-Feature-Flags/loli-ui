<script setup lang="ts">
import type { FeatureFlag } from '@loli-feature-flags/loli-sdk'
import NumberValueInput from '../values/NumberValueInput.vue'
import StringValueInput from '../values/StringValueInput.vue'
import BooleanValueSelect from '../values/BooleanValueSelect.vue'
import FeatureFlagEditorSection from '../FeatureFlagEditorSection.vue'

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
