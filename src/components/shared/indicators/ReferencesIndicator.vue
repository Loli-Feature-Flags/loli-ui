<script setup lang="ts">
import HelpTooltip from '../../ui/HelpTooltip.vue'

defineProps<{
  references: {
    totalConditionReferences: number
    featureFlagReferences: number
    segmentReferences: number
  }
}>()
</script>

<template>
  <HelpTooltip>
    <template #trigger>
      <span class="text-xs font-mono bg-gray-200 rounded-md px-2 py-0.5 cursor-help">
        {{ references.totalConditionReferences }}
      </span>
    </template>

    {{ $t('shared.referencesIndicator', references) }}
  </HelpTooltip>
</template>
