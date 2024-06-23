<script setup lang="ts">
import Label from '@/components/ui/Label.vue'
import Input from '@/components/ui/Input.vue'

defineProps<{ label?: string; small?: boolean }>()
const model = defineModel<number>({ required: true })
</script>

<template>
  <Label :title="label">
    <Input v-model.number="model" type="number" :size="small ? 'small' : 'normal'" />
  </Label>
</template>
