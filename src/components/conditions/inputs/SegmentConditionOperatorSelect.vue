<script setup lang="ts">
import {
  type SegmentConditionsOperator,
  SegmentConditionsOperators
} from '@loli-feature-flags/loli-sdk'
import Select from '../../ui/Select.vue'

const operatorModel = defineModel<SegmentConditionsOperator>()
</script>

<template>
  <Select
    v-model="operatorModel"
    :options="
      SegmentConditionsOperators.map((operator) => ({
        value: operator,
        label: $t(`spec.segmentCondition.operator.${operator}`)
      }))
    "
    size="small"
    fit
  />
</template>
