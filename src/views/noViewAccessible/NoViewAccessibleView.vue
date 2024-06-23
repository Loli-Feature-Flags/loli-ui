<script setup lang="ts">
import UndrawEmptyReOpql from '@/components/illustrations/UndrawEmptyReOpql.vue'
</script>

<template>
  <div class="flex flex-col items-center gap-20 py-20">
    <UndrawEmptyReOpql class="w-full h-auto max-h-[12em]" />

    <p class="text-center">
      {{ $t('views.noViewAccessible.message') }}
    </p>
  </div>
</template>
