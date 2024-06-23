<script setup lang="ts">
import LoliLogo from '@/components/LoliLogo.vue'
import LoliNavigationButton from '@/components/LoliNavigationButton.vue'
import { useNavigation } from '@/stores/navigation/store'
import { toRefs, watchEffect } from 'vue'
import ToggleIcon from '@/components/icons/ToggleIcon.vue'
import FingerprintIcon from '@/components/icons/FingerprintIcon.vue'
import RectangleGroupIcon from '@/components/icons/RectangleGroupIcon.vue'
import CodeBracketIcon from '@/components/icons/CodeBracketIcon.vue'
import { useWorkbench } from '@/stores/workbench/store'
import { useConfig } from '@/stores/config/store'

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
  <nav class="navigation border-b border-gray-200 flex items-stretch gap-6">
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
