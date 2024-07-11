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
    <template #title-start> <ToggleIcon />{{ featureFlag.name }} </template>

    <template #title-end>
      <StaleFeatureFlagIndicator v-if="isFeatureFlagStale(featureFlag)" />
      <TargetingStatusIndicator :active="featureFlag.targeting.enabled" />
      <FeatureFlagTypeBadge :type="featureFlag.type" />
    </template>

    <template #bottom>
      <span>
        {{ $t('views.featureFlags.entries.fallbackPrefix') }}:
        {{ i18nFeatureFlagDefaultValue(featureFlag) }}
      </span>
    </template>
  </ListEntryCard>
</template>
