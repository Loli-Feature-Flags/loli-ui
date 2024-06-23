<script setup lang="ts">
import PropertySelect from '@/components/conditions/inputs/PropertySelect.vue'
import { useWorkbench } from '@/stores/workbench/store'
import { computed, ref, watch } from 'vue'
import type { Property, PropertyCondition } from '@loli-feature-flags/loli-sdk-js'
import { createDefaultConditionForProperty } from '@/utils/condition'
import StringPropertyConditionRowExtension from '@/components/conditions/types/property/StringPropertyConditionRowExtension.vue'
import BooleanArrayPropertyConditionRowExtension from '@/components/conditions/types/property/BooleanArrayPropertyConditionRowExtension.vue'
import NumberArrayPropertyConditionRowExtension from '@/components/conditions/types/property/NumberArrayPropertyConditionRowExtension.vue'
import StringArrayPropertyConditionRowExtension from '@/components/conditions/types/property/StringArrayPropertyConditionRowExtension.vue'
import BooleanPropertyConditionRowExtension from '@/components/conditions/types/property/BooleanPropertyConditionRowExtension.vue'
import NumberPropertyConditionRowExtension from '@/components/conditions/types/property/NumberPropertyConditionRowExtension.vue'
import FingerprintIcon from '@/components/icons/FingerprintIcon.vue'

const workbench = useWorkbench()

const conditionModel = defineModel<PropertyCondition>({
  required: true
})

const conditionProperty = computed<Property | null>(() => {
  return (
    workbench.spec.evaluationContext.properties.find(
      (property) => property.id === conditionModel.value.propertyId
    ) ?? null
  )
})

const selectedProperty = ref<Property | null>(conditionProperty.value)

watch(selectedProperty, (newSelectedProperty) => {
  if (
    newSelectedProperty &&
    (!conditionProperty.value || newSelectedProperty.id !== conditionProperty.value?.id)
  ) {
    conditionModel.value = createDefaultConditionForProperty(newSelectedProperty)
  }
})
</script>

<template>
  <div class="w-full grid items-start gap-4 grid-cols-[auto_1.7fr_0.7fr_1.3fr_0.7fr_3fr]">
    <div class="py-1.5">
      <FingerprintIcon class="icon-no-default size-4 mr-2" />
    </div>

    <PropertySelect v-model="selectedProperty" />

    <StringPropertyConditionRowExtension
      v-if="conditionModel.type === 'string'"
      v-model="conditionModel"
    />

    <NumberPropertyConditionRowExtension
      v-else-if="conditionModel.type === 'number'"
      v-model="conditionModel"
    />

    <BooleanPropertyConditionRowExtension
      v-else-if="conditionModel.type === 'boolean'"
      v-model="conditionModel"
    />

    <StringArrayPropertyConditionRowExtension
      v-else-if="conditionModel.type === 'stringArray'"
      v-model="conditionModel"
    />

    <NumberArrayPropertyConditionRowExtension
      v-else-if="conditionModel.type === 'numberArray'"
      v-model="conditionModel"
    />

    <BooleanArrayPropertyConditionRowExtension
      v-else-if="conditionModel.type === 'booleanArray'"
      v-model="conditionModel"
    />
  </div>
</template>
