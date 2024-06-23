<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'radix-vue'

export type SwitchSize = 'normal' | 'slim'

const checkedModel = defineModel<boolean>({ required: true })
defineProps<{ size?: SwitchSize }>()

const rootSizeClasses: { [key in SwitchSize]: string } = {
  normal: 'w-10 h-5 rounded-full',
  slim: 'w-8 h-4 rounded-full'
}

const thumbSizeClasses: { [key in SwitchSize]: string } = {
  normal: 'size-4 rounded-full translate-x-[15%] data-[state=checked]:translate-x-[135%]',
  slim: 'size-3 rounded-full translate-x-[15%] data-[state=checked]:translate-x-[150%]'
}
</script>

<template>
  <SwitchRoot
    v-model:checked="checkedModel"
    :class="[
      'flex bg-gray-300 shadow-sm relative data-[state=checked]:bg-green-600 cursor-pointer transition',
      rootSizeClasses[size ?? 'normal']
    ]"
  >
    <SwitchThumb
      :class="[
        'bg-white shadow-sm absolute top-1/2 -translate-y-1/2 left-0 transition will-change',
        thumbSizeClasses[size ?? 'normal']
      ]"
    />
  </SwitchRoot>
</template>
