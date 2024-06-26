<script setup lang="ts">
import type { NumberCondition, NumberConditionOperator } from '@loli-feature-flags/loli-sdk'
import { computed } from 'vue'
import NumberOperands from '../../inputs/NumberOperands.vue'
import QuantifierSelector from '../../inputs/QuantifierSelector.vue'
import NumberConditionOperatorSelect from '../../inputs/NumberConditionOperatorSelect.vue'

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
