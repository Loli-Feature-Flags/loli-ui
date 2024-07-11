<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="dark:grayscale dark:brightness-[10]"
  >
    <title v-if="title">{{ title }}</title>
    <rect x="60" y="40" width="20" height="20" transform="rotate(90 60 40)" fill="#840ECC" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M100 0H0V100H100V0ZM80 20H20V80H80V20Z"
      fill="#840ECC"
    />
  </svg>
</template>
