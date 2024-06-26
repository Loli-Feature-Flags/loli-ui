<script setup lang="ts">
import { ref } from 'vue'
import TrashIcon from '../icons/TrashIcon.vue'
import XMarkIcon from '../icons/XMarkIcon.vue'
import DefaultDialogTitle from '../ui/DefaultDialogTitle.vue'
import Dialog from '../ui/Dialog.vue'
import Button from '../ui/Button.vue'

defineProps<{ title: string; description: string }>()
const emit = defineEmits(['delete'])
const opened = ref(false)

function deleteProperty() {
  emit('delete')
  opened.value = false
}
</script>

<template>
  <Dialog v-model:open="opened">
    <template #title>
      <DefaultDialogTitle>
        <TrashIcon />
        {{ title }}
      </DefaultDialogTitle>
    </template>

    <template #trigger>
      <slot name="trigger" />
    </template>

    <p class="mt-6 text-gray-500">{{ description }}</p>

    <div class="mt-8 grid grid-cols-2 gap-4">
      <Button @click="opened = false" class="flex-grow">
        <XMarkIcon />{{ $t('shared.confirmDeleteDialog.cancel') }}
      </Button>

      <Button variant="danger" @click="deleteProperty" class="flex-grow">
        <TrashIcon />{{ $t('shared.confirmDeleteDialog.confirm') }}
      </Button>
    </div>
  </Dialog>
</template>
