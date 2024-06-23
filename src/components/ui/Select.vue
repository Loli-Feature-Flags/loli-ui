<script setup lang="ts">
import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport
} from 'radix-vue'
import ChevronUpDownIcon from '@/components/icons/ChevronUpDownIcon.vue'
import useLoliUiElementRef from '@/hooks/useLoliUiElementRef'
import CheckIcon from '@/components/icons/CheckIcon.vue'
import ChevronUpIcon from '@/components/icons/ChevronUpIcon.vue'
import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue'

export type SelectOption<VALUE extends string = string> = { value: VALUE; label?: string }
export type SelectSize = 'small' | 'normal'

defineProps<{
  options: SelectOption[]
  placeholder?: string
  ariaLabel?: string
  size?: SelectSize
  fit?: boolean
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  offset?: number
  disabled?: boolean
}>()

const sizeClasses: { [key in SelectSize]: string } = {
  small: 'rounded-md px-2 py-1 gap-2 text-sm',
  normal: 'rounded-md px-4 py-2 gap-4'
}

const itemSizeClasses: { [key in SelectSize]: string } = {
  small: 'rounded-md px-2 py-1 gap-1 text-sm',
  normal: 'rounded-md px-4 py-2 gap-2'
}

const viewportSizeClasses: { [key in SelectSize]: string } = {
  small: 'gap-1',
  normal: 'gap-0'
}

const model = defineModel<string>()

const loliUiRef = useLoliUiElementRef()
</script>

<template>
  <SelectRoot v-model="model" :disabled="disabled">
    <SelectTrigger
      :aria-label="ariaLabel"
      :class="[
        'flex justify-between items-center',
        'transition relative focus-ring',
        'bg-white border border-gray-300 hover:bg-gray-50',
        'disabled:bg-gray-100 disabled:border-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-100',
        'data-[placeholder]:text-gray-400 data-[placeholder]:font-extralight',
        { ' w-full': !fit },
        sizeClasses[size ?? 'normal']
      ]"
    >
      <SelectValue :placeholder="placeholder" />
      <ChevronUpDownIcon class="size-4" />
    </SelectTrigger>

    <SelectPortal :to="loliUiRef">
      <Transition name="fade">
        <SelectContent
          position="popper"
          :align="align ?? 'start'"
          :side="side ?? 'bottom'"
          :side-offset="offset ?? 8"
          class="bg-white min-w-[15em] p-2 shadow-2xl border border-gray-300 rounded-md z-100 max-h-[17em] relative overflow-hidden"
        >
          <SelectScrollUpButton
            class="flex flex-row justify-center absolute top-0 left-0 w-full border-b border-gray-300 bg-white py-0.5 z-10"
          >
            <ChevronUpIcon />
          </SelectScrollUpButton>

          <SelectViewport :class="['flex flex-col', viewportSizeClasses[size ?? 'normal']]">
            <SelectItem
              v-for="option of options"
              :value="option.value"
              :key="option.value"
              :class="[
                'transition flex flex-row justify-between w-full items-center cursor-pointer ',
                'hover:bg-gray-100 focus:bg-gray-100 focus:outline-none',
                itemSizeClasses[size ?? 'normal']
              ]"
            >
              <SelectItemText>{{ option.label ?? option.value }}</SelectItemText>
              <SelectItemIndicator><CheckIcon /></SelectItemIndicator>
            </SelectItem>
          </SelectViewport>

          <SelectScrollDownButton
            class="flex flex-row justify-center absolute bottom-0 left-0 w-full border-t border-gray-300 bg-white py-0.5 z-10"
          >
            <ChevronDownIcon />
          </SelectScrollDownButton>
        </SelectContent>
      </Transition>
    </SelectPortal>
  </SelectRoot>
</template>
