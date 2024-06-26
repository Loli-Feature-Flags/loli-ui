<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import Select, { type SelectOption } from '../../../../components/ui/Select.vue'
import Label from '../../../../components/ui/Label.vue'

const model = defineModel<boolean>({ required: true })
const props = defineProps<{ label?: string; small?: boolean }>()
const i18n = useI18n()

const stringModel = computed<'true' | 'false'>({
  get() {
    return model.value ? 'true' : 'false'
  },
  set(newValue) {
    model.value = newValue === 'true'
  }
})

const options = computed<SelectOption[]>(() => [
  { value: 'true', label: i18n.t('spec.featureFlag.value.true') },
  { value: 'false', label: i18n.t('spec.featureFlag.value.false') }
])
</script>

<template>
  <Label :title="label">
    <Select required v-model="stringModel" :options="options" :size="small ? 'small' : 'normal'" />
  </Label>
</template>
