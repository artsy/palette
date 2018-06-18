import React from "react"
import styled from "styled-components"
import { styled as primitives } from "../platform/primitives"
import { themeProps } from "../Theme"

// @ts-ignore
import { StyledComponentClass } from "styled-components"

import {
  color,
  ColorProps,
  display,
  DisplayProps as StyledSystemDisplayProps,
  maxWidth,
  MaxWidthProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
  style,
} from "styled-system"

export interface TypographyProps {
  size?: string | number
  weight?: string
  italic?: boolean
}

export interface VerticalAlignProps {
  verticalAlign?: "baseline" | "text-top" | "text-bottom" | "sub" | "super"
}
const verticalAlign = style({
  prop: "verticalAlign",
})

export interface TextProps
  extends ColorProps,
    MaxWidthProps,
    SpaceProps,
    StyledSystemDisplayProps,
    TextAlignProps,
    VerticalAlignProps {
  fontFamily?: string
  fontSize: number
  lineHeight: number
}

export const Text = primitives.Text.attrs<TextProps>({})`
  font-family: ${({ fontFamily }) => fontFamily || "inherit"};
  font-size: ${({ fontSize }) => fontSize}px;
  line-height: ${({ lineHeight }) => lineHeight}px;
  ${color};
  ${display};
  ${maxWidth};
  ${space};
  ${textAlign};
  ${verticalAlign};
`

export type FontFamily = typeof themeProps["fontFamily"]
export interface FontWeights {
  sans: keyof FontFamily["sans"]
  serif: keyof FontFamily["serif"]
  display: keyof FontFamily["display"]
}

const selectFontType = (
  weight?:
    | null
    | FontWeights["sans"]
    | FontWeights["serif"]
    | FontWeights["display"],
  italic?: boolean
) => {
  if (weight === null) {
    return undefined
  }
  if (italic) {
    if (weight === "medium") return "mediumItalic"
    return "italic"
  }
  return weight || "regular"
}

/**
 * Sans
 */

export interface SansProps extends Partial<TextProps> {
  italic?: boolean

  size: keyof typeof themeProps["typeSizes"]["sans"]

  /**
   * Explicitly specify `null` to inherit weight from parent, otherwise default
   * to `regular`.
   */
  weight?: null | "regular" | "medium"
}

export const Sans = styled<SansProps>(({ size, weight, italic, ...props }) => {
  const fontType = selectFontType(weight, italic)
  return (
    <Text
      fontFamily={fontType && themeProps.fontFamily.sans[fontType]}
      {...themeProps.typeSizes.sans[size]}
      {...props}
    />
  )
})``

/**
 * Serif
 */

export interface SerifProps extends Partial<TextProps> {
  italic?: boolean

  size: keyof typeof themeProps["typeSizes"]["serif"]

  /**
   * Explicitly specify `null` to inherit weight from parent, otherwise default
   * to `regular`.
   */
  weight?: null | "regular" | "semibold"
}

export const Serif = styled<SerifProps>(
  ({ size, weight, italic, ...props }) => {
    const fontType = selectFontType(weight, italic)
    return (
      <Text
        fontFamily={fontType && themeProps.fontFamily.serif[fontType]}
        {...themeProps.typeSizes.serif[size]}
        {...props}
      />
    )
  }
)``

/**
 * Display
 */

export interface DisplayProps extends Partial<TextProps> {
  size: keyof typeof themeProps["typeSizes"]["display"]

  /**
   * Explicitly specify `null` to inherit weight from parent, otherwise default
   * to `regular`.
   */
  weight?: null | "regular"
}

export const Display = styled<DisplayProps>(({ size, weight, ...props }) => {
  const fontType = selectFontType(weight, false)
  return (
    <Text
      fontFamily={fontType && themeProps.fontFamily.display[fontType]}
      {...themeProps.typeSizes.display[size]}
      {...props}
    />
  )
})``
