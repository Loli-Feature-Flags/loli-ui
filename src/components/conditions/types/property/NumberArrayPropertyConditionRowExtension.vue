<script setup lang="ts">
import type {
  NumberArrayCondition,
  NumberArrayConditionOperator
} from '@loli-feature-flags/loli-sdk-js'
import NumberArrayConditionOperatorSelect from '@/components/conditions/inputs/NumberArrayConditionOperatorSelect.vue'
import QuantifierSelector from '@/components/conditions/inputs/QuantifierSelector.vue'
import NumberOperands from '@/components/conditions/inputs/NumberOperands.vue'
import { computed } from 'vue'

const conditionModel = defineModel<NumberArrayCondition>({ required: true })

const operatorsToHideArrayQuantifiersFor: NumberArrayConditionOperator[] = [
  'hasElements',
  'hasNoElements'
]

const operatorsToHideOperandQuantifiersFor: NumberArrayConditionOperator[] = [
  'isEven',
  'isOdd',
  'hasElements',
  'hasNoElements'
]

const hidePropertyArrayQuantifier = computed(() =>
  operatorsToHideArrayQuantifiersFor.includes(conditionModel.value.operator)
)

const hideOperandsAndOperandsQuantifier = computed(() =>
  operatorsToHideOperandQuantifiersFor.includes(conditionModel.value.operator)
)
</script>

<template>
  <div v-if="hidePropertyArrayQuantifier" />
  <QuantifierSelector v-else v-model="conditionModel.propertyArrayQuantifier" />

  <NumberArrayConditionOperatorSelect v-model="conditionModel.operator" />

  <div v-if="hideOperandsAndOperandsQuantifier" />
  <QuantifierSelector v-else v-model="conditionModel.operandsQuantifier" />

  <div v-if="hideOperandsAndOperandsQuantifier" />
  <NumberOperands v-else v-model="conditionModel.operands" />
</template>
