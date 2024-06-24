<script setup lang="ts">
import type { ConditionSetCondition } from '@loli-feature-flags/loli-sdk'
import ConditionSet from '@/components/conditions/ConditionSet.vue'
import type { IssuesCarryOn } from '@/utils/issues'

const conditionSetConditionModel = defineModel<ConditionSetCondition>({ required: true })
defineProps<{ issuesCarryOn: IssuesCarryOn }>()
</script>

<template>
  <ConditionSet
    v-model="conditionSetConditionModel.conditionSet"
    flat
    :issues-carry-on="issuesCarryOn"
  />
</template>
