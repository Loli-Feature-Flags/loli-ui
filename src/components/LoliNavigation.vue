<script setup lang="ts">
import { toRefs, watchEffect } from 'vue'
import { useConfig } from '../stores/config/store'
import { useNavigation } from '../stores/navigation/store'
import { useWorkbench } from '../stores/workbench/store'
import LoliNavigationButton from './LoliNavigationButton.vue'
import CodeBracketIcon from './icons/CodeBracketIcon.vue'
import FingerprintIcon from './icons/FingerprintIcon.vue'
import RectangleGroupIcon from './icons/RectangleGroupIcon.vue'
import ToggleIcon from './icons/ToggleIcon.vue'
import LoliLogo from './LoliLogo.vue'

const config = useConfig()
const navigation = useNavigation()
const workbench = useWorkbench()

const { state, push } = toRefs(navigation)
const { semanticValidation, canBeEditedVisually } = toRefs(workbench)

watchEffect(() => {
  if (!canBeEditedVisually.value && navigation.state.view !== 'jsonEditor') {
    navigation.replace({ view: 'jsonEditor' })
  }
})
</script>

<template>
  <nav class="navigation border-b flex items-stretch gap-6 border-gray-200 dark:border-gray-600">
    <LoliLogo class="size-12 py-3" :title="$t('navigation.logo')" />

    <div class="navigation__buttons flex items-stretch gap-4">
      <LoliNavigationButton
        v-if="canBeEditedVisually && config.isViewVisible('featureFlags')"
        :active="state.view === 'featureFlags'"
        @click="push({ view: 'featureFlags' })"
        :issue-count="semanticValidation.getIssuesByPartialPath(['featureFlags']).length"
      >
        <ToggleIcon />
        {{ $t('navigation.featureFlags') }}
      </LoliNavigationButton>

      <LoliNavigationButton
        v-if="canBeEditedVisually && config.isViewVisible('segments')"
        :active="state.view === 'segments'"
        @click="push({ view: 'segments' })"
        :issue-count="semanticValidation.getIssuesByPartialPath(['segments']).length"
      >
        <RectangleGroupIcon />
        {{ $t('navigation.segments') }}
      </LoliNavigationButton>

      <LoliNavigationButton
        v-if="canBeEditedVisually && config.isViewVisible('properties')"
        :active="state.view === 'properties'"
        @click="push({ view: 'properties' })"
        :issue-count="semanticValidation.getIssuesByPartialPath(['evaluationContext']).length"
      >
        <FingerprintIcon />
        {{ $t('navigation.properties') }}
      </LoliNavigationButton>

      <LoliNavigationButton
        v-if="config.isViewVisible('jsonEditor')"
        :active="state.view === 'jsonEditor'"
        @click="push({ view: 'jsonEditor' })"
        :issue-count="workbench.jsonEditorIssueCount"
      >
        <CodeBracketIcon />
        {{ $t('navigation.jsonEditor') }}
      </LoliNavigationButton>
    </div>
  </nav>
</template>
