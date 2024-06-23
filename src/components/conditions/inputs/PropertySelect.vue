<script setup lang="ts">
import { useWorkbench } from '@/stores/workbench/store'
import type { Property } from '@loli-feature-flags/loli-sdk-js'
import { computed, ref, watch } from 'vue'
import Select, { type SelectOption } from '@/components/ui/Select.vue'

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
