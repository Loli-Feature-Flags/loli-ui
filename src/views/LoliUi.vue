<script setup lang="ts">
import { useNavigation } from '@/stores/navigation/store'
import { LoliViewMap } from '@/views/map'
import LoliNavigation from '@/components/LoliNavigation.vue'
import { computed, provide, ref, watchEffect } from 'vue'
import { useWorkbench } from '@/stores/workbench/store'
import InitializeSpecView from '@/views/initializeSpec/InitializeSpecView.vue'
import { useConfig } from '@/stores/config/store'
import NoViewAccessibleView from '@/views/noViewAccessible/NoViewAccessibleView.vue'
import type { NavigationState } from '@/stores/navigation/NavigationState'

const config = useConfig()
const workbench = useWorkbench()
const navigation = useNavigation()

const loliUiRef = ref<HTMLDivElement | null>(null)
provide('loliuielement', loliUiRef)

const firstVisibleEditingView = computed(() => {
  return (Object.keys(LoliViewMap) as NavigationState['view'][]).find((view) =>
    config.isViewVisible(view)
  )
})

const someEditingViewVisible = computed<boolean>(() => !!firstVisibleEditingView.value)

// If the current view is hidden, switch to the first visible one.
watchEffect(() => {
  if (
    someEditingViewVisible.value &&
    config.isViewHidden(navigation.state.view) &&
    firstVisibleEditingView.value
  ) {
    navigation.replace({ view: firstVisibleEditingView.value })
  }
})
</script>

<template>
  <div class="p-4 rounded-md loli-ui text-gray-900 bg-white relative" ref="loliUiRef">
    <Transition name="view-fade" :duration="300">
      <div v-if="!workbench.isRawSpecPresent">
        <InitializeSpecView v-if="config.isViewVisible('initializeSpec')" />

        <NoViewAccessibleView v-else />
      </div>

      <div v-else>
        <template v-if="someEditingViewVisible">
          <LoliNavigation />

          <main class="pb-4 pt-8">
            <div class="relative">
              <Transition name="view-fade" :duration="300">
                <component :is="LoliViewMap[navigation.state.view]" />
              </Transition>
            </div>
          </main>
        </template>

        <NoViewAccessibleView v-else />
      </div>
    </Transition>
  </div>
</template>
