<script setup lang="ts">
import type {
  NumberArrayCondition,
  NumberArrayConditionOperator
} from '@loli-feature-flags/loli-sdk'
import { computed } from 'vue'
import NumberOperands from '../../inputs/NumberOperands.vue'
import QuantifierSelector from '../../inputs/QuantifierSelector.vue'
import NumberArrayConditionOperatorSelect from '../../inputs/NumberArrayConditionOperatorSelect.vue'

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
