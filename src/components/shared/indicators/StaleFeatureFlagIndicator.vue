<script setup lang="ts">
import HelpTooltip from '@/components/ui/HelpTooltip.vue'
import ExclamationCircleIcon from '@/components/icons/ExclamationCircleIcon.vue'
</script>

<template>
  <HelpTooltip>
    <template #trigger>
      <ExclamationCircleIcon class="text-orange-700 cursor-help icon-no-default size-5" />
    </template>

    {{ $t('shared.staleFeatureFlag') }}
  </HelpTooltip>
</template>
