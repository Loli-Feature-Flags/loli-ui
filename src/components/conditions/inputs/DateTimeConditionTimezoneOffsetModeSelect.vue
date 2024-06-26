<script setup lang="ts">
import {
  type DateTimeConditionTimezoneOffsetMode,
  DateTimeConditionTimezoneOffsetModes
} from '@loli-feature-flags/loli-sdk'
import Select from '../../ui/Select.vue'

const timezoneOffsetModeModel = defineModel<DateTimeConditionTimezoneOffsetMode>({ required: true })
</script>

<template>
  <Select
    v-model="timezoneOffsetModeModel"
    :options="
      DateTimeConditionTimezoneOffsetModes.map((mode) => ({
        value: mode,
        label: $t(`spec.dateTimeCondition.timezoneOffsetMode.${mode}`)
      }))
    "
    size="small"
    fit
  />
</template>
