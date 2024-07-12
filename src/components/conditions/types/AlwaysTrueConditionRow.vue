<script setup lang="ts">
import CheckCircleIcon from '../../icons/CheckCircleIcon.vue'
</script>

<template>
  <div class="flex flex-row gap-6 items-center text-green-800 dark:text-green-500">
    <CheckCircleIcon class="icon-no-default size-4" />
    <span class="text-sm">{{ $t('conditions.alwaysTrueCondition.message') }}</span>
  </div>
</template>
