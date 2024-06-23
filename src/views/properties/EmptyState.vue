<script setup lang="ts">
import PlusIcon from '@/components/icons/PlusIcon.vue'
import Button from '@/components/ui/Button.vue'
import UndrawPlaceholders from '@/components/illustrations/UndrawPlaceholders.vue'

defineEmits(['add'])
</script>

<template>
  <div class="flex flex-col items-center gap-12 py-12">
    <UndrawPlaceholders class="w-full h-auto max-h-[12em] pr-4" />

    <Button @click="$emit('add')" variant="primary">
      <PlusIcon />
      <span>{{ $t('views.properties.emptyState.add') }}</span>
    </Button>
  </div>
</template>
