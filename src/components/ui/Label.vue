<script setup lang="ts">
export type LabelPosition = 'top' | 'right'
defineProps<{ title?: string; position?: 'top' | 'right' }>()

const labelPositionClasses: { [key in LabelPosition]: string } = {
  top: 'flex flex-col gap-2 ',
  right: 'flex flex-row-reverse items-center justify-end gap-4 pt-2'
}

const titlePositionClasses: { [key in LabelPosition]: string } = {
  top: 'text-gray-500 dark:text-gray-400 text-xs font-light ',
  right: ''
}
</script>

<template>
  <label :class="labelPositionClasses[position ?? 'top']">
    <span v-if="title" :class="titlePositionClasses[position ?? 'top']">{{ title }}</span>

    <slot />
  </label>
</template>
