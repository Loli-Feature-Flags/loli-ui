import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { FeatureFlag } from '@loli-feature-flags/loli-sdk'
import { useNavigation } from './navigation/store'
import { useWorkbench } from './workbench/store'

export const useFeatureFlagEditor = defineStore('featureFlagEditor', () => {
  const workbench = useWorkbench()
  const navigation = useNavigation()

  const activeFeatureFlag = computed<FeatureFlag | null>(() => {
    const state = navigation.state

    if (state.view === 'featureFlags' && state.subview?.type === 'edit') {
      const featureFlagId = state.subview.featureFlagId

      return (
        workbench.spec.featureFlags.find((featureFlag) => featureFlag.id === featureFlagId) ?? null
      )
    }

    return null
  })

  const activeFeatureFlagIndex = computed(() => {
    if (!activeFeatureFlag.value) return -1
    return workbench.spec.featureFlags.indexOf(activeFeatureFlag.value)
  })

  function deleteActiveFeatureFlag() {
    const state = navigation.state

    if (activeFeatureFlag.value && activeFeatureFlagIndex.value >= 0) {
      if (
        state.view === 'featureFlags' &&
        state.subview?.type === 'edit' &&
        state.subview.featureFlagId === activeFeatureFlag.value.id
      ) {
        navigation.replace({ view: 'featureFlags' })
      }

      workbench.spec.featureFlags.splice(activeFeatureFlagIndex.value, 1)
    }
  }

  return {
    activeFeatureFlag,
    activeFeatureFlagIndex,
    deleteActiveFeatureFlag
  }
})
