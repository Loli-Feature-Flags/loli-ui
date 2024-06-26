<script setup lang="ts">
import {
  type DateTimeCondition,
  dateTimeConditionOperandToDate,
  dateToDateTimeConditionOperand
} from '@loli-feature-flags/loli-sdk'
import { computed } from 'vue'
import CalendarDaysIcon from '../../icons/CalendarDaysIcon.vue'
import DateTimeConditionOperatorSelect from '../inputs/DateTimeConditionOperatorSelect.vue'
import DateTimeInput from '../../ui/DateTimeInput.vue'
import DateTimeConditionTimezoneOffsetModeSelect from '../inputs/DateTimeConditionTimezoneOffsetModeSelect.vue'

const dateTimeCondition = defineModel<DateTimeCondition>({ required: true })

const operandDate = computed<Date>({
  get() {
    return dateTimeConditionOperandToDate(dateTimeCondition.value.operand)
  },
  set(newValue) {
    dateTimeCondition.value.operand = dateToDateTimeConditionOperand(newValue)
  }
})
</script>

<template>
  <div class="w-full flex flex-row items-center gap-4">
    <CalendarDaysIcon />

    <div class="text-sm">{{ $t('spec.dateTimeCondition.dateTime') }}</div>

    <DateTimeConditionOperatorSelect v-model="dateTimeCondition.operator" />

    <DateTimeInput v-model="operandDate" size="small" fit />

    <DateTimeConditionTimezoneOffsetModeSelect v-model="dateTimeCondition.timezoneOffsetMode" />
  </div>
</template>
