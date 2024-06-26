<script setup lang="ts">
import type { FeatureFlag } from '@loli-feature-flags/loli-sdk'
import FeatureFlagTypeBadge from '../../components/shared/FeatureFlagTypeBadge.vue'
import TargetingStatusIndicator from '../../components/shared/indicators/TargetingStatusIndicator.vue'
import StaleFeatureFlagIndicator from '../../components/shared/indicators/StaleFeatureFlagIndicator.vue'
import ToggleIcon from '../../components/icons/ToggleIcon.vue'
import ListEntryCard from '../../components/shared/ListEntryCard.vue'
import type { IssuesCarryOn } from '../../utils/issues'
import { i18nFeatureFlagDefaultValue, isFeatureFlagStale } from '../../utils/featureFlags'

defineProps<{
  featureFlag: FeatureFlag
  issuesCarryOn: IssuesCarryOn
}>()

defineEmits(['edit'])
</script>

<template>
  <ListEntryCard @click="$emit('edit')" :issues-carry-on="issuesCarryOn">
    <div class="flex flex-row items-center justify-between flex-wrap gap-4 mb-2">
      <span class="text-lg font-mono text-primary-700 flex flex-row items-center gap-4">
        <ToggleIcon />{{ featureFlag.name }}
      </span>

      <div class="flex flex-row gap-4 items-center">
        <StaleFeatureFlagIndicator v-if="isFeatureFlagStale(featureFlag)" />
        <TargetingStatusIndicator :active="featureFlag.targeting.enabled" />
        <FeatureFlagTypeBadge :type="featureFlag.type" />
      </div>
    </div>

    <div class="flex flex-col gap-0.5 items-start">
      <span class="text-xs text-gray-400">
        {{ $t('views.featureFlags.entries.fallbackPrefix') }}:
        {{ i18nFeatureFlagDefaultValue(featureFlag) }}
      </span>
    </div>
  </ListEntryCard>
</template>
