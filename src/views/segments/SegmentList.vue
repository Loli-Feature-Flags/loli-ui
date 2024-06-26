<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWorkbench } from '../../stores/workbench/store'
import { useNavigation } from '../../stores/navigation/store'
import SegmentListEntry from './SegmentListEntry.vue'
import XMarkIcon from '../../components/icons/XMarkIcon.vue'
import Button from '../../components/ui/Button.vue'
import Input from '../../components/ui/Input.vue'
import { IssuesCarryOn } from '../../utils/issues'

const workbench = useWorkbench()
const navigation = useNavigation()

const search = ref<string>('')

const sortedSegments = computed(() =>
  [...workbench.spec.segments].sort((a, b) => a.name.localeCompare(b.name))
)

const filteredSegments = computed(() => {
  const searchTokens = search.value
    .trim()
    .toLowerCase()
    .split(' ')
    .filter((searchToken) => searchToken.length > 0)

  if (searchTokens.length === 0) return sortedSegments.value

  return sortedSegments.value.filter((segment) => {
    return searchTokens.some((searchToken) => segment.name.toLowerCase().includes(searchToken))
  })
})
</script>

<template>
  <div>
    <div class="flex flex-row gap-4 items-center mb-8">
      <Input
        :placeholder="$t('views.segments.searchPlaceholder')"
        v-model="search"
        class="max-w-[20em]"
      />

      <Button
        :disabled="search.length === 0"
        @click="search = ''"
        :title="$t('views.segments.clearSearch')"
      >
        <XMarkIcon />
      </Button>
    </div>

    <div class="list-grid" v-if="filteredSegments.length > 0">
      <SegmentListEntry
        v-for="(segment, index) of filteredSegments"
        :key="segment.id"
        v-model="filteredSegments[index]"
        :issues-carry-on="
          IssuesCarryOn.fromSemanticValidation(workbench.semanticValidation, [
            'segments',
            workbench.spec.segments.indexOf(segment)
          ])
        "
        @edit="
          navigation.push({
            view: 'segments',
            subview: { type: 'edit', segmentId: segment.id }
          })
        "
      />
    </div>

    <div v-else>
      {{ $t('views.segments.noEntriesFound') }}
    </div>
  </div>
</template>
