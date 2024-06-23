<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <div>
    <div class="flex flex-row items-center justify-between gap-8">
      <div v-if="title" class="view__head__title text-2xl">{{ title }}</div>

      <div v-if="$slots['head-end']">
        <slot name="head-end" />
      </div>
    </div>

    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>
