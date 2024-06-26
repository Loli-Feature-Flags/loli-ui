<script setup lang="ts">
import Button from '../../components/ui/Button.vue'
import PlusIcon from '../../components/icons/PlusIcon.vue'
import UndrawPersonalSettings from '../../components/illustrations/UndrawPersonalSettings.vue'

defineEmits(['add'])
</script>

<template>
  <div class="flex flex-col items-center gap-12 py-12">
    <UndrawPersonalSettings class="w-full h-auto max-h-[12em]" />

    <Button @click="$emit('add')" variant="primary">
      <PlusIcon />
      <span>{{ $t('views.featureFlags.emptyState.add') }}</span>
    </Button>
  </div>
</template>
