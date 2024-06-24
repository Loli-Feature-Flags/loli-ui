<script setup lang="ts">
import Label from '@/components/ui/Label.vue'
import Select, { type SelectOption } from '@/components/ui/Select.vue'
import Dialog from '@/components/ui/Dialog.vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import { computed, ref, watch } from 'vue'
import {
  countPropertyReferences,
  isPropertyReferenced,
  type Property,
  type PropertyType,
  PropertyTypes,
  SemanticIssueType
} from '@loli-feature-flags/loli-sdk'
import { i18n } from '@/i18n'
import XMarkIcon from '@/components/icons/XMarkIcon.vue'
import SaveIcon from '@/components/icons/SaveIcon.vue'
import DefaultDialogTitle from '@/components/ui/DefaultDialogTitle.vue'
import FingerprintIcon from '@/components/icons/FingerprintIcon.vue'
import ConfirmDeleteDialog from '@/components/shared/ConfirmDeleteDialog.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import { useWorkbench } from '@/stores/workbench/store'
import StalePropertyIndicator from '@/components/shared/indicators/StalePropertyIndicator.vue'
import Switch from '@/components/ui/Switch.vue'
import ReferencesIndicator from '@/components/shared/indicators/ReferencesIndicator.vue'
import type { IssuesCarryOn } from '@/utils/issues'
import CyclicDependencyIndicator from '@/components/shared/validation/CyclicDependencyIndicator.vue'
import DuplicatedIdIndicator from '@/components/shared/validation/DuplicatedIdIndicator.vue'
import DuplicatedPropertyPathIndicator from '@/components/shared/validation/DuplicatedPropertyPathIndicator.vue'
import Form from '@/components/ui/Form.vue'

const workbench = useWorkbench()

const property = defineModel<Property | null>()
const open = defineModel<boolean>('open', { required: true })
defineProps<{ issuesCarryOn: IssuesCarryOn }>()
const emit = defineEmits(['delete'])

const isReferenced = computed(
  () => !!property.value && isPropertyReferenced(property.value.id, workbench.spec)
)

const path = ref('')
const name = ref('')
const rolloutDiscriminator = ref(true)

const typeOptions: SelectOption<PropertyType>[] = PropertyTypes.map((propertyType) => ({
  value: propertyType,
  label: i18n.global.t(`spec.property.type.${propertyType}`)
}))

watch(open, (open) => {
  if (open && property.value) {
    path.value = property.value.path.join('.')
    name.value = property.value.name
    rolloutDiscriminator.value = property.value.rolloutDiscriminator
  }
})

function close() {
  open.value = false
}

function saveChanges() {
  if (property.value) {
    property.value.path = path.value
      .split('.')
      .map((part) => part.trim())
      .filter((part) => part.length > 0)

    property.value.name = name.value
    property.value.rolloutDiscriminator = rolloutDiscriminator.value
  }

  open.value = false
}

function deleteProperty() {
  emit('delete')
}
</script>

<template>
  <Dialog v-model:open="open" :error="issuesCarryOn.isInvalid()">
    <template #title>
      <DefaultDialogTitle class="justify-between" v-if="property">
        <div class="flex flex-row items-center gap-4">
          <FingerprintIcon />
          {{ $t('views.properties.editDialog.title') }}
        </div>

        <div class="flex flex-row items-center gap-4">
          <DuplicatedIdIndicator
            v-if="issuesCarryOn.hasIssueType(SemanticIssueType.DUPLICATED_ID)"
          />

          <CyclicDependencyIndicator
            v-if="
              issuesCarryOn.hasSomeIssueType(
                SemanticIssueType.CYCLIC_DEPENDENCIES_PRESENT,
                SemanticIssueType.PART_OF_CYCLIC_DEPENDENCY
              )
            "
            :issues-carry-on="issuesCarryOn"
          />

          <StalePropertyIndicator v-if="!isReferenced" />

          <ReferencesIndicator :references="countPropertyReferences(property.id, workbench.spec)" />

          <ConfirmDeleteDialog
            :title="$t('views.properties.deleteDialog.title', { name: property.name })"
            :description="$t('views.properties.deleteDialog.description', { name: property.name })"
            @delete="deleteProperty"
          >
            <template #trigger>
              <Button
                size="small"
                variant="flat"
                :title="
                  isReferenced
                    ? $t('views.properties.editDialog.referencedDeleteDisabled')
                    : $t('views.properties.editDialog.delete')
                "
                :disabled="isReferenced"
              >
                <TrashIcon />
              </Button>
            </template>
          </ConfirmDeleteDialog>
        </div>
      </DefaultDialogTitle>
    </template>

    <Form @submit="saveChanges" class="flex flex-col gap-4" v-if="property">
      <Label :title="$t('views.properties.editDialog.name.label')">
        <Input
          v-model="name"
          :placeholder="$t('views.properties.editDialog.name.placeholder')"
          type="text"
          required
          autocomplete="off"
          autofocus
        />
      </Label>

      <Label :title="$t('views.properties.editDialog.path.label')">
        <div class="grid grid-cols-[1fr,auto] items-center gap-4">
          <Input
            v-model="path"
            :placeholder="$t('views.properties.editDialog.path.placeholder')"
            type="text"
            required
            autocomplete="off"
            class="flex-grow"
          />

          <DuplicatedPropertyPathIndicator
            v-if="issuesCarryOn.hasIssueType(SemanticIssueType.DUPLICATED_PROPERTY_PATH)"
          />
        </div>
      </Label>

      <Label :title="$t('views.properties.addDialog.type.label')">
        <Select :model-value="property.type" required :options="typeOptions" disabled />
      </Label>

      <Label
        :title="
          rolloutDiscriminator
            ? $t('views.properties.editDialog.rolloutDiscriminator.labelTrue')
            : $t('views.properties.editDialog.rolloutDiscriminator.labelFalse')
        "
        position="right"
        class="cursor-pointer"
      >
        <Switch v-model="rolloutDiscriminator" />
      </Label>

      <div class="mt-4 grid grid-cols-2 gap-4">
        <Button @click="close" type="button">
          <XMarkIcon />
          {{ $t('views.properties.editDialog.cancel') }}
        </Button>

        <Button variant="primary" type="submit">
          <SaveIcon />
          {{ $t('views.properties.editDialog.save') }}
        </Button>
      </div>
    </Form>
  </Dialog>
</template>
