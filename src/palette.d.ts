export interface TextProps {
  family: "unica" | "garamond" | "avantgarde"
  typeSize: string // TODO: Make this more granular
}

export interface TypographyProps {
  size?: string | number
  weight?: string
  italic?: boolean
}
