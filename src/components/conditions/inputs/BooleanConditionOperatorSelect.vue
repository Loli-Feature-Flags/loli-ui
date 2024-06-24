<script setup lang="ts">
import {
  type BooleanConditionOperator,
  BooleanConditionOperators
} from '@loli-feature-flags/loli-sdk'
import Select from '@/components/ui/Select.vue'

const operatorModel = defineModel<BooleanConditionOperator>()
</script>

<template>
  <Select
    v-model="operatorModel"
    :options="
      BooleanConditionOperators.map((operator) => ({
        value: operator,
        label: $t(`spec.booleanCondition.operator.${operator}`)
      }))
    "
    size="small"
    fit
  />
</template>
