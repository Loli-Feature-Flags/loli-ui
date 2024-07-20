<script setup lang="ts">
import TagsInput from '../../ui/TagsInput.vue'

const operandsModel = defineModel<number[]>({ required: true })
</script>

<template>
  <TagsInput
    v-model="operandsModel"
    size="small"
    fit
    :placeholder="$t('conditions.operands.number.addPlaceholder')"
    type="number"
  />
</template>
