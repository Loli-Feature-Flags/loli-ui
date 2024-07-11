<script setup lang="ts">
import type { Property } from '@loli-feature-flags/loli-sdk'
import { countPropertyReferences, isPropertyReferenced } from '@loli-feature-flags/loli-sdk'
import { useWorkbench } from '../../stores/workbench/store'
import type { IssuesCarryOn } from '../../utils/issues'
import ReferencesIndicator from '../../components/shared/indicators/ReferencesIndicator.vue'
import PropertyRolloutDiscriminatorIndicator from '../../components/shared/indicators/PropertyRolloutDiscriminatorIndicator.vue'
import StalePropertyIndicator from '../../components/shared/indicators/StalePropertyIndicator.vue'
import FingerprintIcon from '../../components/icons/FingerprintIcon.vue'
import ListEntryCard from '../../components/shared/ListEntryCard.vue'
import DataTypeBadge from '../../components/shared/DataTypeBadge.vue'

const workbench = useWorkbench()
const property = defineModel<Property>({ required: true })

defineProps<{
  issuesCarryOn: IssuesCarryOn
}>()

defineEmits(['edit'])
</script>

<template>
  <ListEntryCard @click="$emit('edit')" :issues-carry-on="issuesCarryOn">
    <template #title-start><FingerprintIcon />{{ property.name }}</template>

    <template #title-end>
      <StalePropertyIndicator v-if="!isPropertyReferenced(property.id, workbench.spec)" />

      <PropertyRolloutDiscriminatorIndicator v-if="property.rolloutDiscriminator" />

      <ReferencesIndicator :references="countPropertyReferences(property.id, workbench.spec)" />

      <DataTypeBadge :type="property.type">
        {{ $t(`spec.property.type.${property.type}`) }}
      </DataTypeBadge>
    </template>

    <template #bottom>
      <span>
        {{ $t('views.properties.entries.path') }}: context.{{ property.path.join('.') }}
      </span>
    </template>
  </ListEntryCard>
</template>
