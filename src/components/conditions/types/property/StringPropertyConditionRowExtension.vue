<script setup lang="ts">
import type { StringCondition, StringConditionOperator } from '@loli-feature-flags/loli-sdk'
import { computed } from 'vue'
import StringOperands from '../../inputs/StringOperands.vue'
import QuantifierSelector from '../../inputs/QuantifierSelector.vue'
import StringConditionOperatorSelect from '../../inputs/StringConditionOperatorSelect.vue'
import useStringOperandValidator from '../../../../hooks/useRegexOperandValidator'

const conditionModel = defineModel<StringCondition>({ required: true })

const operatorsToHideQuantifiersFor: StringConditionOperator[] = ['isBlank', 'isNotBlank']

const hideOperandsAndQuantifiers = computed(() =>
  operatorsToHideQuantifiersFor.includes(conditionModel.value.operator)
)

const validator = useStringOperandValidator(conditionModel)
</script>

<template>
  <div />

  <StringConditionOperatorSelect v-model="conditionModel.operator" />

  <div v-if="hideOperandsAndQuantifiers" />
  <QuantifierSelector v-else v-model="conditionModel.operandsQuantifier" />

  <div v-if="hideOperandsAndQuantifiers" />
  <StringOperands v-else v-model="conditionModel.operands" :validator="validator" />
</template>
