<script setup lang="ts">
import type {
  BooleanArrayCondition,
  BooleanArrayConditionOperator
} from '@loli-feature-flags/loli-sdk'
import { computed } from 'vue'
import BooleanArrayConditionOperatorSelect from '../../inputs/BooleanArrayConditionOperatorSelect.vue'
import QuantifierSelector from '../../inputs/QuantifierSelector.vue'

const conditionModel = defineModel<BooleanArrayCondition>({ required: true })

const operatorsToHideArrayQuantifiersFor: BooleanArrayConditionOperator[] = [
  'hasElements',
  'hasNoElements'
]

const hidePropertyArrayQuantifier = computed(() =>
  operatorsToHideArrayQuantifiersFor.includes(conditionModel.value.operator)
)
</script>

<template>
  <div v-if="hidePropertyArrayQuantifier" />
  <QuantifierSelector v-else v-model="conditionModel.propertyArrayQuantifier" />

  <BooleanArrayConditionOperatorSelect v-model="conditionModel.operator" />

  <div />

  <div />
</template>
