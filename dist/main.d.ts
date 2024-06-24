import { LoliUiMountOptions, LoliUiMountResult } from './main/types';

/**
 * Initializes and mounts an instance of Loli UI
 * in the given container and with the given options.
 *
 * @param container Container element to add Loli UI to.
 * @param options Optional options.
 */
export declare function mountLoliUi(container: HTMLElement, options?: LoliUiMountOptions): LoliUiMountResult;
declare global {
    interface Window {
        mountLoliUi: typeof mountLoliUi;
    }
}
