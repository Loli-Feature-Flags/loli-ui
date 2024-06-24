<script setup lang="ts">
import {
  type DateTimeConditionOperator,
  DateTimeConditionOperators
} from '@loli-feature-flags/loli-sdk'
import Select from '@/components/ui/Select.vue'

const operatorModel = defineModel<DateTimeConditionOperator>()
</script>

<template>
  <Select
    v-model="operatorModel"
    :options="
      DateTimeConditionOperators.map((operator) => ({
        value: operator,
        label: $t(`spec.dateTimeCondition.operator.${operator}`)
      }))
    "
    size="small"
    fit
  />
</template>
