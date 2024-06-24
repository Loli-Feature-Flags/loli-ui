import type { LoliUiMountOptions } from '@/main/types'
import { useWorkbench } from '@/stores/workbench/store'
import { useConfig } from '@/stores/config/store'
import { useNavigation } from '@/stores/navigation/store'

/**
 * Initializes the Loli UI app pinia stores/configs/options based
 * on the mount options.
 *
 * Initializes the following:
 *  - initial loli spec
 *  - initial navigation state
 *  - hidden views
 *  - spec change listener
 *  - navigation state listeners
 *
 * @param mountOptions Optional mount options to apply.
 */
export function initializeStores(mountOptions?: LoliUiMountOptions) {
  if (mountOptions?.initialSpec) {
    useWorkbench().setRawSpec(mountOptions.initialSpec)
  }

  if (mountOptions?.initialNavigationState) {
    useNavigation().replace(mountOptions.initialNavigationState)
  }

  if (mountOptions?.hiddenViews) {
    useConfig().setHiddenViews(mountOptions.hiddenViews)
  }

  if (mountOptions?.specChangeListener) {
    useConfig().registerSpecChangeListener(mountOptions.specChangeListener)
  }

  if (mountOptions?.specIssueListener) {
    useConfig().registerSpecIssueListener(mountOptions.specIssueListener)
  }

  if (mountOptions?.navigationStateChangeListener) {
    useConfig().registerNavigationChangeListener(mountOptions.navigationStateChangeListener)
  }

  if (typeof mountOptions?.dialogZIndex === 'number') {
    useConfig().setDialogZIndex(mountOptions.dialogZIndex)
  }
}
