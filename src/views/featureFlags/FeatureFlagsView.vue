<script setup lang="ts">
import { computed, toRefs, watchEffect } from 'vue'
import { useWorkbench } from '../../stores/workbench/store'
import { useNavigation } from '../../stores/navigation/store'
import { useFeatureFlagEditor } from '../../stores/featureFlagEditor'
import { IssuesCarryOn } from '../../utils/issues'
import EmptyState from './EmptyState.vue'
import FeatureFlagList from './FeatureFlagList.vue'
import PlusIcon from '../../components/icons/PlusIcon.vue'
import LoliView from '../../components/LoliView.vue'
import CreateFeatureFlagDialog from './CreateFeatureFlagDialog.vue'
import FeatureFlagEditorDialog from './editor/FeatureFlagEditorDialog.vue'
import Button from '../../components/ui/Button.vue'

const workbench = useWorkbench()
const navigation = useNavigation()
const featureFlagEditor = useFeatureFlagEditor()
const { spec } = toRefs(workbench)

const showAddDialog = computed<boolean>({
  get() {
    return navigation.state.view === 'featureFlags' && navigation.state.subview?.type === 'add'
  },
  set(newOpen) {
    if (newOpen) {
      navigation.push({ view: 'featureFlags', subview: { type: 'add' } })
    } else {
      navigation.push({ view: 'featureFlags' })
    }
  }
})

const showEditDialog = computed<boolean>({
  get() {
    return navigation.state.view === 'featureFlags' && navigation.state.subview?.type === 'edit'
  },
  set(newOpen: boolean) {
    if (!newOpen) {
      navigation.push({ view: 'featureFlags' })
    }
  }
})

// Replace navigations state in case the editor shall be shown
// for a deleted/non-existing feature flag.
watchEffect(() => {
  if (
    navigation.state.view === 'featureFlags' &&
    navigation.state.subview?.type === 'edit' &&
    !featureFlagEditor.activeFeatureFlag
  ) {
    navigation.replace({ view: 'featureFlags' })
  }
})

const issuesCarryOn = computed<IssuesCarryOn>(() => {
  if (!featureFlagEditor.activeFeatureFlag) {
    return IssuesCarryOn.createEmpty()
  }

  return IssuesCarryOn.fromSemanticValidation(workbench.semanticValidation, [
    'featureFlags',
    workbench.spec.featureFlags.indexOf(featureFlagEditor.activeFeatureFlag)
  ])
})
</script>

<template>
  <div>
    <FeatureFlagEditorDialog
      v-model="featureFlagEditor.activeFeatureFlag"
      v-model:open="showEditDialog"
      @delete="featureFlagEditor.deleteActiveFeatureFlag"
      :issues-carry-on="issuesCarryOn"
    />

    <CreateFeatureFlagDialog v-model:open="showAddDialog" />

    <LoliView v-if="spec.featureFlags.length > 0" :title="$t('views.featureFlags.title')">
      <template #head-end>
        <Button @click="showAddDialog = true">
          <PlusIcon />
          {{ $t('views.featureFlags.add') }}
        </Button>
      </template>

      <div class="mt-8">
        <FeatureFlagList />
      </div>
    </LoliView>

    <EmptyState v-else @add="showAddDialog = true" />
  </div>
</template>
