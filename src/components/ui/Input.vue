<script setup lang="ts" generic="T extends string | number">
import { computed, ref, watchEffect } from 'vue'
import HelpTooltip from '@/components/ui/HelpTooltip.vue'
import ValidationError from '@/components/ui/ValidationError.vue'

export type InputSize = 'small' | 'normal' | 'large'

const model = defineModel<T>()

const props = defineProps<{
  autofocus?: boolean
  size?: InputSize
  fit?: boolean
  validator?: (value: T) => true | string
  validationErrorAsTooltip?: boolean
  type?: 'text' | 'number'
}>()

defineOptions({
  inheritAttrs: false
})

const inputRef = ref<HTMLInputElement | null>(null)
const autofocussedRef = ref<boolean>(false)

const sizeClasses: { [key in InputSize]: string } = {
  small: 'rounded-md px-2 py-1 text-sm',
  normal: 'rounded-md px-4 py-2',
  large: 'rounded-lg px-6 py-3 text-lg'
}

watchEffect(() => {
  if (props.autofocus && inputRef.value && !autofocussedRef.value) {
    inputRef.value.focus()
    autofocussedRef.value = true
  }
})

const validationResult = computed<string | true>(() => {
  return props.validator && model.value ? props.validator(model.value) : true
})

const autoConvertingModel = computed({
  get() {
    return model.value
  },
  set(newValue) {
    if (props.type === 'number') {
      const parsedNumber: number =
        typeof newValue === 'string' ? parseFloat(newValue) : newValue ?? 0
      if (!isNaN(parsedNumber)) {
        model.value = newValue
      }
    } else {
      model.value = newValue
    }
  }
})

function resetNumberValueOnBlurIfEmpty() {
  if (inputRef.value && props.type === 'number' && inputRef.value.value.trim() === '') {
    inputRef.value.value = `${model.value}`
  }
}
</script>

<template>
  <HelpTooltip
    :disabled="!validationErrorAsTooltip || validationResult === true"
    always-visible
    variant="error"
  >
    <template #trigger>
      <input
        ref="inputRef"
        v-model="autoConvertingModel"
        :class="[
          'transition relative',
          'border border-gray-300 focus-ring text-gray-700',
          'placeholder:text-gray-400 placeholder:font-extralight',
          { 'w-full': !fit },
          sizeClasses[size ?? 'normal']
        ]"
        :type="type ?? 'text'"
        :data-validation-error="validationResult !== true"
        v-bind="$attrs"
        @blur="resetNumberValueOnBlurIfEmpty"
      />
    </template>

    {{ validationResult }}
  </HelpTooltip>

  <ValidationError v-if="validationResult !== true && !validationErrorAsTooltip">
    {{ validationResult }}
  </ValidationError>
</template>
