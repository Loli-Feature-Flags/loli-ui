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

  function deleteActiveFeatureFlag() {
    const state = navigation.state

    if (!activeFeatureFlag.value) return

    const activeFeatureFlagIndex = workbench.spec.featureFlags.indexOf(activeFeatureFlag.value)

    if (activeFeatureFlagIndex < 0) return

    if (
      state.view === 'featureFlags' &&
      state.subview?.type === 'edit' &&
      state.subview.featureFlagId === activeFeatureFlag.value.id
    ) {
      navigation.replace({ view: 'featureFlags' })
    }

    workbench.spec.featureFlags.splice(activeFeatureFlagIndex, 1)
  }

  return {
    activeFeatureFlag,
    deleteActiveFeatureFlag
  }
})
