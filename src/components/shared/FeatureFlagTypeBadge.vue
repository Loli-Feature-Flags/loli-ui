<script setup lang="ts">
import type { FeatureFlagType } from '@loli-feature-flags/loli-sdk'

defineProps<{ type: FeatureFlagType }>()
</script>

<template>
  <span
    :class="[
      'border rounded-md px-2 py-0.5 text-xs',
      {
        'border-primary-500 bg-primary-100 text-primary-700': type === 'boolean',
        'border-cerulean-500 bg-cerulean-100 text-cerulean-800': type === 'string',
        'border-zest-500 bg-zest-100 text-zest-700': type === 'number'
      }
    ]"
  >
    {{ $t(`spec.featureFlag.type.${type}`) }}
  </span>
</template>
