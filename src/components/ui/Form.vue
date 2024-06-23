<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits(['submit'])
const formElement = ref<HTMLFormElement>()

function onSubmitWithCustomValidation() {
  if (formElement.value) {
    const validationErrorElements = Array.from(
      formElement.value.querySelectorAll('*[data-validation-error="true"]')
    )

    if (validationErrorElements.length > 0) {
      return
    }
  }

  emits('submit')
}
</script>

<template>
  <form ref="formElement" @submit.prevent.stop="onSubmitWithCustomValidation">
    <slot />
  </form>
</template>
