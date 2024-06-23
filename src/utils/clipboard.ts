export function copyToClipboard(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => resolve())
        .catch((err) => {
          console.error('Failed to copy via navigator.clipboard:', err)
          fallbackCopyToClipboard(text, resolve, reject)
        })
    } else {
      fallbackCopyToClipboard(text, resolve, reject)
    }
  })
}

function fallbackCopyToClipboard(
  text: string,
  resolve: () => void,
  reject: (reason?: any) => void
): void {
  const textarea = document.createElement('textarea')
  textarea.value = text
  document.body.appendChild(textarea)
  textarea.select()
  try {
    document.execCommand('copy')
    document.body.removeChild(textarea)
    resolve()
  } catch (err) {
    console.error('Failed to copy via fallback method:', err)
    document.body.removeChild(textarea)
    reject(err)
  }
}
