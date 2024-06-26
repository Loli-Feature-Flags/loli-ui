<script setup lang="ts">
import HelpTooltip from '../../ui/HelpTooltip.vue'
</script>

<template>
  <HelpTooltip>
    <template #trigger>
      <span class="cursor-help bg-red-600 text-white rounded-md px-2 py-1">
        <slot name="triggerContent" />
      </span>
    </template>

    <slot name="tooltipContent" />
  </HelpTooltip>
</template>
