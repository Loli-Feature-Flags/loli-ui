<script setup lang="ts">
import TagsInput from '@/components/ui/TagsInput.vue'
import { computed } from 'vue'

const operandsModel = defineModel<number[]>({ required: true })
const stringOperands = computed<string[]>({
  get() {
    return operandsModel.value.map((numberValue) => numberValue.toString(10))
  },
  set(newValues) {
    operandsModel.value = newValues
      .map((newValue) => parseFloat(newValue.toString()))
      .filter((mappedValue) => !isNaN(mappedValue))
  }
})
</script>

<template>
  <TagsInput
    v-model="stringOperands"
    size="small"
    fit
    :placeholder="$t('conditions.operands.number.addPlaceholder')"
  />
</template>
