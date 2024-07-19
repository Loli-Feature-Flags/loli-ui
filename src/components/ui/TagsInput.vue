<script setup lang="ts">
import {
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
  TagsInputRoot
} from 'radix-vue'
import XMarkIcon from '../icons/XMarkIcon.vue'

export type TagsInputSize = 'small' | 'normal'

const valuesModel = defineModel<string[]>({ required: true })
defineProps<{
  placeholder?: string
  size?: TagsInputSize
  fit?: boolean
}>()

function handleBlur(event: Event) {
  if (event.target) {
    const input = event.target as HTMLInputElement
    const text = input.value

    if (text.trim().length > 0) {
      valuesModel.value.push(text)
    }

    input.value = ''
  }
}

const rootSizeClasses: { [key in TagsInputSize]: string } = {
  small: 'rounded-md p-1 gap-1',
  normal: 'rounded-md p-2 gap-2'
}

const itemSizeClasses: { [key in TagsInputSize]: string } = {
  small: 'gap-1 rounded p-0.5',
  normal: 'gap-2 rounded p-1'
}

const itemTextSizeClasses: { [key in TagsInputSize]: string } = {
  small: 'text-sm px-1',
  normal: 'px-2'
}

const itemDeleteIconSizeClasses: { [key in TagsInputSize]: string } = {
  small: 'icon-no-default size-3',
  normal: 'icon-no-default size-5'
}

const inputSizeClasses: { [key in TagsInputSize]: string } = {
  small: 'text-sm px-1 rounded',
  normal: 'text-sm px-2 rounded'
}
</script>

<template>
  <TagsInputRoot
    v-model="valuesModel"
    :class="[
      'flex flex-row flex-wrap gap-2 items-center',
      'border focus-ring',
      'bg-white border-gray-300',
      'dark:bg-gray-900 dark:border-gray-300',
      rootSizeClasses[size ?? 'normal'],
      { 'w-full': !fit }
    ]"
  >
    <TagsInputItem
      v-for="value in valuesModel"
      :key="value"
      :value="value"
      :class="[
        'flex items-center justify-center border',
        'bg-gray-100 border-gray-200 aria-[current=true]:bg-primary-100',
        'dark:bg-gray-700 dark:border-gray-700 dark:aria-[current=true]:bg-primary-600',
        itemSizeClasses[size ?? 'normal']
      ]"
    >
      <TagsInputItemText :class="[itemTextSizeClasses[size ?? 'normal']]" />

      <TagsInputItemDelete class="pr-1">
        <XMarkIcon :class="[itemDeleteIconSizeClasses[size ?? 'normal']]" />
      </TagsInputItemDelete>
    </TagsInputItem>

    <TagsInputInput
      :placeholder="placeholder"
      :class="[
        'focus:outline-none flex-1',
        'bg-white placeholder:text-gray-400',
        'dark:bg-gray-900 placeholder:text-gray-400 dark:placeholder:font-extralight',
        inputSizeClasses[size ?? 'normal']
      ]"
      @blur="handleBlur"
    />
  </TagsInputRoot>
</template>
