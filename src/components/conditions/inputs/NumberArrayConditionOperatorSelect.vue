<script setup lang="ts">
import {
  type NumberArrayConditionOperator,
  NumberArrayConditionOperators
} from '@loli-feature-flags/loli-sdk'
import Select from '../../ui/Select.vue'

const operatorModel = defineModel<NumberArrayConditionOperator>()
</script>

<template>
  <Select
    v-model="operatorModel"
    :options="
      NumberArrayConditionOperators.map((operator) => ({
        value: operator,
        label: $t(`spec.numberArrayCondition.operator.${operator}`)
      }))
    "
    size="small"
    fit
  />
</template>
