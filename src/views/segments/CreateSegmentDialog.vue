<script setup lang="ts">
import Dialog from '@/components/ui/Dialog.vue'
import DefaultDialogTitle from '@/components/ui/DefaultDialogTitle.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import Button from '@/components/ui/Button.vue'
import { useWorkbench } from '@/stores/workbench/store'
import { ref } from 'vue'
import Label from '@/components/ui/Label.vue'
import Input from '@/components/ui/Input.vue'
import { useNavigation } from '@/stores/navigation/store'
import { type Segment, SegmentNameRegex } from '@loli-feature-flags/loli-sdk-js'
import Form from '@/components/ui/Form.vue'

const workbench = useWorkbench()
const navigation = useNavigation()

const open = defineModel<boolean>('open', { required: true })

const name = ref('')

function addNewSegment() {
  const newSegment: Segment = {
    id: workbench.createNewSpecId(),
    name: name.value,
    conditionSet: {
      operator: 'and',
      conditions: []
    }
  }

  workbench.spec.segments.push(newSegment)

  name.value = ''

  navigation.replace({
    view: 'segments',
    subview: {
      type: 'edit',
      segmentId: newSegment.id
    }
  })
}
</script>

<template>
  <Dialog v-model:open="open">
    <template #title>
      <DefaultDialogTitle>
        {{ $t('views.segments.addDialog.title') }}
      </DefaultDialogTitle>
    </template>

    <Form @submit="addNewSegment" class="flex flex-col gap-4">
      <Label :title="$t('views.segments.addDialog.name.label')">
        <Input
          v-model="name"
          :placeholder="$t('views.segments.addDialog.name.placeholder')"
          type="text"
          required
          autocomplete="off"
          autofocus
          :validator="
            (value) => {
              return SegmentNameRegex.test(value) || $t('spec.segment.validation.namePattern')
            }
          "
        />
      </Label>

      <Button variant="primary" type="submit" class="mt-4">
        <PlusIcon />
        {{ $t('views.segments.addDialog.add') }}
      </Button>
    </Form>
  </Dialog>
</template>
