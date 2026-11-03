export type PaletteThemeName = "light" | "dark"

export const PALETTE_THEME_ATTRIBUTE = "data-palette-theme"

export const getPaletteThemeAttributes = (theme: PaletteThemeName) => {
  return { [PALETTE_THEME_ATTRIBUTE]: theme } as {
    [PALETTE_THEME_ATTRIBUTE]: PaletteThemeName
  }
}
