<script setup lang="ts">
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger
} from 'radix-vue'
import { ref } from 'vue'
import { useConfig } from '../../stores/config/store'
import useLoliUiElementRef from '../../hooks/useLoliUiElementRef'

const config = useConfig()

export type HelpTooltipVariant = 'normal' | 'error'

const loliUiElementRef = useLoliUiElementRef()
const open = ref(false)

defineProps<{
  disabled?: boolean
  delay?: number
  align?: 'start' | 'center' | 'end'
  side?: 'right' | 'left' | 'top' | 'bottom'
  offset?: number
  variant?: HelpTooltipVariant
  alwaysVisible?: boolean
}>()

const variantClasses: { [key in HelpTooltipVariant]: string } = {
  normal: 'bg-gray-800 text-white',
  error: 'bg-red-600 text-white'
}

const arrowVariantClasses: { [key in HelpTooltipVariant]: string } = {
  normal: 'fill-gray-800',
  error: 'fill-red-600'
}
</script>

<template>
  <TooltipProvider :delay-duration="delay ?? 100">
    <TooltipRoot
      :disabled="disabled"
      :open="open || (alwaysVisible === true && !disabled)"
      @update:open="
        (value) => {
          open = value
        }
      "
    >
      <TooltipTrigger as-child>
        <slot name="trigger" />
      </TooltipTrigger>

      <TooltipPortal :to="loliUiElementRef">
        <TooltipContent
          :side-offset="offset ?? 4"
          :side="side ?? 'top'"
          :align="align"
          :class="[
            'rounded-md text-xs px-2 py-1 whitespace-pre-line',
            variantClasses[variant ?? 'normal']
          ]"
          :style="config.getFloatingZIndexStyle()"
          as="div"
        >
          <span><slot /></span>
          <TooltipArrow :class="arrowVariantClasses[variant ?? 'normal']" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
