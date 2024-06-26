<script setup lang="ts">
import type {
  StringArrayCondition,
  StringArrayConditionOperator
} from '@loli-feature-flags/loli-sdk'
import { computed } from 'vue'
import StringOperands from '../../inputs/StringOperands.vue'
import QuantifierSelector from '../../inputs/QuantifierSelector.vue'
import StringArrayConditionOperatorSelect from '../../inputs/StringArrayConditionOperatorSelect.vue'

const conditionModel = defineModel<StringArrayCondition>({ required: true })

const operatorsToHideQuantifiersFor: StringArrayConditionOperator[] = [
  'isBlank',
  'isNotBlank',
  'hasElements',
  'hasNoElements'
]

const hideOperandsAndQuantifiers = computed(() =>
  operatorsToHideQuantifiersFor.includes(conditionModel.value.operator)
)
</script>

<template>
  <div v-if="hideOperandsAndQuantifiers" />
  <QuantifierSelector v-else v-model="conditionModel.propertyArrayQuantifier" />

  <StringArrayConditionOperatorSelect v-model="conditionModel.operator" />

  <div v-if="hideOperandsAndQuantifiers" />
  <QuantifierSelector v-else v-model="conditionModel.operandsQuantifier" />

  <div v-if="hideOperandsAndQuantifiers" />
  <StringOperands v-else v-model="conditionModel.operands" />
</template>
