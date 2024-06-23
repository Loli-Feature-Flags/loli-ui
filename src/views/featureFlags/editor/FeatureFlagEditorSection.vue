<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <div>
    <div class="flex flex-row items-center gap-4 justify-between mb-4">
      <div v-if="title" class="text-2xl">{{ title }}</div>

      <div v-if="$slots['title-end']">
        <slot name="title-end" />
      </div>
    </div>

    <div>
      <slot />
    </div>
  </div>
</template>
