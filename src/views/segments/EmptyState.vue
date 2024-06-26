<script setup lang="ts">
import Button from '../../components/ui/Button.vue'
import PlusIcon from '../../components/icons/PlusIcon.vue'
import UndrawDiscoverable from '../../components/illustrations/UndrawDiscoverable.vue'

defineEmits(['add'])
</script>

<template>
  <div class="flex flex-col items-center gap-12 py-12">
    <UndrawDiscoverable class="w-full h-auto max-h-[12em] pr-4" />

    <Button @click="$emit('add')" variant="primary">
      <PlusIcon />
      <span>{{ $t('views.segments.emptyState.add') }}</span>
    </Button>
  </div>
</template>
