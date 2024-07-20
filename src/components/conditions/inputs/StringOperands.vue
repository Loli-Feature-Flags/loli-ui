<script setup lang="ts">
import TagsInput from '../../ui/TagsInput.vue'

const operandsModel = defineModel<string[]>({ required: true })

defineProps<{
  validator?: (value: string) => true | string
}>()
</script>

<template>
  <TagsInput
    v-model="operandsModel"
    :placeholder="$t('conditions.operands.string.addPlaceholder')"
    size="small"
    fit
    :validator="validator"
  />
</template>
