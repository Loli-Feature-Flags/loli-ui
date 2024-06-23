<script setup lang="ts">
import HelpTooltip from '@/components/ui/HelpTooltip.vue'
import ExclamationTriangleIcon from '@/components/icons/ExclamationTriangleIcon.vue'
</script>

<template>
  <HelpTooltip>
    <template #trigger>
      <ExclamationTriangleIcon class="text-red-700 cursor-help icon-no-default size-5" />
    </template>

    {{ $t('shared.emptySegmentIndicator') }}
  </HelpTooltip>
</template>
