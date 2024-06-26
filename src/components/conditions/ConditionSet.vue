<script setup lang="ts">
import type { Condition, ConditionSet } from '@loli-feature-flags/loli-sdk'

import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import type { IssuesCarryOn } from '../../utils/issues'
import Select, { type SelectOption } from '../ui/Select.vue'
import useConditionSetNestedColoring from '../../hooks/useConditionSetNestedColoring'
import AddCondition from './add/AddCondition.vue'
import ConditionSetConditionList from './ConditionSetConditionList.vue'

const conditionSetModel = defineModel<ConditionSet>({ required: true })
const props = defineProps<{ issuesCarryOn: IssuesCarryOn; flat?: boolean }>()

function addNewCondition(condition: Condition) {
  conditionSetModel.value.conditions.push(condition)
}

const i18n = useI18n()

const operatorOptions = computed<SelectOption[]>(() => [
  { value: 'and', label: i18n.t('spec.conditionSet.operator.and') },
  { value: 'or', label: i18n.t('spec.conditionSet.operator.or') },
  { value: 'nor', label: i18n.t('spec.conditionSet.operator.nor') },
  { value: 'nand', label: i18n.t('spec.conditionSet.operator.nand') }
])

const { ringClasses, hoverBorderColor, hoverRingColor } = useConditionSetNestedColoring(props.flat)
</script>

<template>
  <div
    :class="[
      'w-full',
      ...(flat
        ? []
        : [
            'transition border border-gray-300 rounded-md p-3',
            ringClasses,
            hoverBorderColor,
            hoverRingColor
          ])
    ]"
  >
    <div class="flex flex-row gap-4 items-center mb-4">
      <Select v-model="conditionSetModel.operator" :options="operatorOptions" size="small" fit />

      <AddCondition @add="addNewCondition" />
    </div>

    <ConditionSetConditionList v-model="conditionSetModel" :issues-carry-on="issuesCarryOn" />
  </div>
</template>
