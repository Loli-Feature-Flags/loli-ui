<script setup lang="ts">
import TrashIcon from '@/components/icons/TrashIcon.vue'
import DocumentDuplicateIcon from '@/components/icons/DocumentDuplicateIcon.vue'
import { type FeatureFlag } from '@loli-feature-flags/loli-sdk'
import RuleListEntryValues from '@/views/featureFlags/editor/rules/RuleListEntryValues.vue'
import ConditionSet from '@/components/conditions/ConditionSet.vue'
import Button from '@/components/ui/Button.vue'
import ConfirmDeleteDialog from '@/components/shared/ConfirmDeleteDialog.vue'
import useConditionSetNestedColoring from '@/hooks/useConditionSetNestedColoring'
import type { IssuesCarryOn } from '@/utils/issues'
import DragHandle from '@/components/shared/DragHandle.vue'
import Switch from '@/components/ui/Switch.vue'
import { computed } from 'vue'

const featureFlag = defineModel<FeatureFlag>({ required: true })
const props = defineProps<{ ruleIndex: number; issuesCarryOn: IssuesCarryOn }>()
defineEmits(['delete', 'duplicate'])

const { ringClasses, hoverBorderColor, hoverRingColor } = useConditionSetNestedColoring()

const enabled = computed({
  get() {
    return featureFlag.value.targeting.rules[props.ruleIndex].enabled
  },
  set(newValue) {
    featureFlag.value.targeting.rules[props.ruleIndex].enabled = newValue
  }
})
</script>

<template>
  <div
    :class="[
      'transition rounded-md border border-gray-300 p-4 bg-white',
      { 'opacity-50': !enabled },
      ringClasses,
      hoverBorderColor,
      hoverRingColor
    ]"
  >
    <div class="mb-6">
      <div class="flex flex-row justify-between gap-8 mb-3">
        <div class="text-lg">
          {{ $t('views.featureFlags.editor.targeting.rules.conditions') }}
        </div>

        <div class="flex flex-row gap-4 items-center">
          <Switch
            v-model="enabled"
            size="slim"
            :title="
              $t(
                `views.featureFlags.editor.targeting.rules.switch.${enabled ? 'disable' : 'enable'}`
              )
            "
          />

          <ConfirmDeleteDialog
            :title="$t('views.featureFlags.editor.targeting.rules.deleteDialog.title')"
            :description="$t('views.featureFlags.editor.targeting.rules.deleteDialog.description')"
            @delete="$emit('delete')"
          >
            <template #trigger>
              <Button :title="$t('views.featureFlags.editor.targeting.rules.delete')" size="small">
                <TrashIcon />
              </Button>
            </template>
          </ConfirmDeleteDialog>

          <Button
            @click="$emit('duplicate')"
            :title="$t('views.featureFlags.editor.targeting.rules.duplicate')"
            size="small"
          >
            <DocumentDuplicateIcon />
          </Button>

          <DragHandle />
        </div>
      </div>

      <ConditionSet
        v-model="featureFlag.targeting.rules[props.ruleIndex].conditionSet"
        flat
        :issues-carry-on="issuesCarryOn.createSub(['conditionSet'])"
      />
    </div>

    <RuleListEntryValues
      :rule-index="props.ruleIndex"
      v-model:feature-flag="featureFlag"
      :issues-carry-on="issuesCarryOn.createSub(['valuesOnMatch'])"
    />
  </div>
</template>
