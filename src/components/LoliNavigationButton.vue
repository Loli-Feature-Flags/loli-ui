<script setup lang="ts">
defineProps<{ active: boolean; issueCount?: number }>()
defineEmits(['click'])
</script>

<template>
  <button
    @click="$emit('click')"
    :class="[
      'group/navbutton flex flex-row gap-3 items-center',
      'py-2 px-2 text-md relative transition focus-ring',
      'after:bg-gray-800 after:h-[1px] after:absolute after:-bottom-[1px] after:left-0 after:w-full after:transition',
      'dark:after:bg-gray-400',
      {
        'text-gray-500 after:opacity-0 hover:text-gray-700 hover:after:opacity-50 dark:hover:text-gray-400':
          !active,
        'after:opacity-100': active
      }
    ]"
  >
    <slot />

    <span
      :class="[
        'rounded-md px-2 py-0.5 text-xs leading-tight transition',
        {
          'bg-red-300 text-white group-hover/navbutton:bg-red-400 dark:bg-red-900 dark:group-hover/navbutton:bg-red-800':
            !active,
          'bg-red-600 text-white': active
        }
      ]"
      v-if="issueCount !== undefined && issueCount > 0"
    >
      {{ issueCount }}
    </span>
  </button>
</template>
