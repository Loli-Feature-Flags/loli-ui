<script setup lang="ts">
export type ButtonVariant = 'default' | 'primary' | 'danger' | 'flat'
export type ButtonSize = 'normal' | 'large' | 'small'

const props = defineProps<{
  disabled?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  class?: string
  fullWidth?: boolean
  align?: 'left' | 'center' | 'right'
}>()

defineEmits(['click'])

const variantClasses: { [key in ButtonVariant]: string | string[] } = {
  default: [
    'bg-white border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100',
    'dark:bg-gray-900 dark:border-gray-200 dark:text-gray-200 dark:hover:text-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-800',
    'disabled:bg-gray-100 disabled:border-gray-100 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:hover:bg-gray-100 disabled:active:bg-gray-100',
    'dark:disabled:bg-gray-900 dark:disabled:border-gray-500 dark:disabled:text-gray-500 dark:disabled:hover:text-gray-500 dark:disabled:hover:bg-gray-900 dark:disabled:active:bg-gray-900'
  ],
  primary: [
    'bg-primary-500 border-primary-500 text-gray-50 hover:text-white hover:bg-primary-400 hover:border-primary-400 active:bg-primary-600 active:border-primary-600',
    'disabled:bg-primary-200 disabled:border-primary-200 disabled:text-primary-400 disabled:hover:bg-primary-200 disabled:hover:text-primary-400',
    'dark:disabled:bg-primary-700 dark:disabled:border-primary-700 dark:disabled:text-primary-400 dark:disabled:hover:bg-primary-700 dark:disabled:hover:text-primary-400'
  ],
  danger: [
    'bg-red-500 border-red-500 text-gray-50 hover:text-white hover:bg-red-400 hover:border-red-400 active:bg-red-600 active:border-red-600',
    'disabled:bg-red-200 disabled:border-red-200 disabled:text-red-400 disabled:hover:bg-red-200 disabled:hover:text-red-400',
    'dark:disabled:bg-red-800 disabled:border-red-800 disabled:text-red-400 dark:disabled:hover:bg-red-800 dark:disabled:hover:text-red-400'
  ],
  flat: [
    'border-transparent hover:bg-gray-100 active:bg-gray-200 hover:border-gray-200',
    'dark:border-transparent dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:hover:border-gray-500',
    'disabled:hover:bg-transparent disabled:active:bg-transparent disabled:text-gray-500',
    'dark:disabled:hover:bg-transparent dark:disabled:active:bg-transparent dark:disabled:text-gray-500'
  ]
}

const sizeClasses: { [key in ButtonSize]: string } = {
  small: 'rounded-md px-2 py-1.5 gap-1 text-sm leading-none',
  normal: 'rounded-md px-4 py-2 gap-2',
  large: 'rounded-lg px-6 py-3 gap-4 text-lg'
}
</script>

<template>
  <button
    :disabled="disabled"
    @click="$emit('click')"
    :class="[
      'border transition flex flex-row items-center gap-2 focus-ring disabled:cursor-not-allowed',
      sizeClasses[size ?? 'normal'],
      variantClasses[variant ?? 'default'],
      {
        'justify-start': align === 'left',
        'justify-center': !align || align === 'center',
        'justify-end': align === 'right',
        'w-full': fullWidth
      },
      props.class
    ]"
  >
    <slot />
  </button>
</template>
