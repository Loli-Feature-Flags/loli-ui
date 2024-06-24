<script setup lang="ts">
import Dialog from '@/components/ui/Dialog.vue'
import type { FeatureFlag } from '@loli-feature-flags/loli-sdk'
import FeatureFlagEditorDialogTitle from '@/views/featureFlags/editor/FeatureFlagEditorDialogTitle.vue'
import DescriptionSection from '@/views/featureFlags/editor/sections/DescriptionSection.vue'
import DefaultValueSection from '@/views/featureFlags/editor/sections/DefaultValueSection.vue'
import TargetingSection from '@/views/featureFlags/editor/sections/TargetingSection.vue'
import type { IssuesCarryOn } from '@/utils/issues'

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
