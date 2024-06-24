<script setup lang="ts">
import type {
  StringArrayCondition,
  StringArrayConditionOperator
} from '@loli-feature-flags/loli-sdk'
import StringArrayConditionOperatorSelect from '@/components/conditions/inputs/StringArrayConditionOperatorSelect.vue'
import QuantifierSelector from '@/components/conditions/inputs/QuantifierSelector.vue'
import StringOperands from '@/components/conditions/inputs/StringOperands.vue'
import { computed } from 'vue'

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
