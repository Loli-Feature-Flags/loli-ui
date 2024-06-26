<script setup lang="ts">
import Label from '../../../../components/ui/Label.vue'
import Input from '../../../../components/ui/Input.vue'

defineProps<{ label?: string; small?: boolean; placeholder?: string }>()
const model = defineModel<string>({ required: true })
</script>

<template>
  <Label :title="label">
    <Input v-model="model" :placeholder="placeholder" :size="small ? 'small' : 'normal'" />
  </Label>
</template>
