<script setup lang="ts">
import Input from '@/components/ui/Input.vue'
import Slider from '@/components/ui/Slider.vue'

const model = defineModel<number>({ required: true })
</script>

<template>
  <div class="flex flex-row items-center justify-start gap-4 text-sm text-gray-800">
    <span>
      {{ $t('views.featureFlags.editor.targeting.rules.values.rolloutPercentage.prefix') }}
    </span>

    <Slider
      v-model="model"
      :thumb-label="
        $t('views.featureFlags.editor.targeting.rules.values.rolloutPercentage.thumbLabel')
      "
      class="w-[8em]"
    />

    <Input size="small" type="number" v-model.number="model" min="0" max="100" fit />

    <span>
      {{ $t('views.featureFlags.editor.targeting.rules.values.rolloutPercentage.suffix') }}
    </span>
  </div>
</template>
