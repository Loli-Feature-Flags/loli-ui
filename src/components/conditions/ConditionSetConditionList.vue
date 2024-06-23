<script setup lang="ts">
import { type ConditionSet } from '@loli-feature-flags/loli-sdk-js'
import VueDraggable from 'vuedraggable'
import ConditionSetConditionListEntry from '@/components/conditions/ConditionSetConditionListEntry.vue'
import type { IssuesCarryOn } from '@/utils/issues'
import { DRAG_HANDLE_CLASS } from '@/constants'

const conditionSetModel = defineModel<ConditionSet>({ required: true })
defineProps<{ issuesCarryOn: IssuesCarryOn }>()

function deleteCondition(index: number) {
  conditionSetModel.value.conditions.splice(index, 1)
}
</script>

<template>
  <VueDraggable
    v-model="conditionSetModel.conditions"
    :handle="`.${DRAG_HANDLE_CLASS}`"
    ghostClass="dnd-ghost"
    :animation="250"
    :class="[
      'flex flex-col gap-2',
      { 'w-full min-h-[1em]': conditionSetModel.conditions.length === 0 }
    ]"
    :item-key="() => undefined"
    :group="{ name: 'conditionSetConditionList' }"
    :component-data="{ name: 'fade', type: 'transition-group' }"
  >
    <template #item="{ index }">
      <div>
        <!-- The outer div is needed in order for the animation to work as expected. -->
        <ConditionSetConditionListEntry
          v-model="conditionSetModel.conditions[index]"
          @delete="deleteCondition(index)"
          :issues-carry-on="issuesCarryOn.createSub([index])"
        />
      </div>
    </template>
  </VueDraggable>

  <div v-if="conditionSetModel.conditions.length === 0" class="text-sm text-gray-500 pl-1">
    {{ $t('spec.conditionSet.noConditions') }}
  </div>
</template>
