<script setup lang="ts">
import {
  type StringConditionOperator,
  StringConditionOperators
} from '@loli-feature-flags/loli-sdk'
import Select from '../../ui/Select.vue'

const operatorModel = defineModel<StringConditionOperator>()
</script>

<template>
  <Select
    v-model="operatorModel"
    :options="
      StringConditionOperators.map((operator) => ({
        value: operator,
        label: $t(`spec.stringCondition.operator.${operator}`)
      }))
    "
    size="small"
    fit
  />
</template>
