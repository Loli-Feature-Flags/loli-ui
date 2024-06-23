<script setup lang="ts">
import LoliView from '@/components/LoliView.vue'
import { useWorkbench } from '@/stores/workbench/store'
import EmptyState from '@/views/segments/EmptyState.vue'
import { useNavigation } from '@/stores/navigation/store'
import { computed, watchEffect } from 'vue'
import type { Segment } from '@loli-feature-flags/loli-sdk-js'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import Button from '@/components/ui/Button.vue'
import CreateSegmentDialog from '@/views/segments/CreateSegmentDialog.vue'
import SegmentList from '@/views/segments/SegmentList.vue'
import EditSegmentDialog from '@/views/segments/EditSegmentDialog.vue'
import { IssuesCarryOn } from '@/utils/issues'

const workbench = useWorkbench()
const navigation = useNavigation()

const showAddDialog = computed<boolean>({
  get() {
    return navigation.state.view === 'segments' && navigation.state.subview?.type === 'add'
  },
  set(newOpen) {
    if (newOpen) {
      navigation.push({ view: 'segments', subview: { type: 'add' } })
    } else {
      navigation.push({ view: 'segments' })
    }
  }
})

const showEditDialog = computed<boolean>({
  get() {
    return navigation.state.view === 'segments' && navigation.state.subview?.type === 'edit'
  },
  set(newOpen) {
    if (!newOpen) {
      navigation.push({ view: 'segments' })
    }
  }
})

const segmentToEdit = computed<Segment | null>(() => {
  if (navigation.state.view === 'segments' && navigation.state.subview?.type === 'edit') {
    const segmentToEditId = navigation.state.subview.segmentId

    return workbench.spec.segments.find((segment) => segment.id === segmentToEditId) ?? null
  }

  return null
})

watchEffect(() => {
  if (showEditDialog.value && !segmentToEdit.value) {
    navigation.replace({ view: 'segments' })
  }
})

function deleteSegmentToEdit() {
  if (segmentToEdit.value) {
    const segmentIndex = workbench.spec.segments.indexOf(segmentToEdit.value)

    navigation.replace({ view: 'segments' })

    workbench.spec.segments.splice(segmentIndex, 1)
  }
}

const issuesCarryOn = computed<IssuesCarryOn>(() => {
  if (!segmentToEdit.value) {
    return IssuesCarryOn.createEmpty()
  }

  return IssuesCarryOn.fromSemanticValidation(workbench.semanticValidation, [
    'segments',
    workbench.spec.segments.indexOf(segmentToEdit.value)
  ])
})
</script>

<template>
  <div>
    <CreateSegmentDialog v-model:open="showAddDialog" />

    <EditSegmentDialog
      v-model="segmentToEdit"
      v-model:open="showEditDialog"
      @delete="deleteSegmentToEdit"
      :issues-carry-on="issuesCarryOn"
    />

    <LoliView v-if="workbench.spec.segments.length > 0" :title="$t('views.segments.title')">
      <template #head-end>
        <Button @click="showAddDialog = true">
          <PlusIcon />
          {{ $t('views.segments.add') }}
        </Button>
      </template>

      <div class="mt-8">
        <SegmentList />
      </div>
    </LoliView>

    <EmptyState v-else @add="showAddDialog = true" />
  </div>
</template>
