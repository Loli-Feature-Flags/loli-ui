<script setup lang="ts">
import ExclamationTriangleIcon from '../../icons/ExclamationTriangleIcon.vue'
import HelpTooltip from '../../ui/HelpTooltip.vue'
</script>

<template>
  <HelpTooltip>
    <template #trigger>
      <ExclamationTriangleIcon class="text-red-700 cursor-help icon-no-default size-5" />
    </template>

    {{ $t('shared.emptySegmentIndicator') }}
  </HelpTooltip>
</template>
