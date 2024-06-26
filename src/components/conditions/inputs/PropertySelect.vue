<script setup lang="ts">
import type { Property } from '@loli-feature-flags/loli-sdk'
import { computed, ref, watch } from 'vue'
import { useWorkbench } from '../../../stores/workbench/store'
import Select, { type SelectOption } from '../../ui/Select.vue'

const workbench = useWorkbench()
const property = defineModel<Property | null>({ required: true })

const selectedPropertyId = ref<string>(property.value?.id ?? '')

watch(selectedPropertyId, (newPropertyId) => {
  property.value =
    workbench.spec.evaluationContext.properties.find(
      (specProperty) => specProperty.id === newPropertyId
    ) ?? null
})

watch(property, (newModel) => {
  if (newModel) {
    selectedPropertyId.value = newModel?.id
  }
})

const options = computed<SelectOption[]>(() =>
  workbench.spec.evaluationContext.properties.map((property) => ({
    value: property.id,
    label: property.name
  }))
)
</script>

<template>
  <Select v-model="selectedPropertyId" :options="options" size="small" fit />
</template>
