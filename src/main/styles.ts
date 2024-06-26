import LoliApp from '../LoliApp.ce.vue'

/**
 * Creates a style tag
 * @param container
 */
export function initializeStyles(container: HTMLElement): () => void {
  const rootStyle = document.createElement('style')
  rootStyle.innerHTML = LoliApp.styles
  container.appendChild(rootStyle)

  return () => {
    rootStyle.remove()
  }
}
