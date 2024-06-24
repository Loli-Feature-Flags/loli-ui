<script setup lang="ts">
import type { StringCondition, StringConditionOperator } from '@loli-feature-flags/loli-sdk'
import StringConditionOperatorSelect from '@/components/conditions/inputs/StringConditionOperatorSelect.vue'
import QuantifierSelector from '@/components/conditions/inputs/QuantifierSelector.vue'
import StringOperands from '@/components/conditions/inputs/StringOperands.vue'
import { computed } from 'vue'

const conditionModel = defineModel<StringCondition>({ required: true })

const operatorsToHideQuantifiersFor: StringConditionOperator[] = ['isBlank', 'isNotBlank']

const hideOperandsAndQuantifiers = computed(() =>
  operatorsToHideQuantifiersFor.includes(conditionModel.value.operator)
)
</script>

<template>
  <div />

  <StringConditionOperatorSelect v-model="conditionModel.operator" />

  <div v-if="hideOperandsAndQuantifiers" />
  <QuantifierSelector v-else v-model="conditionModel.operandsQuantifier" />

  <div v-if="hideOperandsAndQuantifiers" />
  <StringOperands v-else v-model="conditionModel.operands" />
</template>
