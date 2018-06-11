export interface VerticalAlignProps {
  verticalAlign?: "baseline" | "text-top" | "text-bottom" | "sub" | "super"
}

export interface TextProps extends VerticalAlignProps {
  family: "unica" | "garamond" | "avantgarde"
  typeSize: string // TODO: Make this more granular
}

export interface TypographyProps {
  size?: string | number
  weight?: string
  italic?: boolean
}
