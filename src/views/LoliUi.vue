<script setup lang="ts">
import { computed, provide, ref, watchEffect } from 'vue'
import { useConfig } from '../stores/config/store'
import { useWorkbench } from '../stores/workbench/store'
import { useNavigation } from '../stores/navigation/store'
import { LoliViewMap } from './map'
import type { NavigationState } from '../stores/navigation/NavigationState'
import NoViewAccessibleView from './noViewAccessible/NoViewAccessibleView.vue'
import LoliNavigation from '../components/LoliNavigation.vue'
import InitializeSpecView from './initializeSpec/InitializeSpecView.vue'
import AnimateChangingContentHeight from '../components/ui/AnimateChangingContentHeight.vue'

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
  <div class="loli-ui bg-white relative text-gray-900 rounded-md" ref="loliUiRef">
    <AnimateChangingContentHeight>
      <div class="py-4 px-8">
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
    </AnimateChangingContentHeight>
  </div>
</template>
