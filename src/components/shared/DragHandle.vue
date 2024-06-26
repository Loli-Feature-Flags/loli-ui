<script setup lang="ts">
import { DRAG_HANDLE_CLASS } from '../../constants'
import Bars3Icon from '../icons/Bars3Icon.vue'
</script>

<template>
  <div :class="DRAG_HANDLE_CLASS" :title="$t('common.dragHandleTitle')">
    <Bars3Icon />
  </div>
</template>
