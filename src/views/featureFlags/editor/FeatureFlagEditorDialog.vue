<script setup lang="ts">
import type { FeatureFlag } from '@loli-feature-flags/loli-sdk'
import type { IssuesCarryOn } from '../../../utils/issues'
import DefaultValueSection from './sections/DefaultValueSection.vue'
import TargetingSection from './sections/TargetingSection.vue'
import DescriptionSection from './sections/DescriptionSection.vue'
import FeatureFlagEditorDialogTitle from './FeatureFlagEditorDialogTitle.vue'
import Dialog from '../../../components/ui/Dialog.vue'

const open = defineModel<boolean>('open', { default: false })
const featureFlag = defineModel<FeatureFlag | null>()

defineProps<{ issuesCarryOn: IssuesCarryOn }>()
defineEmits(['delete'])
</script>

<template>
  <Dialog v-model:open="open" size="near-fullscreen" :error="issuesCarryOn.isInvalid()">
    <template #title>
      <FeatureFlagEditorDialogTitle
        v-if="featureFlag"
        v-model="featureFlag"
        @delete="$emit('delete')"
        :issues-carry-on="issuesCarryOn"
      />
    </template>

    <div v-if="featureFlag" class="flex flex-col gap-8">
      <DescriptionSection v-model="featureFlag" />
      <TargetingSection
        v-model="featureFlag"
        :issues-carry-on="issuesCarryOn.createSub(['targeting'])"
      />
      <DefaultValueSection v-model="featureFlag" />
    </div>
  </Dialog>
</template>
