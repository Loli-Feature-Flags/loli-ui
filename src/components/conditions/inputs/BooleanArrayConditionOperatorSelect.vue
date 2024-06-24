<script setup lang="ts">
import {
  type BooleanArrayConditionOperator,
  BooleanArrayConditionOperators
} from '@loli-feature-flags/loli-sdk'
import Select from '@/components/ui/Select.vue'

const operatorModel = defineModel<BooleanArrayConditionOperator>()
</script>

<template>
  <Select
    v-model="operatorModel"
    :options="
      BooleanArrayConditionOperators.map((operator) => ({
        value: operator,
        label: $t(`spec.booleanArrayCondition.operator.${operator}`)
      }))
    "
    size="small"
    fit
  />
</template>
