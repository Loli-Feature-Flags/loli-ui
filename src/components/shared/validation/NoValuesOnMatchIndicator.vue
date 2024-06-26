<script setup lang="ts">
import ErrorIndicator from './ErrorIndicator.vue'
import ExclamationTriangleIcon from '../../icons/ExclamationTriangleIcon.vue'
</script>

<template>
  <ErrorIndicator>
    <template #triggerContent>
      <ExclamationTriangleIcon class="icon-no-default size-5" />
    </template>

    <template #tooltipContent>
      {{ $t('shared.validation.noValuesOnMatch') }}
    </template>
  </ErrorIndicator>
</template>
