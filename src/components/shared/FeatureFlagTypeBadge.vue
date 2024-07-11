<script setup lang="ts">
import type { FeatureFlagType } from '@loli-feature-flags/loli-sdk'
import DataTypeBadge from './DataTypeBadge.vue'

defineProps<{ type: FeatureFlagType }>()
</script>

<template>
  <DataTypeBadge :type="type">
    {{ $t(`spec.featureFlag.type.${type}`) }}
  </DataTypeBadge>
</template>
