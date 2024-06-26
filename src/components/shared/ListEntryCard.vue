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
        'border-gray-200 bg-gray-50/50 hover:bg-gray-50 active:bg-gray-100':
          !issuesCarryOn || issuesCarryOn.isValid(),
        'border-red-600 bg-red-50/30 hover:bg-red-50/80 active:bg-red-100':
          issuesCarryOn && issuesCarryOn.isInvalid()
      }
    ]"
  >
    <slot />
  </div>
</template>
