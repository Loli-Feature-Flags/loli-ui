<script setup lang="ts">
import ExclamationCircleIcon from '../../icons/ExclamationCircleIcon.vue'
import HelpTooltip from '../../ui/HelpTooltip.vue'
</script>

<template>
  <HelpTooltip>
    <template #trigger>
      <ExclamationCircleIcon class="text-orange-700 cursor-help icon-no-default size-5" />
    </template>

    {{ $t('shared.staleProperty') }}
  </HelpTooltip>
</template>
