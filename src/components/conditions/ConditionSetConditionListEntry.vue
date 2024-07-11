<script setup lang="ts">
import { type Condition, SemanticIssueType } from '@loli-feature-flags/loli-sdk'
import type { IssuesCarryOn } from '../../utils/issues'
import useConditionSetNestedColoring from '../../hooks/useConditionSetNestedColoring'
import PropertyConditionRow from './types/PropertyConditionRow.vue'
import ConditionSetConditionRow from './types/ConditionSetConditionRow.vue'
import AlwaysTrueConditionRow from './types/AlwaysTrueConditionRow.vue'
import SegmentConditionRow from './types/SegmentConditionRow.vue'
import DateTimeConditionRow from './types/DateTimeConditionRow.vue'
import NonExistingPropertyReferencedIndicator from '../shared/validation/NonExistingPropertyReferencedIndicator.vue'
import NonExistingSegmentReferencedIndicator from '../shared/validation/NonExistingSegmentReferencedIndicator.vue'
import PropertyConditionDataTypeMismatchIndicator from '../shared/validation/PropertyConditionDataTypeMismatchIndicator.vue'
import DragHandle from '../shared/DragHandle.vue'
import ConfirmDeleteDialog from '../shared/ConfirmDeleteDialog.vue'
import TrashIcon from '../icons/TrashIcon.vue'
import Button from '../ui/Button.vue'

const condition = defineModel<Condition>({ required: true })
defineProps<{ issuesCarryOn: IssuesCarryOn }>()
defineEmits<{
  delete: [void]
}>()

const { ringClasses, hoverBorderColor, hoverRingColor } = useConditionSetNestedColoring()
</script>

<template>
  <div>
    <div
      :class="[
        'transition flex flex-row items-stretch gap-2 border rounded-md min-w-[50rem] overflow-x-auto',
        'bg-white border-gray-300',
        'dark:bg-gray-900 dark:border-gray-300',
        ringClasses,
        hoverBorderColor,
        hoverRingColor
      ]"
    >
      <div class="flex-grow flex flex-row items-center p-4">
        <PropertyConditionRow
          v-if="
            condition.type === 'string' ||
            condition.type === 'number' ||
            condition.type === 'boolean' ||
            condition.type === 'stringArray' ||
            condition.type === 'numberArray' ||
            condition.type === 'booleanArray'
          "
          v-model="condition"
        />

        <ConditionSetConditionRow
          v-else-if="condition.type === 'conditionSet'"
          v-model="condition"
          :issues-carry-on="issuesCarryOn"
        />

        <AlwaysTrueConditionRow v-else-if="condition.type === 'alwaysTrue'" />

        <SegmentConditionRow v-else-if="condition.type === 'segment'" v-model="condition" />

        <DateTimeConditionRow v-else-if="condition.type === 'dateTime'" v-model="condition" />

        <div v-else>Error: Missing implementation. Condition: {{ condition }}</div>
      </div>

      <div
        class="flex flex-col gap-2 items-center px-1 py-2 justify-center"
        v-if="
          issuesCarryOn.hasSomeIssueType(
            SemanticIssueType.NON_EXISTING_PROPERTY_REFERENCED,
            SemanticIssueType.NON_EXISTING_SEGMENT_REFERENCED,
            SemanticIssueType.CONDITION_PROPERTY_DATA_TYPE_MISMATCH
          )
        "
      >
        <NonExistingPropertyReferencedIndicator
          v-if="issuesCarryOn.hasIssueType(SemanticIssueType.NON_EXISTING_PROPERTY_REFERENCED)"
        />

        <NonExistingSegmentReferencedIndicator
          v-if="issuesCarryOn.hasIssueType(SemanticIssueType.NON_EXISTING_SEGMENT_REFERENCED)"
        />

        <PropertyConditionDataTypeMismatchIndicator
          v-if="issuesCarryOn.hasIssueType(SemanticIssueType.CONDITION_PROPERTY_DATA_TYPE_MISMATCH)"
        />
      </div>

      <div class="flex flex-col gap-4 items-center border-l border-gray-300 p-2">
        <DragHandle />

        <ConfirmDeleteDialog
          :title="$t('conditions.confirmDelete.title')"
          :description="$t('conditions.confirmDelete.description')"
          @delete="$emit('delete')"
        >
          <template #trigger>
            <Button size="small" :title="$t('conditions.deleteCondition')">
              <TrashIcon />
            </Button>
          </template>
        </ConfirmDeleteDialog>
      </div>
    </div>
  </div>
</template>
