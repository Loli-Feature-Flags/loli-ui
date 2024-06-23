const FONT_STYLE_TAG_ID = 'loli-ui-fonts'

function getExistingFontStyleTag() {
  return document.getElementById(FONT_STYLE_TAG_ID)
}

function removeExistingFontStyleTag() {
  getExistingFontStyleTag()?.remove()
}

function addFontStyleTag() {
  // Loli UI uses Noto Sans Variable and JetBrains Mono.
  // To make that possible, we create a style tag and add it to the
  // global "head" tag. We consciously set the font family name to
  // "Loli Noto Sans Variable" to minimize the chance of any
  // collisions with other fonts/font configurations.
  const fontStyleTag = document.createElement('style')
  fontStyleTag.id = FONT_STYLE_TAG_ID

  fontStyleTag.innerHTML = `
    /* noto-sans-latin-wght-normal */
    @font-face {
      font-family: 'Loli Noto Sans Variable';
      font-style: normal;
      font-display: swap;
      font-weight: 100 900;
      src: url(https://cdn.jsdelivr.net/fontsource/fonts/noto-sans:vf@latest/latin-wght-normal.woff2) format('woff2-variations');
      unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
    }
    
    /* jetbrains-mono-latin-wght-normal */
    @font-face {
      font-family: 'Loli JetBrains Mono Variable';
      font-style: normal;
      font-display: swap;
      font-weight: 100 800;
      src: url(https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono:vf@latest/latin-wght-normal.woff2) format('woff2-variations');
      unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
    }
  `
  document.head.appendChild(fontStyleTag)
}

/**
 * This function creates a style tag that defines the font faces
 * Loli UI uses. They are loaded via jsdelivr.
 *
 * The created style tag will have the id {@link FONT_STYLE_TAG_ID}.
 *
 * If a style tag with that ID already exists, this function does not
 * create another one.
 *
 * @returns Returns a function which removes the style tag.
 */
export function initializeFonts(): () => void {
  if (!getExistingFontStyleTag()) {
    addFontStyleTag()
  }

  return removeExistingFontStyleTag
}
