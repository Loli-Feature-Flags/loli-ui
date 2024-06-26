<script setup lang="ts">
import TagsInput from '../../ui/TagsInput.vue'

const operandsModel = defineModel<string[]>({ required: true })
</script>

<template>
  <TagsInput
    v-model="operandsModel"
    :placeholder="$t('conditions.operands.string.addPlaceholder')"
    size="small"
    fit
  />
</template>
