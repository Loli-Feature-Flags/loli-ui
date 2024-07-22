<script setup lang="ts">
/**
 * This is a helper file. We leverage Vue's custom element
 * bundling capability to bundle all styles/tailwind classes
 * as the property "styles" of this component. The Vue
 * compiler/bundler does that, because of the file extension ".ce.vue".
 *
 * In this component's style tag we import the main css file,
 * where the tailwind directives are declared. This way,
 * all Tailwind classes end up in this component's style tag
 * and in the bundled "styles" attribute.
 *
 * To scope the style correctly, we use the CSS class
 * "loli-ui-styles-scoped". We use postcss and the plugin "postcss-scope"
 * to prepend every style declaration with that special class.
 *
 * This way, all styles only apply to elements within the Loli UI.
 */

import LoliUi from './views/LoliUi.vue'
import { computed, onMounted, ref } from 'vue'
import { useConfig } from './stores/config/store'

const config = useConfig()

const prefersDarkMode = ref(false)

const isDarkModeEnabled = computed(() => {
  switch (config.appearance) {
    case 'light':
      return false
    case 'dark':
      return true
    default:
      return prefersDarkMode.value
  }
})

function updatePrefersDarkMode(e: any) {
  prefersDarkMode.value = e.matches
}

onMounted(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  prefersDarkMode.value = mediaQuery.matches

  mediaQuery.addEventListener('change', updatePrefersDarkMode)

  return () => {
    mediaQuery.removeEventListener('change', updatePrefersDarkMode)
  }
})
</script>

<template>
  <div class="loli-ui-styles-scoped">
    <div :data-loli-appearance="isDarkModeEnabled ? 'dark' : undefined">
      <LoliUi />
    </div>
  </div>
</template>

<style lang="scss">
@import 'styles/main.scss';
</style>
