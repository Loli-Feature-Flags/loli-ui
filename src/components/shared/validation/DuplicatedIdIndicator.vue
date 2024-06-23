<script setup lang="ts">
import ErrorIndicator from '@/components/shared/validation/ErrorIndicator.vue'
import ExclamationTriangleIcon from '@/components/icons/ExclamationTriangleIcon.vue'
</script>

<template>
  <ErrorIndicator>
    <template #triggerContent>
      <ExclamationTriangleIcon class="icon-no-default size-5" />
    </template>

    <template #tooltipContent>
      {{ $t('shared.validation.duplicatedIdIndicator') }}
    </template>
  </ErrorIndicator>
</template>
