<script setup lang="ts">
import SignalSlashIcon from '../../icons/SignalSlashIcon.vue'
import SignalIcon from '../../icons/SignalIcon.vue'
import HelpTooltip from '../../ui/HelpTooltip.vue'

defineProps<{ active: boolean }>()
const sharedIconClasses = 'icon-no-default size-5 cursor-help'
</script>

<template>
  <HelpTooltip>
    <template #trigger>
      <span>
        <SignalIcon
          v-if="active"
          :class="[sharedIconClasses, 'text-green-700 dark:text-green-500']"
        />
        <SignalSlashIcon v-else :class="[sharedIconClasses, 'text-red-600 dark:text-red-500']" />
      </span>
    </template>

    {{ active ? $t('shared.targetingStatus.active') : $t('shared.targetingStatus.inactive') }}
  </HelpTooltip>
</template>
