<script setup lang="ts">
import type { FeatureFlag } from '@loli-feature-flags/loli-sdk'
import FeatureFlagEditorSection from '../FeatureFlagEditorSection.vue'
import Label from '../../../../components/ui/Label.vue'
import TextArea from '../../../../components/ui/TextArea.vue'

const featureFlag = defineModel<FeatureFlag>({ required: true })
</script>

<template>
  <FeatureFlagEditorSection>
    <Label :title="$t('views.featureFlags.editor.description.label')">
      <TextArea
        auto-grow
        :min-rows="2"
        v-model="featureFlag.description"
        :placeholder="$t('views.featureFlags.editor.description.placeholder')"
      />
    </Label>
  </FeatureFlagEditorSection>
</template>
