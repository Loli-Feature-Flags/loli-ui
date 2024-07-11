<script setup lang="ts">
import type { Segment } from '@loli-feature-flags/loli-sdk'
import { countSegmentReferences, isSegmentReferenced } from '@loli-feature-flags/loli-sdk'
import type { IssuesCarryOn } from '../../utils/issues'
import { useWorkbench } from '../../stores/workbench/store'
import ReferencesIndicator from '../../components/shared/indicators/ReferencesIndicator.vue'
import EmptySegmentIndicator from '../../components/shared/indicators/EmptySegmentIndicator.vue'
import StaleSegmentIndiciator from '../../components/shared/indicators/StaleSegmentIndiciator.vue'
import RectangleGroupIcon from '../../components/icons/RectangleGroupIcon.vue'
import ListEntryCard from '../../components/shared/ListEntryCard.vue'
import { isSegmentEmpty } from '../../utils/segments'

const workbench = useWorkbench()
const segment = defineModel<Segment>({ required: true })

defineProps<{
  issuesCarryOn: IssuesCarryOn
}>()

defineEmits(['edit'])
</script>

<template>
  <ListEntryCard @click="$emit('edit')" :issues-carry-on="issuesCarryOn">
    <template #title-start> <RectangleGroupIcon />{{ segment.name }} </template>

    <template #title-end>
      <StaleSegmentIndiciator v-if="!isSegmentReferenced(segment.id, workbench.spec)" />

      <EmptySegmentIndicator v-if="isSegmentEmpty(segment)" />

      <ReferencesIndicator :references="countSegmentReferences(segment.id, workbench.spec)" />
    </template>
  </ListEntryCard>
</template>
