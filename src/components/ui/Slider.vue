<script setup lang="ts">
import { computed, ref } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'radix-vue'

const slideValue = defineModel<number>({ required: true })
defineProps<{ thumbLabel: string; min?: number; max?: number; step?: number }>()

const listSliderValue = computed<number[]>({
  get() {
    return [slideValue.value]
  },
  set(newValue) {
    slideValue.value = newValue[0]
  }
})

const grabbing = ref(false)
</script>

<template>
  <SliderRoot
    v-model="listSliderValue"
    class="relative flex items-center select-none touch-none w-[200px] h-5"
    :min="min ?? 0"
    :max="max ?? 100"
    :step="step ?? 1"
    @pointerdown="grabbing = true"
    @pointerup="grabbing = false"
  >
    <SliderTrack
      :class="['bg-gray-300 relative grow rounded-full h-[2px]', { 'cursor-grabbing': grabbing }]"
    >
      <SliderRange class="absolute bg-primary-500 rounded-full h-full" />
    </SliderTrack>

    <SliderThumb
      :class="[
        'transition block size-4 bg-white border-2 border-primary-500 rounded-full focus-ring',
        { 'cursor-grab': !grabbing, 'cursor-grabbing': grabbing }
      ]"
      :aria-label="thumbLabel"
    />
  </SliderRoot>
</template>
