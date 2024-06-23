<script setup lang="ts">
import HelpTooltip from '@/components/ui/HelpTooltip.vue'
import ViewfinderCircleIcon from '@/components/icons/ViewfinderCircleIcon.vue'
</script>

<template>
  <HelpTooltip>
    <template #trigger>
      <ViewfinderCircleIcon class="icon-no-default cursor-help size-5" />
    </template>

    {{ $t('shared.rolloutDiscriminatorIndicator') }}
  </HelpTooltip>
</template>
