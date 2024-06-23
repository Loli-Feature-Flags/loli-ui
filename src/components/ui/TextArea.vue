<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'

export type TextAreaSize = 'small' | 'normal' | 'large'

const model = defineModel<string>()
const props = defineProps<{
  autofocus?: boolean
  size?: TextAreaSize
  autoGrow?: boolean
  minRows?: number
}>()
defineOptions({
  inheritAttrs: false
})

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const autofocussedRef = ref<boolean>(false)

const sizeClasses: { [key in TextAreaSize]: string } = {
  small: 'rounded-md px-2 py-1 text-sm',
  normal: 'rounded-md px-4 py-2',
  large: 'rounded-lg px-6 py-3 text-lg'
}

watchEffect(() => {
  if (props.autofocus && textareaRef.value && !autofocussedRef.value) {
    textareaRef.value.focus()
    autofocussedRef.value = true
  }
})

const classes = computed(() => [
  'transition w-full relative',
  'border border-gray-300 focus-ring text-gray-700',
  'placeholder:text-gray-400 placeholder:font-extralight',
  sizeClasses[props.size ?? 'normal']
])

const autoGrowContent = computed(() => {
  if (props.autoGrow) {
    return (model.value ?? '').replace(/\n$/, '\n ')
  }
  return ''
})
</script>

<template>
  <div :class="{ grid: autoGrow }">
    <textarea
      ref="textareaRef"
      v-model="model"
      :class="[...classes, { 'resize-none overflow-hidden': autoGrow }]"
      v-bind="$attrs"
      :rows="minRows ?? 1"
      style="grid-area: 1 / 1 / 2 / 2"
    />

    <div
      v-if="autoGrow"
      :class="[...classes, 'not-sr-only invisible whitespace-pre-wrap']"
      v-bind="$attrs"
      v-html="autoGrowContent"
      style="grid-area: 1 / 1 / 2 / 2"
    />
  </div>
</template>
