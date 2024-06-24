<script setup lang="ts">
import { useWorkbench } from '@/stores/workbench/store'
import type { Segment } from '@loli-feature-flags/loli-sdk'
import { countSegmentReferences, isSegmentReferenced } from '@loli-feature-flags/loli-sdk'
import RectangleGroupIcon from '@/components/icons/RectangleGroupIcon.vue'
import StaleSegmentIndiciator from '@/components/shared/indicators/StaleSegmentIndiciator.vue'
import EmptySegmentIndicator from '@/components/shared/indicators/EmptySegmentIndicator.vue'
import ReferencesIndicator from '@/components/shared/indicators/ReferencesIndicator.vue'
import type { IssuesCarryOn } from '@/utils/issues'
import ListEntryCard from '@/components/shared/ListEntryCard.vue'
import { isSegmentEmpty } from '@/utils/segments'

const workbench = useWorkbench()
const segment = defineModel<Segment>({ required: true })

defineProps<{
  issuesCarryOn: IssuesCarryOn
}>()

defineEmits(['edit'])
</script>

<template>
  <ListEntryCard @click="$emit('edit')" :issues-carry-on="issuesCarryOn">
    <div class="flex flex-row items-center justify-between flex-wrap gap-4">
      <span class="text-lg font-mono text-primary-700 flex flex-row items-center gap-4">
        <RectangleGroupIcon />{{ segment.name }}
      </span>

      <div class="flex flex-row gap-4 items-center">
        <StaleSegmentIndiciator v-if="!isSegmentReferenced(segment.id, workbench.spec)" />

        <EmptySegmentIndicator v-if="isSegmentEmpty(segment)" />

        <ReferencesIndicator :references="countSegmentReferences(segment.id, workbench.spec)" />
      </div>
    </div>
  </ListEntryCard>
</template>
