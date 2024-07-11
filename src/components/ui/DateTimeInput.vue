<script setup lang="ts">
import { DateFieldInput, DateFieldRoot } from 'radix-vue'
import { useI18n } from 'vue-i18n'
import { parseAbsoluteToLocal, ZonedDateTime } from '@internationalized/date'
import { computed } from 'vue'

export type DateTimeInputSize = 'small' | 'normal'

const dateModel = defineModel<Date>({ required: true })
defineProps<{ size?: DateTimeInputSize; fit?: boolean }>()

const i18n = useI18n()

const convertedDate = computed<ZonedDateTime>({
  get() {
    return parseAbsoluteToLocal(dateModel.value.toISOString())
  },
  set(newValue) {
    dateModel.value = newValue.toDate()
  }
})

const sizeClasses: { [key in DateTimeInputSize]: string } = {
  small: 'rounded-md px-2 py-1 text-sm',
  normal: 'rounded-md px-4 py-2'
}
</script>

<template>
  <DateFieldRoot
    v-model="convertedDate"
    v-slot="{ segments }"
    granularity="second"
    :hour-cycle="24"
    hide-time-zone
    :locale="i18n.locale.value"
    :class="[
      'select-none flex items-center gap-0.5',
      'transition relative',
      'border focus-ring',
      'bg-white border-gray-300 text-gray-700',
      'dark:bg-gray-900 dark:border-gray-300 dark:text-gray-300',
      { 'w-full': !fit },
      sizeClasses[size ?? 'normal']
    ]"
  >
    <template v-for="item in segments" :key="item.part">
      <DateFieldInput v-if="item.part === 'literal'" :part="item.part" class="text-gray-500">
        {{ item.value }}
      </DateFieldInput>

      <DateFieldInput
        v-else
        :part="item.part"
        :class="[
          'rounded focus:outline-none focus:ring-offset-2 focus:ring-1 data-[placeholder]:font-extralight',
          'focus:ring-primary-500 data-[placeholder]:text-gray-400',
          'dark:focus:ring-primary-400 dark:ring-offset-gray-900 dark:focus:ring-2'
        ]"
      >
        {{ item.value }}
      </DateFieldInput>
    </template>
  </DateFieldRoot>
</template>
