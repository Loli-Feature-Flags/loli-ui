<script setup lang="ts">
import {
  type FeatureFlag,
  FeatureFlagNameRegex,
  SemanticIssueType
} from '@loli-feature-flags/loli-sdk'
import { ref, watch } from 'vue'
import type { IssuesCarryOn } from '../../../utils/issues'
import { copyToClipboard } from '../../../utils/clipboard'
import TrashIcon from '../../../components/icons/TrashIcon.vue'
import ConfirmDeleteDialog from '../../../components/shared/ConfirmDeleteDialog.vue'
import FeatureFlagTypeBadge from '../../../components/shared/FeatureFlagTypeBadge.vue'
import TargetingStatusIndicator from '../../../components/shared/indicators/TargetingStatusIndicator.vue'
import StaleFeatureFlagIndicator from '../../../components/shared/indicators/StaleFeatureFlagIndicator.vue'
import CyclicDependencyIndicator from '../../../components/shared/validation/CyclicDependencyIndicator.vue'
import DuplicatedIdIndicator from '../../../components/shared/validation/DuplicatedIdIndicator.vue'
import CheckIcon from '../../../components/icons/CheckIcon.vue'
import XMarkIcon from '../../../components/icons/XMarkIcon.vue'
import DuplicatedFeatureFlagNameIndicator from '../../../components/shared/validation/DuplicatedFeatureFlagNameIndicator.vue'
import ClipboardIcon from '../../../components/icons/ClipboardIcon.vue'
import PencilSquareIcon from '../../../components/icons/PencilSquareIcon.vue'
import ToggleIcon from '../../../components/icons/ToggleIcon.vue'
import DefaultDialogTitle from '../../../components/ui/DefaultDialogTitle.vue'
import Button from '../../../components/ui/Button.vue'
import Input from '../../../components/ui/Input.vue'
import Form from '../../../components/ui/Form.vue'
import { isFeatureFlagStale } from '../../../utils/featureFlags'

const featureFlag = defineModel<FeatureFlag>({ required: true })
defineProps<{ issuesCarryOn: IssuesCarryOn }>()
defineEmits(['delete'])

const editNameActive = ref(false)
const editName = ref('')

function startEditName() {
  if (featureFlag.value) {
    editName.value = featureFlag.value.name
    editNameActive.value = true
  }
}

function saveName() {
  if (featureFlag.value) {
    featureFlag.value.name = editName.value
    editNameActive.value = false
  }
}

function cancelEditName() {
  editNameActive.value = false
}

function copyNameToClipboard() {
  copyToClipboard(featureFlag.value.name).then(() => {
    successFullyCopied.value = true
  })
}

const successFullyCopied = ref(false)

watch(successFullyCopied, (value) => {
  if (value) {
    setTimeout(() => {
      successFullyCopied.value = false
    }, 1000)
  }
})
</script>

<template>
  <DefaultDialogTitle class="justify-between">
    <div class="flex flex-row items-center gap-10 text-primary-700 dark:text-gray-300">
      <ToggleIcon />

      <span v-if="!editNameActive" class="flex flex-row items-center gap-3">
        <span class="font-mono">{{ featureFlag.name }}</span>

        <Button
          @click="startEditName"
          size="small"
          variant="flat"
          :title="$t('views.featureFlags.editor.editName.start')"
        >
          <PencilSquareIcon />
        </Button>

        <Button
          @click="copyNameToClipboard"
          size="small"
          variant="flat"
          :title="
            successFullyCopied
              ? $t('views.featureFlags.editor.copyNameSuccess')
              : $t('views.featureFlags.editor.copyName')
          "
        >
          <CheckIcon v-if="successFullyCopied" />
          <ClipboardIcon v-else />
        </Button>

        <DuplicatedFeatureFlagNameIndicator
          v-if="issuesCarryOn.hasIssueType(SemanticIssueType.DUPLICATED_FEATURE_FLAG_NAME)"
        />
      </span>

      <Form v-else @submit="saveName" class="flex flex-row items-center gap-3">
        <Input
          v-model="editName"
          size="small"
          autofocus
          required
          :validator="
            (value) => {
              return (
                FeatureFlagNameRegex.test(value) || $t('spec.featureFlag.validation.namePattern')
              )
            }
          "
          validation-error-as-tooltip
        />

        <Button
          type="button"
          @click="cancelEditName"
          size="small"
          variant="flat"
          :title="$t('views.featureFlags.editor.editName.cancel')"
        >
          <XMarkIcon />
        </Button>

        <Button
          type="submit"
          size="small"
          variant="flat"
          :title="$t('views.featureFlags.editor.editName.save')"
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

      <StaleFeatureFlagIndicator v-if="isFeatureFlagStale(featureFlag)" />

      <TargetingStatusIndicator :active="featureFlag.targeting.enabled" />

      <FeatureFlagTypeBadge :type="featureFlag.type" />

      <ConfirmDeleteDialog
        :title="$t('views.featureFlags.editor.deleteDialog.title', { name: featureFlag.name })"
        :description="
          $t('views.featureFlags.editor.deleteDialog.description', { name: featureFlag.name })
        "
        @delete="$emit('delete')"
      >
        <template #trigger>
          <Button
            :title="$t('views.featureFlags.editor.delete')"
            size="small"
            variant="flat"
            class="ml-6"
          >
            <TrashIcon />
          </Button>
        </template>
      </ConfirmDeleteDialog>
    </div>
  </DefaultDialogTitle>
</template>
