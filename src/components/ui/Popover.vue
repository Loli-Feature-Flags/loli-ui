<script setup lang="ts">
import { PopoverArrow, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'radix-vue'
import { useConfig } from '../../stores/config/store'
import useLoliUiElementRef from '../../hooks/useLoliUiElementRef'

const config = useConfig()

const open = defineModel<boolean>('open', { default: false })
defineProps<{
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  offset?: number
}>()

const loliUiElementRef = useLoliUiElementRef()
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger as-child>
      <slot name="trigger" />
    </PopoverTrigger>

    <PopoverPortal :to="loliUiElementRef">
      <PopoverContent
        class="rounded-md border border-gray-300 p-2 bg-white shadow-xl"
        :align="align"
        :side="side"
        :side-offset="offset ?? 4"
        :style="config.getFloatingZIndexStyle()"
      >
        <slot />
        <PopoverArrow class="fill-gray-300" :width="8" :height="4" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
