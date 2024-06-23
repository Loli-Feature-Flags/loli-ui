import type { Ref } from 'vue'
import { inject } from 'vue'

export default function useLoliUiElementRef() {
  return inject('loliuielement') as Ref<HTMLDivElement | undefined>
}
