<script setup lang="ts">
import { type Quantifier, Quantifiers } from '@loli-feature-flags/loli-sdk'
import Select from '@/components/ui/Select.vue'

const quantifierModel = defineModel<Quantifier>({ required: true })
</script>

<template>
  <Select
    v-model="quantifierModel"
    :options="
      Quantifiers.map((quantifier) => ({
        value: quantifier,
        label: $t(`spec.quantifier.${quantifier}`)
      }))
    "
    size="small"
    fit
  />
</template>
