export { fontFamily } from "./fontFamily"

export interface FontDefinition {
  fontFamily: string
  fontWeight?: string | number
  fontStyle?: string
}

export type FontValue = string | FontDefinition

export interface FontFamily {
  sans: {
    regular: FontValue
    italic: FontValue
    medium: FontValue
    mediumItalic: FontValue
  }
  serif: {
    regular: FontValue
    italic: FontValue
    semibold: FontValue
  }
  display: {
    regular: FontValue
  }
}
