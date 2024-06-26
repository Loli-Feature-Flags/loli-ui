<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNavigation } from '../../stores/navigation/store'
import { useWorkbench } from '../../stores/workbench/store'
import Input from '../../components/ui/Input.vue'
import Button from '../../components/ui/Button.vue'
import XMarkIcon from '../../components/icons/XMarkIcon.vue'
import { IssuesCarryOn } from '../../utils/issues'
import FeatureFlagListEntry from './FeatureFlagListEntry.vue'

const navigation = useNavigation()
const workbench = useWorkbench()

function editFeatureFlag(id: string) {
  navigation.push({
    view: 'featureFlags',
    subview: {
      type: 'edit',
      featureFlagId: id
    }
  })
}

const search = ref<string>('')

const sortedFeatureFlags = computed(() =>
  [...workbench.spec.featureFlags].sort((a, b) => a.name.localeCompare(b.name))
)

const filteredFeatureFlags = computed(() => {
  const searchTokens = search.value
    .trim()
    .toLowerCase()
    .split(' ')
    .filter((searchToken) => searchToken.length > 0)

  if (searchTokens.length === 0) return sortedFeatureFlags.value

  return sortedFeatureFlags.value.filter((featureFlag) => {
    const normalizedFeatureFlagName = featureFlag.name.toLowerCase()
    const normalizedFeatureFlagDescription = featureFlag.description.toLowerCase()

    return searchTokens.some(
      (searchToken) =>
        normalizedFeatureFlagName.toLowerCase().includes(searchToken) ||
        normalizedFeatureFlagDescription.includes(searchToken)
    )
  })
})
</script>

<template>
  <div>
    <div class="flex flex-row gap-4 items-center mb-8">
      <Input
        :placeholder="$t('views.featureFlags.searchPlaceholder')"
        v-model="search"
        class="max-w-[20em]"
      />

      <Button
        :disabled="search.length === 0"
        @click="search = ''"
        :title="$t('views.featureFlags.clearSearch')"
      >
        <XMarkIcon />
      </Button>
    </div>

    <div class="list-grid" v-if="filteredFeatureFlags.length > 0">
      <FeatureFlagListEntry
        v-for="featureFlag of filteredFeatureFlags"
        :feature-flag="featureFlag"
        :key="featureFlag.id"
        @edit="editFeatureFlag(featureFlag.id)"
        :issues-carry-on="
          IssuesCarryOn.fromSemanticValidation(workbench.semanticValidation, [
            'featureFlags',
            workbench.spec.featureFlags.indexOf(featureFlag)
          ])
        "
      />
    </div>

    <div v-else>
      {{ $t('views.featureFlags.noEntriesFound') }}
    </div>
  </div>
</template>
