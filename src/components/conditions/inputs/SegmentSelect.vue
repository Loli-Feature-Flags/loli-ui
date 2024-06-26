<script setup lang="ts">
import { computed } from 'vue'
import { useWorkbench } from '../../../stores/workbench/store'
import { injectRootSegment } from '../../../utils/segments'
import Select, { type SelectOption } from '../../ui/Select.vue'

const workbench = useWorkbench()
const segmentId = defineModel<string>('segmentId', { required: true })

const rootSegment = injectRootSegment()

const options = computed<SelectOption[]>(() => {
  const root = rootSegment?.value
  const filteredSegments = root
    ? workbench.spec.segments.filter((segment) => segment.id !== root.id)
    : workbench.spec.segments

  return filteredSegments.map((segment) => ({
    value: segment.id,
    label: segment.name
  }))
})
</script>

<template>
  <Select v-model="segmentId" :options="options" size="small" fit />
</template>
