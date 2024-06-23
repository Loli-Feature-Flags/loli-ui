<script setup lang="ts">
import LoliView from '@/components/LoliView.vue'
import EmptyState from '@/views/properties/EmptyState.vue'
import { useWorkbench } from '@/stores/workbench/store'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import Button from '@/components/ui/Button.vue'
import CreatePropertyDialog from '@/views/properties/CreatePropertyDialog.vue'
import PropertyList from '@/views/properties/PropertyList.vue'
import { computed, watchEffect } from 'vue'
import { useNavigation } from '@/stores/navigation/store'
import type { Property } from '@loli-feature-flags/loli-sdk-js'
import EditPropertyDialog from '@/views/properties/EditPropertyDialog.vue'
import { IssuesCarryOn } from '@/utils/issues'

const workbench = useWorkbench()
const navigation = useNavigation()

const showAddDialog = computed<boolean>({
  get() {
    return navigation.state.view === 'properties' && navigation.state.subview?.type === 'add'
  },
  set(newOpen) {
    if (newOpen) {
      navigation.push({ view: 'properties', subview: { type: 'add' } })
    } else {
      navigation.push({ view: 'properties' })
    }
  }
})

const showEditDialog = computed<boolean>({
  get() {
    return navigation.state.view === 'properties' && navigation.state.subview?.type === 'edit'
  },
  set(newOpen) {
    if (!newOpen) {
      navigation.push({ view: 'properties' })
    }
  }
})

const propertyToEdit = computed<Property | null>(() => {
  if (navigation.state.view === 'properties' && navigation.state.subview?.type === 'edit') {
    const propertyToEditId = navigation.state.subview.propertyId

    return (
      workbench.spec.evaluationContext.properties.find(
        (property) => property.id === propertyToEditId
      ) ?? null
    )
  }

  return null
})

watchEffect(() => {
  if (showEditDialog.value && !propertyToEdit.value) {
    navigation.replace({ view: 'properties' })
  }
})

function deletePropertyToEdit() {
  if (propertyToEdit.value) {
    const propertyIndex = workbench.spec.evaluationContext.properties.indexOf(propertyToEdit.value)

    navigation.replace({ view: 'properties' })

    workbench.spec.evaluationContext.properties.splice(propertyIndex, 1)
  }
}

const issuesCarryOn = computed<IssuesCarryOn>(() => {
  if (!propertyToEdit.value) {
    return IssuesCarryOn.createEmpty()
  }

  return IssuesCarryOn.fromSemanticValidation(workbench.semanticValidation, [
    'evaluationContext',
    'properties',
    workbench.spec.evaluationContext.properties.indexOf(propertyToEdit.value)
  ])
})
</script>

<template>
  <div>
    <CreatePropertyDialog v-model:open="showAddDialog" />

    <EditPropertyDialog
      v-model="propertyToEdit"
      v-model:open="showEditDialog"
      @delete="deletePropertyToEdit"
      :issues-carry-on="issuesCarryOn"
    />

    <LoliView
      v-if="workbench.spec.evaluationContext.properties.length > 0"
      :title="$t('views.properties.title')"
    >
      <template #head-end>
        <Button @click="showAddDialog = true">
          <PlusIcon />
          {{ $t('views.properties.add') }}
        </Button>
      </template>

      <div class="mt-8">
        <PropertyList />
      </div>
    </LoliView>

    <EmptyState v-else @add="showAddDialog = true" />
  </div>
</template>
