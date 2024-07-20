<script setup lang="ts" generic="T extends string | number">
import {
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
  TagsInputRoot
} from 'radix-vue'
import XMarkIcon from '../icons/XMarkIcon.vue'
import { computed, ref } from 'vue'
import HelpTooltip from './HelpTooltip.vue'

export type TagsInputSize = 'small' | 'normal'

const valuesModel = defineModel<T[]>({ required: true })

const props = defineProps<{
  placeholder?: string
  size?: TagsInputSize
  fit?: boolean
  type?: 'text' | 'number'
  validator?: (value: T) => true | string
}>()

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

const validatorResult = ref<true | string>(true)

function handleInput(event: InputEvent) {
  const rawText = (event.target as HTMLInputElement).value

  if (props.type === 'number') {
    validatorResult.value = props.validator ? props.validator(parseFloat(rawText) as T) : true
  } else {
    validatorResult.value = props.validator ? props.validator(rawText as T) : true
  }
}

const stringifiedValues = computed({
  get() {
    return valuesModel.value.map((value) => value.toString())
  },
  set(newValues) {
    if (props.type === 'number') {
      valuesModel.value = newValues
        .map((newValue) => parseFloat(newValue))
        .filter((newNumber) => !isNaN(newNumber))
        .filter((newNumber) =>
          props.validator ? props.validator(newNumber as T) === true : true
        ) as T[]
    } else {
      valuesModel.value = newValues.filter((newValue) =>
        props.validator ? props.validator(newValue as T) === true : true
      ) as T[]
    }

    validatorResult.value = true
  }
})
</script>

<template>
  <HelpTooltip :disabled="validatorResult === true" always-visible variant="error">
    <template #trigger>
      <TagsInputRoot
        v-model="stringifiedValues"
        :class="[
          'flex flex-row flex-wrap gap-2 items-center',
          'border focus-ring',
          'bg-white border-gray-300',
          'dark:bg-gray-900 dark:border-gray-300',
          {
            'outline outline-red-500': typeof validatorResult === 'string'
          },
          rootSizeClasses[size ?? 'normal'],
          { 'w-full': !fit }
        ]"
        add-on-blur
        add-on-paste
      >
        <TagsInputItem
          v-for="(value, index) in stringifiedValues"
          :key="`${index}-${value}`"
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
          :type="type"
          @input="handleInput"
          @change="handleInput"
        />
      </TagsInputRoot>
    </template>

    {{ validatorResult }}
  </HelpTooltip>
</template>
