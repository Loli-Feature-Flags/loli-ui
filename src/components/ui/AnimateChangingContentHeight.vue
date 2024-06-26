<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const observeHeightContainer = ref<HTMLDivElement | null>(null)
const height = ref<number | undefined>(undefined)

watchEffect(() => {
  const element = observeHeightContainer.value

  if (element) {
    const resizeObserver = new ResizeObserver(() => {
      height.value = element.getBoundingClientRect().height
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }
})
</script>

<template>
  <div
    class="overflow-y-hidden overflow-x-visible transition-[height]"
    :style="{ height: height !== undefined ? `${height}px` : undefined }"
  >
    <div ref="observeHeightContainer">
      <slot />
    </div>
  </div>
</template>
