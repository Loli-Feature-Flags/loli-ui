<script setup lang="ts">
import { useWorkbench } from '@/stores/workbench/store'
import { computed } from 'vue'
import Select, { type SelectOption } from '@/components/ui/Select.vue'
import { injectRootSegment } from '@/utils/segments'

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
