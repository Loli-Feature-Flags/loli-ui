<script setup lang="ts">
import FeatureFlagEditorSection from '@/views/featureFlags/editor/FeatureFlagEditorSection.vue'
import type { FeatureFlag } from '@loli-feature-flags/loli-sdk'
import { toRaw } from 'vue'
import Button from '@/components/ui/Button.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import RuleListEntry from '@/views/featureFlags/editor/rules/RuleListEntry.vue'
import VueDraggable from 'vuedraggable'
import Switch from '@/components/ui/Switch.vue'
import type { IssuesCarryOn } from '@/utils/issues'
import { DRAG_HANDLE_CLASS } from '@/constants'

const featureFlag = defineModel<FeatureFlag>({ required: true })
defineProps<{ issuesCarryOn: IssuesCarryOn }>()

function addRule() {
  if (featureFlag.value.type === 'boolean') {
    featureFlag.value.targeting.rules.push({
      enabled: true,
      conditionSet: {
        operator: 'and',
        conditions: []
      },
      valuesOnMatch: [
        {
          value: true,
          rolloutPercentage: 100
        }
      ]
    })
  } else if (featureFlag.value.type === 'string') {
    featureFlag.value.targeting.rules.push({
      enabled: true,
      conditionSet: {
        operator: 'and',
        conditions: []
      },
      valuesOnMatch: [{ value: '', rolloutPercentage: 100 }]
    })
  } else if (featureFlag.value.type === 'number') {
    featureFlag.value.targeting.rules.push({
      enabled: true,
      conditionSet: {
        operator: 'and',
        conditions: []
      },
      valuesOnMatch: [{ value: 0, rolloutPercentage: 100 }]
    })
  } else {
    alert(
      `Unsupported type "${(featureFlag.value as unknown as Record<string, unknown>).type}" for adding a rule.`
    )
  }
}

function deleteRule(index: number) {
  featureFlag.value.targeting.rules.splice(index, 1)
}

function duplicateRule(index: number) {
  if (featureFlag.value) {
    featureFlag.value.targeting.rules.push(
      // @ts-ignore
      structuredClone(toRaw(featureFlag.value).targeting.rules[index])
    )
  }
}
</script>

<template>
  <FeatureFlagEditorSection :title="$t('views.featureFlags.editor.targeting.title')">
    <template #title-end>
      <div class="flex flex-row items-center gap-6">
        <Switch
          v-model="featureFlag.targeting.enabled"
          :title="
            featureFlag.targeting.enabled
              ? $t('views.featureFlags.editor.targeting.switch.disable')
              : $t('views.featureFlags.editor.targeting.switch.enable')
          "
        />

        <Button @click="addRule" size="small">
          <PlusIcon />
          {{ $t('views.featureFlags.editor.targeting.add') }}
        </Button>
      </div>
    </template>

    <VueDraggable
      v-if="featureFlag.targeting.rules.length > 0"
      v-model="featureFlag.targeting.rules"
      class="flex flex-col gap-4"
      :handle="`.${DRAG_HANDLE_CLASS}`"
      ghostClass="dnd-ghost"
      :animation="250"
      :item-key="() => undefined"
    >
      <template #item="{ index }">
        <div>
          <RuleListEntry
            v-model="featureFlag"
            :rule-index="index"
            @delete="deleteRule(index)"
            @duplicate="duplicateRule(index)"
            :issues-carry-on="issuesCarryOn.createSub(['rules', index])"
          />
        </div>
      </template>
    </VueDraggable>

    <div v-else class="text-gray-500 text-sm">
      {{ $t('views.featureFlags.editor.targeting.noRules') }}
    </div>
  </FeatureFlagEditorSection>
</template>
