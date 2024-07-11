<script setup lang="ts">
import type { FeatureFlagType, PropertyType } from '@loli-feature-flags/loli-sdk'

defineProps<{ type: FeatureFlagType | PropertyType }>()
</script>

<template>
  <span
    :class="[
      'border rounded-md px-2 py-0.5 text-xs',
      {
        'border-primary-500 bg-primary-100 text-primary-700 dark:border-primary-500 dark:bg-primary-800 dark:text-primary-200':
          type === 'boolean' || type === 'booleanArray',
        'border-cerulean-500 bg-cerulean-100 text-cerulean-800 dark:border-cerulean-600 dark:bg-cerulean-950 dark:text-cerulean-200':
          type === 'string' || type === 'stringArray',
        'border-zest-500 bg-zest-100 text-zest-700 dark:border-zest-500 dark:bg-zest-900 dark:text-zest-200':
          type === 'number' || type === 'numberArray'
      }
    ]"
  >
    <slot />
  </span>
</template>
