<script setup lang="ts">
import {
  type StringArrayConditionOperator,
  StringArrayConditionOperators
} from '@loli-feature-flags/loli-sdk'
import Select from '../../ui/Select.vue'

const operatorModel = defineModel<StringArrayConditionOperator>()
</script>

<template>
  <Select
    v-model="operatorModel"
    :options="
      StringArrayConditionOperators.map((operator) => ({
        value: operator,
        label: $t(`spec.stringArrayCondition.operator.${operator}`)
      }))
    "
    size="small"
    fit
  />
</template>
