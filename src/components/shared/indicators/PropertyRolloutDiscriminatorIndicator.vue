<script setup lang="ts">
import ViewfinderCircleIcon from '../../icons/ViewfinderCircleIcon.vue'
import HelpTooltip from '../../ui/HelpTooltip.vue'
</script>

<template>
  <HelpTooltip>
    <template #trigger>
      <ViewfinderCircleIcon class="icon-no-default cursor-help size-5" />
    </template>

    {{ $t('shared.rolloutDiscriminatorIndicator') }}
  </HelpTooltip>
</template>
