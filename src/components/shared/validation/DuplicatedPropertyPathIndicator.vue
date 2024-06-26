<script setup lang="ts">
import ExclamationTriangleIcon from '../../icons/ExclamationTriangleIcon.vue'
import ErrorIndicator from './ErrorIndicator.vue'
</script>

<template>
  <ErrorIndicator>
    <template #triggerContent>
      <ExclamationTriangleIcon class="icon-no-default size-5" />
    </template>

    <template #tooltipContent>
      {{ $t('shared.validation.duplicatedPropertyPathIndicator') }}
    </template>
  </ErrorIndicator>
</template>
