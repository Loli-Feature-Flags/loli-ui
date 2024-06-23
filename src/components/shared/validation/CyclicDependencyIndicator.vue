<script setup lang="ts">
import ArrowPathIcon from '@/components/icons/ArrowPathIcon.vue'
import type { IssuesCarryOn } from '@/utils/issues'
import { SemanticIssueType } from '@loli-feature-flags/loli-sdk-js'
import ErrorIndicator from '@/components/shared/validation/ErrorIndicator.vue'

defineProps<{ issuesCarryOn: IssuesCarryOn }>()
</script>

<template>
  <ErrorIndicator>
    <template #triggerContent>
      <ArrowPathIcon class="icon-no-default size-5" />
    </template>

    <template #tooltipContent>
      {{
        $t(
          issuesCarryOn.hasIssueType(SemanticIssueType.PART_OF_CYCLIC_DEPENDENCY)
            ? 'shared.validation.cyclicDependencyIndicator.partOfCyclicDependency'
            : 'shared.validation.cyclicDependencyIndicator.hasCyclicDependency'
        )
      }}
    </template>
  </ErrorIndicator>
</template>
