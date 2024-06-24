<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  VisuallyHidden
} from 'radix-vue'
import useLoliUiElementRef from '@/hooks/useLoliUiElementRef'
import XMarkIcon from '@/components/icons/XMarkIcon.vue'
import { useConfig } from '@/stores/config/store'

export type DialogSize = 'small' | 'near-fullscreen' | 'fullscreen'

defineProps<{
  description?: string
  hideDescription?: boolean
  size?: DialogSize
  contentOnlyScroll?: boolean
  error?: boolean
}>()

const config = useConfig()

const openModel = defineModel<boolean>('open', { default: false })
const loliUiRef = useLoliUiElementRef()
</script>

<template>
  <DialogRoot v-model:open="openModel">
    <DialogTrigger tabindex="0" as-child v-if="$slots.trigger">
      <slot name="trigger" />
    </DialogTrigger>

    <DialogPortal :to="loliUiRef">
      <Transition name="fade">
        <DialogOverlay
          class="bg-gray-700/50 w-full h-full fixed top-0 left-0"
          :style="`z-index: ${config.floatingZIndex};`"
        />
      </Transition>

      <Transition name="fade">
        <DialogContent
          :trap-focus="false"
          :class="[
            'fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-100',
            {
              'rounded-lg w-full max-w-[min(35em,calc(100vw-4em))] max-h-[calc(100vh-4em)]':
                !size || size === 'small',
              'rounded-xl w-screen h-screen max-w-[calc(100vw-4em)] max-h-[calc(100vh-4em)]':
                size === 'near-fullscreen',
              'w-screen h-screen': size === 'fullscreen'
            },
            'bg-white px-6 pt-6 pb-8 shadow-2xl border border-gray-300',
            {
              'ring-2 ring-offset-4 ring-red-600': error
            },
            'data-[state=open]:animate-contentShow focus:outline-none',
            'overflow-x-auto',
            {
              'flex flex-col': contentOnlyScroll
            }
          ]"
          :style="`z-index: ${config.floatingZIndex};`"
          v-bind="
            !description || hideDescription
              ? {
                  ['aria-describedby']: undefined
                }
              : {}
          "
        >
          <div class="flex items-center justify-between gap-4 mb-4">
            <DialogTitle as="div" class="flex-grow">
              <slot name="title" />
            </DialogTitle>

            <DialogClose
              :title="$t('common.dialog.close')"
              class="transition p-1.5 rounded-md focus-ring border border-transparent hover:bg-gray-100 hover:border-gray-200"
            >
              <XMarkIcon />
            </DialogClose>
          </div>

          <VisuallyHidden v-if="description && !hideDescription">
            <DialogDescription class="mb-2">{{ description }}</DialogDescription>
          </VisuallyHidden>

          <DialogDescription v-else-if="description" class="mb-2">
            {{ description }}
          </DialogDescription>

          <div :class="{ 'flex-grow overflow-x-auto': contentOnlyScroll }">
            <slot />
          </div>

          <div v-if="$slots.footer" class="mt-4">
            <slot name="footer" />
          </div>
        </DialogContent>
      </Transition>
    </DialogPortal>
  </DialogRoot>
</template>
