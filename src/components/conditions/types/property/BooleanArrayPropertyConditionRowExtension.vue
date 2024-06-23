<script setup lang="ts">
import type {
  BooleanArrayCondition,
  BooleanArrayConditionOperator
} from '@loli-feature-flags/loli-sdk-js'
import BooleanArrayConditionOperatorSelect from '@/components/conditions/inputs/BooleanArrayConditionOperatorSelect.vue'
import QuantifierSelector from '@/components/conditions/inputs/QuantifierSelector.vue'
import { computed } from 'vue'

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
