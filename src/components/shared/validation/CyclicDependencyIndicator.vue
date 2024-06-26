<script setup lang="ts">
import { SemanticIssueType } from '@loli-feature-flags/loli-sdk'
import type { IssuesCarryOn } from '../../../utils/issues'
import ArrowPathIcon from '../../icons/ArrowPathIcon.vue'
import ErrorIndicator from './ErrorIndicator.vue'

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
