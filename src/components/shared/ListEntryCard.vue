<script setup lang="ts">
import type { IssuesCarryOn } from '../../utils/issues'

defineProps<{ issuesCarryOn?: IssuesCarryOn }>()
defineEmits(['click'])
</script>

<template>
  <div
    role="button"
    tabindex="0"
    v-button-keyboard
    @click="$emit('click')"
    :class="[
      'transition focus-ring cursor-pointer rounded-md p-4 text-left border',
      {
        'border-gray-200 bg-gray-50/50 hover:bg-gray-50 active:bg-gray-100 dark:bg-gray-800/50 dark:border-gray-700 dark:hover:bg-gray-800/80 dark:active:bg-gray-800/20':
          !issuesCarryOn || issuesCarryOn.isValid(),
        'border-red-600 bg-red-50/30 hover:bg-red-50/80 dark:border-red-500 dark:bg-red-800/10':
          issuesCarryOn && issuesCarryOn.isInvalid()
      }
    ]"
  >
    <div class="flex flex-row items-center justify-between flex-wrap gap-4">
      <span
        class="text-lg font-mono flex flex-row items-center gap-4 text-primary-700 dark:text-gray-300"
      >
        <slot name="title-start" />
      </span>

      <div class="flex flex-row gap-4 items-center">
        <slot name="title-end" />
      </div>
    </div>

    <div class="flex flex-col gap-0.5 items-start text-xs text-gray-400 mt-2" v-if="$slots.bottom">
      <slot name="bottom" />
    </div>
  </div>
</template>
