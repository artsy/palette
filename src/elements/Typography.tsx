import React, { SFC } from "react"
import styledWrapper from "styled-components"
import { style } from "styled-system"
import { styled } from "../platform/primitives"

// @ts-ignore
import { StyledComponentClass } from "styled-components"

import {
  color,
  display,
  maxWidth,
  space,
  textAlign,
  themeGet,
} from "styled-system"

export interface TypographyProps {
  size?: string | number
  weight?: string
  italic?: boolean
}

export interface VerticalAlignProps {
  verticalAlign?: "baseline" | "text-top" | "text-bottom" | "sub" | "super"
}

export interface TextProps extends VerticalAlignProps {
  family: "unica" | "garamond" | "avantgarde"
  typeSize: string // TODO: Make this more granular
}

const verticalAlign = style({
  prop: "verticalAlign",
})

const dynamicTheme = callback => props =>
  themeGet.apply(null, [].concat(callback(props)))(props)

const selectFontType = ({ weight = "regular", italic }) => {
  if (italic) {
    if (weight === "medium") return "mediumItalic"
    return "italic"
  }
  return weight
}

const fontPath = props => [
  `fontFamily.${props.family}.${selectFontType(props)}`,
  "regular", // fallback
]

const fontSize = props => `typeSizes.${props.typeSize}.fontSize`

const lineHeight = props => `typeSizes.${props.typeSize}.lineHeight`

const Text = styled.Text.attrs<TextProps>({})`
  font-family: ${dynamicTheme(fontPath)};
  font-size: ${dynamicTheme(fontSize)}px;
  line-height: ${dynamicTheme(lineHeight)}px;
  ${color};
  ${display};
  ${maxWidth};
  ${space};
  ${textAlign};
  ${verticalAlign};
`

const _Sans: SFC<TypographyProps> = props => (
  <Text family="unica" typeSize={`sans${props.size || 3}`} {...props} />
)
const _Serif: SFC<TypographyProps> = props => (
  <Text family="garamond" typeSize={`serif${props.size || 3}`} {...props} />
)
const _Display: SFC<TypographyProps> = props => (
  <Text family="avantgarde" typeSize={`display${props.size || 2}`} {...props} />
)

// Wrap to yield control back to consuming components.
// See: https://www.styled-components.com/docs/advanced#referring-to-other-components
export const Sans = styledWrapper(_Sans)``
export const Serif = styledWrapper(_Serif)``
export const Display = styledWrapper(_Display)``
