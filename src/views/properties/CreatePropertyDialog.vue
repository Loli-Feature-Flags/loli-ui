<script setup lang="ts">
import { computed, ref } from 'vue'
import { type Property, type PropertyType, PropertyTypes } from '@loli-feature-flags/loli-sdk'
import { useWorkbench } from '../../stores/workbench/store'
import Select, { type SelectOption } from '../../components/ui/Select.vue'
import { useI18n } from 'vue-i18n'
import PlusIcon from '../../components/icons/PlusIcon.vue'
import Switch from '../../components/ui/Switch.vue'
import Label from '../../components/ui/Label.vue'
import FingerprintIcon from '../../components/icons/FingerprintIcon.vue'
import DefaultDialogTitle from '../../components/ui/DefaultDialogTitle.vue'
import Form from '../../components/ui/Form.vue'
import Input from '../../components/ui/Input.vue'
import Dialog from '../../components/ui/Dialog.vue'
import Button from '../../components/ui/Button.vue'

const workbench = useWorkbench()

const open = defineModel<boolean>('open', { required: true })

const path = ref('')
const name = ref('')
const type = ref<PropertyType>('string')
const rolloutDiscriminator = ref(false)

const i18n = useI18n()

const typeOptions = computed<SelectOption<PropertyType>[]>(() =>
  PropertyTypes.map((propertyType) => ({
    value: propertyType,
    label: i18n.t(`spec.property.type.${propertyType}`)
  }))
)

function addNewProperty() {
  const newProperty: Property = {
    id: workbench.createNewSpecId(),
    path: path.value
      .split('.')
      .map((part) => part.trim())
      .filter((part) => part.length > 0),
    name: name.value,
    type: type.value,
    rolloutDiscriminator: rolloutDiscriminator.value
  }

  workbench.spec.evaluationContext.properties.splice(
    workbench.spec.evaluationContext.properties.length + 1,
    0,
    newProperty
  )

  path.value = ''
  name.value = ''
  rolloutDiscriminator.value = false

  open.value = false
}
</script>

<template>
  <Dialog v-model:open="open">
    <template #title>
      <DefaultDialogTitle>
        <FingerprintIcon />
        {{ $t('views.properties.addDialog.title') }}
      </DefaultDialogTitle>
    </template>

    <Form @submit="addNewProperty" class="flex flex-col gap-4">
      <Label :title="$t('views.properties.addDialog.name.label')">
        <Input
          v-model="name"
          :placeholder="$t('views.properties.addDialog.name.placeholder')"
          type="text"
          required
          autocomplete="off"
          autofocus
        />
      </Label>

      <Label :title="$t('views.properties.addDialog.path.label')">
        <Input
          v-model="path"
          :placeholder="$t('views.properties.addDialog.path.placeholder')"
          type="text"
          required
          autocomplete="off"
          :validator="
            (value) => {
              return (
                /^[^. \n]+(\.[^. \n]+)*$/.test(value) || $t('spec.property.validation.pathPattern')
              )
            }
          "
        />
      </Label>

      <Label :title="$t('views.properties.addDialog.type.label')">
        <Select v-model="type" required :options="typeOptions" />
      </Label>

      <Label
        :title="
          rolloutDiscriminator
            ? $t('views.properties.addDialog.rolloutDiscriminator.labelTrue')
            : $t('views.properties.addDialog.rolloutDiscriminator.labelFalse')
        "
        position="right"
        class="cursor-pointer"
      >
        <Switch v-model="rolloutDiscriminator" />
      </Label>

      <Button variant="primary" type="submit" class="mt-4">
        <PlusIcon />
        {{ $t('views.properties.addDialog.add') }}
      </Button>
    </Form>
  </Dialog>
</template>
