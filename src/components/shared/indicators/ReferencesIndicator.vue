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
      <span
        class="text-xs font-mono rounded-md px-2 py-0.5 cursor-help bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-gray-100"
      >
        {{ references.totalConditionReferences }}
      </span>
    </template>

    {{ $t('shared.referencesIndicator', references) }}
  </HelpTooltip>
</template>
