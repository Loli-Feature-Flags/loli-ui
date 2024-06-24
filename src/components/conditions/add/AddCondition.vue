<script setup lang="ts">
import type {
  AlwaysTrueCondition,
  ConditionSetCondition,
  Property,
  Segment,
  SegmentCondition
} from '@loli-feature-flags/loli-sdk'
import {
  type Condition,
  type DateTimeCondition,
  dateToDateTimeConditionOperand
} from '@loli-feature-flags/loli-sdk'
import { computed, ref } from 'vue'
import { useWorkbench } from '@/stores/workbench/store'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import { createDefaultConditionForProperty } from '@/utils/condition'
import Popover from '@/components/ui/Popover.vue'
import Button from '@/components/ui/Button.vue'
import HelpTooltip from '@/components/ui/HelpTooltip.vue'
import { injectRootSegment } from '@/utils/segments'

const workbench = useWorkbench()
const popoverOpen = ref(false)

const rootSegment = injectRootSegment()

const firstProperty = computed<Property | null>(() => {
  return workbench.spec.evaluationContext.properties.length > 0
    ? workbench.spec.evaluationContext.properties[0]
    : null
})

const firstSegment = computed<Segment | null>(() => {
  const root = rootSegment?.value

  const filtered = root
    ? workbench.spec.segments.filter((segment) => segment.id !== root.id)
    : workbench.spec.segments

  return filtered.length > 0 ? filtered[0] : null
})

const emit = defineEmits<{
  add: [condition: Condition]
}>()

type ConditionType = 'property-check' | 'always-true' | 'condition-set' | 'segment' | 'date-time'

function addPropertyCheckCondition() {
  if (!firstProperty.value) return

  emit('add', createDefaultConditionForProperty(firstProperty.value))
}

function addConditionSet() {
  const conditionSetCondition: ConditionSetCondition = {
    type: 'conditionSet',
    conditionSet: {
      operator: 'and',
      conditions: []
    }
  }

  emit('add', conditionSetCondition)
}

function addAlwaysTrueCondition() {
  if (!firstProperty.value) return

  const alwaysTrueCondition: AlwaysTrueCondition = {
    type: 'alwaysTrue'
  }

  emit('add', alwaysTrueCondition)
}

function addSegmentCondition() {
  if (!firstSegment.value) return

  const segmentCondition: SegmentCondition = {
    type: 'segment',
    segmentId: firstSegment.value.id,
    operator: 'isTrue'
  }

  emit('add', segmentCondition)
}

function addDateTimeCondition() {
  const date = new Date()

  const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000)
  tomorrow.setHours(9)
  tomorrow.setMinutes(0)
  tomorrow.setSeconds(0)

  const dateTimeCondition: DateTimeCondition = {
    type: 'dateTime',
    operator: 'equalsOrIsAfter',
    operand: dateToDateTimeConditionOperand(tomorrow),
    timezoneOffsetMode: 'operandOffset'
  }

  emit('add', dateTimeCondition)
}

function addCondition(type: ConditionType) {
  if (type === 'property-check') {
    addPropertyCheckCondition()
  } else if (type === 'always-true') {
    addAlwaysTrueCondition()
  } else if (type === 'segment') {
    addSegmentCondition()
  } else if (type === 'condition-set') {
    addConditionSet()
  } else if (type === 'date-time') {
    addDateTimeCondition()
  }

  popoverOpen.value = false
}
</script>

<template>
  <Popover v-model:open="popoverOpen" align="start">
    <template #trigger>
      <Button size="small"><PlusIcon />{{ $t('spec.conditionSet.addCondition') }}</Button>
    </template>

    <div class="min-w-[10em]">
      <HelpTooltip :disabled="!!firstSegment" side="right">
        <template #trigger>
          <Button
            size="small"
            full-width
            align="left"
            variant="flat"
            :disabled="!firstSegment"
            @click="addCondition('segment')"
          >
            {{ $t('conditions.add.types.segmentCondition') }}
          </Button>
        </template>

        {{ $t('spec.conditionSet.noSegmentsDefined') }}
      </HelpTooltip>

      <HelpTooltip :disabled="!!firstProperty" side="right">
        <template #trigger>
          <Button
            size="small"
            full-width
            align="left"
            variant="flat"
            :disabled="!firstProperty"
            @click="addCondition('property-check')"
          >
            {{ $t('conditions.add.types.propertyCondition') }}
          </Button>
        </template>
        {{ $t('spec.conditionSet.noPropertiesDefined') }}
      </HelpTooltip>

      <Button
        size="small"
        full-width
        align="left"
        variant="flat"
        @click="addCondition('date-time')"
      >
        {{ $t('conditions.add.types.dateTimeCondition') }}
      </Button>

      <Button
        size="small"
        full-width
        align="left"
        variant="flat"
        @click="addCondition('always-true')"
      >
        {{ $t('conditions.add.types.alwaysTrueCondition') }}
      </Button>

      <Button
        size="small"
        full-width
        align="left"
        variant="flat"
        @click="addCondition('condition-set')"
      >
        {{ $t('conditions.add.types.subConditionSet') }}
      </Button>
    </div>
  </Popover>
</template>
