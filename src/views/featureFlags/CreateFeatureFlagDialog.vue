<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  type FeatureFlag,
  FeatureFlagNameRegex,
  type FeatureFlagType,
  FeatureFlagTypes
} from '@loli-feature-flags/loli-sdk'
import { useNavigation } from '../../stores/navigation/store'
import { useWorkbench } from '../../stores/workbench/store'
import Select, { type SelectOption } from '../../components/ui/Select.vue'
import { useI18n } from 'vue-i18n'
import PlusIcon from '../../components/icons/PlusIcon.vue'
import ToggleIcon from '../../components/icons/ToggleIcon.vue'
import DefaultDialogTitle from '../../components/ui/DefaultDialogTitle.vue'
import Dialog from '../../components/ui/Dialog.vue'
import Form from '../../components/ui/Form.vue'
import Input from '../../components/ui/Input.vue'
import Button from '../../components/ui/Button.vue'
import Label from '../../components/ui/Label.vue'

const open = defineModel<boolean>('open', { default: false })

const navigation = useNavigation()
const workbench = useWorkbench()

const name = ref<string>('')
const type = ref<FeatureFlagType>('boolean')

const i18n = useI18n()

const typeOptions = computed<SelectOption<FeatureFlagType>[]>(() =>
  FeatureFlagTypes.map((type) => ({
    value: type,
    label: i18n.t(`spec.featureFlag.type.${type}`)
  }))
)

function addNewFeatureFlag() {
  const newFeatureFlag: FeatureFlag =
    type.value === 'boolean'
      ? {
          id: workbench.createNewSpecId(),
          type: 'boolean',
          name: name.value,
          description: '',
          targeting: {
            enabled: true,
            rules: []
          },
          defaultValue: false
        }
      : type.value === 'string'
        ? {
            id: workbench.createNewSpecId(),
            type: 'string',
            name: name.value,
            description: '',
            targeting: {
              enabled: true,
              rules: []
            },
            defaultValue: ''
          }
        : {
            id: workbench.createNewSpecId(),
            type: 'number',
            name: name.value,
            description: '',
            targeting: {
              enabled: true,
              rules: []
            },
            defaultValue: 0
          }

  workbench.spec.featureFlags.splice(workbench.spec.featureFlags.length + 1, 0, newFeatureFlag)

  name.value = ''
  type.value = 'boolean'

  navigation.replace({
    view: 'featureFlags',
    subview: {
      type: 'edit',
      featureFlagId: newFeatureFlag.id
    }
  })
}
</script>

<template>
  <Dialog v-model:open="open">
    <template #title>
      <DefaultDialogTitle>
        <ToggleIcon class="" />
        {{ $t('views.featureFlags.addDialog.title') }}
      </DefaultDialogTitle>
    </template>

    <Form @submit="addNewFeatureFlag" class="flex flex-col gap-4">
      <Label :title="$t('views.featureFlags.addDialog.name.label')">
        <Input
          v-model="name"
          :placeholder="$t('views.featureFlags.addDialog.name.placeholder')"
          type="text"
          autofocus
          required
          autocomplete="off"
          :validator="
            (value) => {
              return (
                FeatureFlagNameRegex.test(value) || $t('spec.featureFlag.validation.namePattern')
              )
            }
          "
        />
      </Label>

      <Label :title="$t('views.featureFlags.addDialog.type.label')">
        <Select
          v-model="type"
          required
          :options="typeOptions"
          :placeholder="$t('views.featureFlags.addDialog.type.placeholder')"
        />
      </Label>

      <Button variant="primary" type="submit" class="mt-4">
        <PlusIcon />
        {{ $t('views.featureFlags.addDialog.add') }}
      </Button>
    </Form>
  </Dialog>
</template>
