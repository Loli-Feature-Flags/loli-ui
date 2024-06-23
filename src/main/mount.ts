import { type App, nextTick } from 'vue'

/**
 * Mounts the given Vue App. This function creates a div element
 * inside the given container and mounts the app there.
 *
 * @param app Vue app to mount.
 * @param container Container to mount app in.
 * @returns Returns a function which unmounts the Vue app and which removes the inner div element.
 */
export function mountApp(app: App, container: HTMLElement): () => void {
  const mountDiv = document.createElement('div')
  container.appendChild(mountDiv)

  // Next tick to let the stores settle and compute
  // all computed properties.
  void nextTick(() => {
    app.mount(mountDiv)
  })

  return () => {
    app.unmount()
    mountDiv.remove()
  }
}
