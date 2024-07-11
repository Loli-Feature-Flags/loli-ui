<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  countSegmentReferences,
  isSegmentReferenced,
  type Segment,
  SegmentNameRegex,
  SemanticIssueType
} from '@loli-feature-flags/loli-sdk'
import { useWorkbench } from '../../stores/workbench/store'
import type { IssuesCarryOn } from '../../utils/issues'
import TrashIcon from '../../components/icons/TrashIcon.vue'
import ConfirmDeleteDialog from '../../components/shared/ConfirmDeleteDialog.vue'
import ReferencesIndicator from '../../components/shared/indicators/ReferencesIndicator.vue'
import EmptySegmentIndicator from '../../components/shared/indicators/EmptySegmentIndicator.vue'
import StaleSegmentIndiciator from '../../components/shared/indicators/StaleSegmentIndiciator.vue'
import CyclicDependencyIndicator from '../../components/shared/validation/CyclicDependencyIndicator.vue'
import DuplicatedIdIndicator from '../../components/shared/validation/DuplicatedIdIndicator.vue'
import CheckIcon from '../../components/icons/CheckIcon.vue'
import XMarkIcon from '../../components/icons/XMarkIcon.vue'
import PencilSquareIcon from '../../components/icons/PencilSquareIcon.vue'
import RectangleGroupIcon from '../../components/icons/RectangleGroupIcon.vue'
import DefaultDialogTitle from '../../components/ui/DefaultDialogTitle.vue'
import Button from '../../components/ui/Button.vue'
import Input from '../../components/ui/Input.vue'
import Form from '../../components/ui/Form.vue'
import { isSegmentEmpty } from '../../utils/segments'

const workbench = useWorkbench()
const segment = defineModel<Segment>({ required: true })
defineProps<{ issuesCarryOn: IssuesCarryOn }>()
defineEmits(['delete'])

const editNameActive = ref(false)
const editName = ref('')

const isReferenced = computed<boolean>(() => isSegmentReferenced(segment.value.id, workbench.spec))

function startEditName() {
  if (segment.value) {
    editName.value = segment.value.name
    editNameActive.value = true
  }
}

function saveName() {
  if (segment.value) {
    segment.value.name = editName.value
    editNameActive.value = false
  }
}

function cancelEditName() {
  editNameActive.value = false
}
</script>

<template>
  <DefaultDialogTitle class="justify-between">
    <div class="flex flex-row items-center gap-10 text-primary-700 dark:text-gray-300">
      <RectangleGroupIcon />

      <span v-if="!editNameActive" class="flex flex-row items-center gap-3">
        <span class="font-mono">{{ segment.name }}</span>

        <Button
          @click="startEditName"
          size="small"
          variant="flat"
          :title="$t('views.segments.editDialog.editName.start')"
        >
          <PencilSquareIcon />
        </Button>
      </span>

      <Form v-else @submit="saveName" class="flex flex-row items-center gap-3">
        <Input
          v-model="editName"
          size="small"
          autofocus
          required
          :validator="
            (value) => {
              return SegmentNameRegex.test(value) || $t('spec.segment.validation.namePattern')
            }
          "
          validation-error-as-tooltip
        />

        <Button
          type="button"
          @click="cancelEditName"
          size="small"
          variant="flat"
          :title="$t('views.segments.editDialog.editName.cancel')"
        >
          <XMarkIcon />
        </Button>

        <Button
          type="submit"
          size="small"
          variant="flat"
          :title="$t('views.segments.editDialog.editName.save')"
        >
          <CheckIcon />
        </Button>
      </Form>
    </div>

    <div class="flex flex-row gap-4 items-center">
      <DuplicatedIdIndicator v-if="issuesCarryOn.hasIssueType(SemanticIssueType.DUPLICATED_ID)" />

      <CyclicDependencyIndicator
        v-if="
          issuesCarryOn.hasSomeIssueType(
            SemanticIssueType.CYCLIC_DEPENDENCIES_PRESENT,
            SemanticIssueType.PART_OF_CYCLIC_DEPENDENCY
          )
        "
        :issues-carry-on="issuesCarryOn"
      />

      <StaleSegmentIndiciator v-if="!isReferenced" />

      <EmptySegmentIndicator v-if="isSegmentEmpty(segment)" />

      <ReferencesIndicator :references="countSegmentReferences(segment.id, workbench.spec)" />

      <ConfirmDeleteDialog
        :title="$t('views.segments.editDialog.deleteDialog.title', { name: segment.name })"
        :description="
          $t('views.segments.editDialog.deleteDialog.description', { name: segment.name })
        "
        @delete="$emit('delete')"
      >
        <template #trigger>
          <Button
            :title="
              isReferenced
                ? $t('views.segments.editDialog.referencedDeleteDisabled')
                : $t('views.segments.editDialog.delete')
            "
            size="small"
            variant="flat"
            class="ml-6"
            :disabled="isReferenced"
          >
            <TrashIcon />
          </Button>
        </template>
      </ConfirmDeleteDialog>
    </div>
  </DefaultDialogTitle>
</template>
