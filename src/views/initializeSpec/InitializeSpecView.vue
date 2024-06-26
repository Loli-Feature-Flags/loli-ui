<script setup lang="ts">
import Button from '../../components/ui/Button.vue'
import SparklesIcon from '../../components/icons/SparklesIcon.vue'
import UndrawUpgradeReGano from '../../components/illustrations/UndrawUpgradeReGano.vue'
import { useWorkbench } from '../../stores/workbench/store'

const workbench = useWorkbench()

function initSpec() {
  workbench.initializeNewSpecIfNoRawSpec()
}
</script>

<template>
  <div class="flex flex-col items-center gap-20 py-20">
    <UndrawUpgradeReGano class="w-full h-auto max-h-[12em]" />

    <Button @click="initSpec" variant="primary">
      <SparklesIcon />
      {{ $t('views.initializeSpec.init') }}
    </Button>
  </div>
</template>
