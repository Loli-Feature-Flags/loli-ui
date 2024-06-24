<script setup lang="ts">
import PlusIcon from '@/components/icons/PlusIcon.vue'
import RolloutPercentageInput from '@/views/featureFlags/editor/values/RolloutPercentageInput.vue'
import VueDraggable from 'vuedraggable'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import StringValueInput from '@/views/featureFlags/editor/values/StringValueInput.vue'
import { computed } from 'vue'
import { type FeatureFlag, SemanticIssueType } from '@loli-feature-flags/loli-sdk'
import BooleanValueSelect from '@/views/featureFlags/editor/values/BooleanValueSelect.vue'
import NumberValueInput from '@/views/featureFlags/editor/values/NumberValueInput.vue'
import Button from '@/components/ui/Button.vue'
import ConfirmDeleteDialog from '@/components/shared/ConfirmDeleteDialog.vue'
import { useWorkbench } from '@/stores/workbench/store'
import NoRolloutDiscriminatorPropertiesIndicator from '@/components/shared/indicators/NoRolloutDiscriminatorPropertiesIndicator.vue'
import type { IssuesCarryOn } from '@/utils/issues'
import RolloutPercentagesNotOneHundredIndicator from '@/components/shared/validation/RolloutPercentagesNotOneHundredIndicator.vue'
import DragHandle from '@/components/shared/DragHandle.vue'
import { DRAG_HANDLE_CLASS } from '@/constants'
import NoValuesOnMatchIndicator from '@/components/shared/validation/NoValuesOnMatchIndicator.vue'

const workbench = useWorkbench()

const featureFlag = defineModel<FeatureFlag>('featureFlag', { required: true })
const props = defineProps<{ ruleIndex: number; issuesCarryOn: IssuesCarryOn }>()

const deleteEnabled = computed(
  () => featureFlag.value.targeting.rules[props.ruleIndex].valuesOnMatch.length > 1
)

function addValue() {
  const allocatedPercentage = featureFlag.value.targeting.rules[props.ruleIndex].valuesOnMatch
    .map((value) => value.rolloutPercentage)
    .reduce((acc, cur) => acc + cur, 0)

  const rolloutPercentage = Math.max(100 - allocatedPercentage, 0)

  if (featureFlag.value.type === 'boolean') {
    featureFlag.value.targeting.rules[props.ruleIndex].valuesOnMatch.push({
      value: !featureFlag.value.targeting.rules[props.ruleIndex].valuesOnMatch.some(
        (valueOnMatch) => valueOnMatch.value
      ),
      rolloutPercentage
    })
  } else if (featureFlag.value.type === 'string') {
    featureFlag.value.targeting.rules[props.ruleIndex].valuesOnMatch.push({
      value: '',
      rolloutPercentage
    })
  } else if (featureFlag.value.type === 'number') {
    featureFlag.value.targeting.rules[props.ruleIndex].valuesOnMatch.push({
      value: 0,
      rolloutPercentage
    })
  } else {
    alert('Not implemented.')
  }
}

function removeValue(index: number) {
  featureFlag.value.targeting.rules[props.ruleIndex].valuesOnMatch.splice(index, 1)

  if (featureFlag.value.targeting.rules[props.ruleIndex].valuesOnMatch.length === 1) {
    featureFlag.value.targeting.rules[props.ruleIndex].valuesOnMatch[0].rolloutPercentage = 100
  }
}

const existRolloutDiscriminatorProperties = computed<boolean>(() =>
  workbench.spec.evaluationContext.properties.some((property) => property.rolloutDiscriminator)
)

const showMissingRolloutDiscriminatorPropertiesWarning = computed<boolean>(() => {
  return (
    !existRolloutDiscriminatorProperties.value &&
    (featureFlag.value.targeting.rules[props.ruleIndex].valuesOnMatch.length > 1 ||
      featureFlag.value.targeting.rules[props.ruleIndex].valuesOnMatch.some(
        (valueOnMatch) => valueOnMatch.rolloutPercentage < 100
      ))
  )
})
</script>

<template>
  <div>
    <div class="flex flex-row gap-8 justify-between items-center mb-3">
      <div class="text-lg flex flex-row gap-4 items-center">
        {{ $t('views.featureFlags.editor.targeting.rules.values.title') }}

        <RolloutPercentagesNotOneHundredIndicator
          v-if="
            issuesCarryOn.hasIssueType(SemanticIssueType.ROLLOUT_PERCENTAGE_SUM_NOT_ONE_HUNDRED)
          "
        />

        <NoValuesOnMatchIndicator
          v-if="issuesCarryOn.hasIssueType(SemanticIssueType.NO_VALUES_ON_MATCH)"
        />

        <NoRolloutDiscriminatorPropertiesIndicator
          v-if="showMissingRolloutDiscriminatorPropertiesWarning"
        />
      </div>

      <Button @click="addValue" size="small">
        <PlusIcon />
        {{ $t('views.featureFlags.editor.targeting.rules.values.add') }}
      </Button>
    </div>

    <VueDraggable
      v-if="featureFlag.targeting.rules[props.ruleIndex].valuesOnMatch.length > 0"
      v-model="featureFlag.targeting.rules[props.ruleIndex].valuesOnMatch"
      :item-key="() => undefined"
      :handle="`.${DRAG_HANDLE_CLASS}`"
      ghostClass="dnd-ghost"
      class="flex flex-col gap-4"
      :animation="250"
    >
      <template #item="{ index }">
        <div>
          <div class="flex flex-row gap-4 items-center">
            <div class="flex-grow">
              <BooleanValueSelect
                v-if="featureFlag.type === 'boolean'"
                v-model="featureFlag.targeting.rules[props.ruleIndex].valuesOnMatch[index].value"
                small
              />

              <StringValueInput
                v-else-if="featureFlag.type === 'string'"
                v-model="featureFlag.targeting.rules[props.ruleIndex].valuesOnMatch[index].value"
                :placeholder="
                  $t('views.featureFlags.editor.targeting.rules.values.stringPlaceholder')
                "
                small
              />

              <NumberValueInput
                v-else-if="featureFlag.type === 'number'"
                v-model="featureFlag.targeting.rules[props.ruleIndex].valuesOnMatch[index].value"
                small
              />

              <div v-else>
                No rule values implementation for feature flag type {{ featureFlag['type'] }}.
              </div>
            </div>

            <div class="flex flex-row gap-4 items-center">
              <ConfirmDeleteDialog
                :title="$t('views.featureFlags.editor.targeting.rules.values.confirmDelete.title')"
                :description="
                  $t('views.featureFlags.editor.targeting.rules.values.confirmDelete.description')
                "
                @delete="removeValue(index)"
              >
                <template #trigger>
                  <Button
                    size="small"
                    :disabled="!deleteEnabled"
                    :title="
                      $t(
                        deleteEnabled
                          ? 'views.featureFlags.editor.targeting.rules.values.deleteValue'
                          : 'views.featureFlags.editor.targeting.rules.values.deleteValueDisabled'
                      )
                    "
                  >
                    <TrashIcon />
                  </Button>
                </template>
              </ConfirmDeleteDialog>

              <DragHandle />
            </div>
          </div>

          <div class="pl-1 mt-2">
            <RolloutPercentageInput
              v-model="
                featureFlag.targeting.rules[props.ruleIndex].valuesOnMatch[index].rolloutPercentage
              "
            />
          </div>
        </div>
      </template>
    </VueDraggable>

    <div v-else class="text-darkish">ERROR: No values. Should never happen.</div>
  </div>
</template>
