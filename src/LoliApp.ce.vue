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

import LoliUi from '@/views/LoliUi.vue'
</script>

<template>
  <div class="loli-ui-styles-scoped">
    <LoliUi />
  </div>
</template>

<style lang="scss">
@import 'styles/main.scss';
</style>
