<script setup lang="ts">
import type { NumberCondition, NumberConditionOperator } from '@loli-feature-flags/loli-sdk-js'
import NumberConditionOperatorSelect from '@/components/conditions/inputs/NumberConditionOperatorSelect.vue'
import QuantifierSelector from '@/components/conditions/inputs/QuantifierSelector.vue'
import NumberOperands from '@/components/conditions/inputs/NumberOperands.vue'
import { computed } from 'vue'

const conditionModel = defineModel<NumberCondition>({ required: true })

const operatorsToHideQuantifiersFor: NumberConditionOperator[] = ['isOdd', 'isEven']

const hideOperandsAndQuantifiers = computed(() =>
  operatorsToHideQuantifiersFor.includes(conditionModel.value.operator)
)
</script>

<template>
  <div />

  <NumberConditionOperatorSelect v-model="conditionModel.operator" />

  <div v-if="hideOperandsAndQuantifiers" />
  <QuantifierSelector v-else v-model="conditionModel.operandsQuantifier" />

  <div v-if="hideOperandsAndQuantifiers" />
  <NumberOperands v-else v-model="conditionModel.operands" />
</template>
