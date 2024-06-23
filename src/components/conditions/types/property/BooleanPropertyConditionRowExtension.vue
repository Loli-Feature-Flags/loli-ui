<script setup lang="ts">
import type { BooleanCondition } from '@loli-feature-flags/loli-sdk-js'
import BooleanConditionOperatorSelect from '@/components/conditions/inputs/BooleanConditionOperatorSelect.vue'

const conditionModel = defineModel<BooleanCondition>({ required: true })
</script>

<template>
  <div />

  <BooleanConditionOperatorSelect v-model="conditionModel.operator" />

  <div />

  <div />
</template>
