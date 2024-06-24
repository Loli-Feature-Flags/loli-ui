<script setup lang="ts">
import type { SegmentCondition } from '@loli-feature-flags/loli-sdk'
import RectangleGroupIcon from '@/components/icons/RectangleGroupIcon.vue'
import SegmentSelect from '@/components/conditions/inputs/SegmentSelect.vue'
import SegmentConditionOperatorSelect from '@/components/conditions/inputs/SegmentConditionOperatorSelect.vue'
import ArrowTopRightOnSquare from '@/components/icons/ArrowTopRightOnSquare.vue'
import Button from '@/components/ui/Button.vue'
import { useNavigation } from '@/stores/navigation/store'

const navigation = useNavigation()

const segmentCondition = defineModel<SegmentCondition>({ required: true })

function openSegment() {
  navigation.push({
    view: 'segments',
    subview: {
      type: 'edit',
      segmentId: segmentCondition.value.segmentId
    }
  })
}
</script>

<template>
  <div class="w-full flex flex-row items-center gap-4">
    <RectangleGroupIcon class="icon-no-default size-4 mr-2" />

    <div class="flex flex-row items-center gap-2">
      <SegmentSelect v-model:segment-id="segmentCondition.segmentId" />

      <Button
        size="small"
        variant="flat"
        @click="openSegment"
        :title="$t('spec.segmentCondition.open')"
      >
        <ArrowTopRightOnSquare class="icon-no-default size-4" />
      </Button>
    </div>

    <SegmentConditionOperatorSelect v-model="segmentCondition.operator" />
  </div>
</template>
