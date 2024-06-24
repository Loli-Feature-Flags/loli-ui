<script setup lang="ts">
import type { Property } from '@loli-feature-flags/loli-sdk'
import { countPropertyReferences, isPropertyReferenced } from '@loli-feature-flags/loli-sdk'
import FingerprintIcon from '@/components/icons/FingerprintIcon.vue'
import StalePropertyIndicator from '@/components/shared/indicators/StalePropertyIndicator.vue'
import { useWorkbench } from '@/stores/workbench/store'
import PropertyRolloutDiscriminatorIndicator from '@/components/shared/indicators/PropertyRolloutDiscriminatorIndicator.vue'
import ReferencesIndicator from '@/components/shared/indicators/ReferencesIndicator.vue'
import type { IssuesCarryOn } from '@/utils/issues'
import ListEntryCard from '@/components/shared/ListEntryCard.vue'

const workbench = useWorkbench()
const property = defineModel<Property>({ required: true })

defineProps<{
  issuesCarryOn: IssuesCarryOn
}>()

defineEmits(['edit'])
</script>

<template>
  <ListEntryCard @click="$emit('edit')" :issues-carry-on="issuesCarryOn">
    <div class="flex flex-row items-center justify-between flex-wrap gap-4 mb-2">
      <span class="text-lg font-mono text-primary-700 flex flex-row items-center gap-4">
        <FingerprintIcon />{{ property.name }}
      </span>

      <div class="flex flex-row gap-4 items-center">
        <StalePropertyIndicator v-if="!isPropertyReferenced(property.id, workbench.spec)" />

        <PropertyRolloutDiscriminatorIndicator v-if="property.rolloutDiscriminator" />

        <ReferencesIndicator :references="countPropertyReferences(property.id, workbench.spec)" />

        <span
          :class="[
            'border rounded-md px-2 py-0.5 text-xs',
            {
              'border-primary-500 bg-primary-100 text-primary-700':
                property.type === 'boolean' || property.type === 'booleanArray',
              'border-cerulean-500 bg-cerulean-100 text-cerulean-800':
                property.type === 'string' || property.type === 'stringArray',
              'border-zest-500 bg-zest-100 text-zest-700':
                property.type === 'number' || property.type === 'numberArray'
            }
          ]"
        >
          {{ $t(`spec.property.type.${property.type}`) }}
        </span>
      </div>
    </div>

    <div class="flex flex-col gap-0.5 items-start text-xs text-gray-400">
      <span>
        {{ $t('views.properties.entries.path') }}: context.{{ property.path.join('.') }}
      </span>
    </div>
  </ListEntryCard>
</template>
