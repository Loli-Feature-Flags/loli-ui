<script setup lang="ts">
import Dialog from '@/components/ui/Dialog.vue'
import type { Segment } from '@loli-feature-flags/loli-sdk-js'
import EditSegmentDialogTitle from '@/views/segments/EditSegmentDialogTitle.vue'
import ConditionSet from '@/components/conditions/ConditionSet.vue'
import { provideRootSegment } from '@/utils/segments'
import type { IssuesCarryOn } from '@/utils/issues'

const segment = defineModel<Segment | null>()
const open = defineModel<boolean>('open', { default: false })
defineProps<{ issuesCarryOn: IssuesCarryOn }>()
defineEmits(['delete'])

provideRootSegment(segment)
</script>

<template>
  <Dialog v-model:open="open" size="near-fullscreen" :error="issuesCarryOn.isInvalid()">
    <template #title>
      <EditSegmentDialogTitle
        v-if="segment"
        v-model="segment"
        @delete="$emit('delete')"
        :issues-carry-on="issuesCarryOn"
      />
    </template>

    <template v-if="segment">
      <div class="text-2xl mb-4 pt-4">{{ $t('views.segments.editDialog.conditionSet.title') }}</div>

      <ConditionSet
        v-model="segment.conditionSet"
        :issues-carry-on="issuesCarryOn.createSub(['conditionSet'])"
      />
    </template>
  </Dialog>
</template>
