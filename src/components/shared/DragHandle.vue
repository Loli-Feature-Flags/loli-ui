<script setup lang="ts">
import Bars3Icon from '@/components/icons/Bars3Icon.vue'
import { DRAG_HANDLE_CLASS } from '@/constants'
</script>

<template>
  <div :class="DRAG_HANDLE_CLASS" :title="$t('common.dragHandleTitle')">
    <Bars3Icon />
  </div>
</template>
