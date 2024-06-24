<script setup lang="ts">
import {
  type NumberConditionOperator,
  NumberConditionOperators
} from '@loli-feature-flags/loli-sdk'
import Select from '@/components/ui/Select.vue'

const operatorModel = defineModel<NumberConditionOperator>()
</script>

<template>
  <Select
    v-model="operatorModel"
    :options="
      NumberConditionOperators.map((operator) => ({
        value: operator,
        label: $t(`spec.numberCondition.operator.${operator}`)
      }))
    "
    size="small"
    fit
  />
</template>
