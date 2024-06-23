<script setup lang="ts">
import { useWorkbench } from '@/stores/workbench/store'
import { computed, ref } from 'vue'
import XMarkIcon from '@/components/icons/XMarkIcon.vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import PropertyListEntry from '@/views/properties/PropertyListEntry.vue'
import { useNavigation } from '@/stores/navigation/store'
import { IssuesCarryOn } from '@/utils/issues'

const workbench = useWorkbench()
const navigation = useNavigation()

const search = ref<string>('')

const sortedProperties = computed(() =>
  [...workbench.spec.evaluationContext.properties].sort((a, b) => a.name.localeCompare(b.name))
)

const filteredProperties = computed(() => {
  const searchTokens = search.value
    .trim()
    .toLowerCase()
    .split(' ')
    .filter((searchToken) => searchToken.length > 0)

  if (searchTokens.length === 0) return sortedProperties.value

  return sortedProperties.value.filter((property) => {
    return searchTokens.some(
      (searchToken) =>
        property.name.toLowerCase().includes(searchToken) ||
        property.path.join('.').toLowerCase().includes(searchToken)
    )
  })
})
</script>

<template>
  <div>
    <div class="flex flex-row gap-4 items-center mb-8">
      <Input
        :placeholder="$t('views.properties.searchPlaceholder')"
        v-model="search"
        class="max-w-[20em]"
      />

      <Button
        :disabled="search.length === 0"
        @click="search = ''"
        :title="$t('views.properties.clearSearch')"
      >
        <XMarkIcon />
      </Button>
    </div>

    <div class="list-grid" v-if="filteredProperties.length > 0">
      <PropertyListEntry
        v-for="(property, index) of filteredProperties"
        v-model="filteredProperties[index]"
        :key="property.id"
        :issues-carry-on="
          IssuesCarryOn.fromSemanticValidation(workbench.semanticValidation, [
            'evaluationContext',
            'properties',
            workbench.spec.evaluationContext.properties.indexOf(property)
          ])
        "
        @edit="
          navigation.push({
            view: 'properties',
            subview: { type: 'edit', propertyId: property.id }
          })
        "
      />
    </div>

    <div v-else>
      {{ $t('views.properties.noEntriesFound') }}
    </div>
  </div>
</template>
