<script setup lang="ts">
import { type Condition, SemanticIssueType } from '@loli-feature-flags/loli-sdk-js'
import ConditionSetConditionRow from '@/components/conditions/types/ConditionSetConditionRow.vue'
import PropertyConditionRow from '@/components/conditions/types/PropertyConditionRow.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import AlwaysTrueConditionRow from '@/components/conditions/types/AlwaysTrueConditionRow.vue'
import Button from '@/components/ui/Button.vue'
import ConfirmDeleteDialog from '@/components/shared/ConfirmDeleteDialog.vue'
import SegmentConditionRow from '@/components/conditions/types/SegmentConditionRow.vue'
import useConditionSetNestedColoring from '@/hooks/useConditionSetNestedColoring'
import DateTimeConditionRow from '@/components/conditions/types/DateTimeConditionRow.vue'
import type { IssuesCarryOn } from '@/utils/issues'
import NonExistingPropertyReferencedIndicator from '@/components/shared/validation/NonExistingPropertyReferencedIndicator.vue'
import NonExistingSegmentReferencedIndicator from '@/components/shared/validation/NonExistingSegmentReferencedIndicator.vue'
import PropertyConditionDataTypeMismatchIndicator from '@/components/shared/validation/PropertyConditionDataTypeMismatchIndicator.vue'
import DragHandle from '@/components/shared/DragHandle.vue'

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
      class="transition flex flex-row items-stretch gap-2 border border-gray-300 rounded-md bg-white min-w-[50rem] overflow-x-auto"
      :class="[ringClasses, hoverBorderColor, hoverRingColor]"
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
