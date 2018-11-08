import React, { CSSProperties } from "react"
import styled from "styled-components"
import { FontValue } from "../../platform/fonts"
import { styled as primitives } from "../../platform/primitives"

import {
  DisplaySize,
  SansSize,
  SerifSize,
  themeProps,
  TypeSizes,
} from "../../Theme"

// @ts-ignore
import { StyledComponentClass } from "styled-components"

import {
  color,
  ColorProps,
  display,
  DisplayProps as StyledSystemDisplayProps,
  fontSize,
  FontSizeProps,
  lineHeight,
  LineHeightProps,
  maxWidth,
  MaxWidthProps,
  space,
  SpaceProps,
  style,
  textAlign,
  TextAlignProps,
} from "styled-system"

import { determineFontSizes } from "./determineFontSizes"

/**
 * Spec: https://www.notion.so/artsy/Typography-d1f9f6731f3d47c78003d6d016c30221
 */

export interface VerticalAlignProps {
  verticalAlign?:
    | "baseline"
    | "sub"
    | "super"
    | "text-top"
    | "text-bottom"
    | "middle"
    | "top"
    | "bottom"
    | "inherit"
    | "initial"
    | "unset"
}
const verticalAlign = style({
  prop: "verticalAlign",
})

const fontFamilyHelper = ({ fontFamily }: { fontFamily: FontValue }) => {
  if (typeof fontFamily === "string") {
    return `font-family: ${fontFamily}`
  } else {
    return [`font-family: ${fontFamily.fontFamily}`]
      .concat(fontFamily.fontStyle ? `font-style: ${fontFamily.fontStyle}` : [])
      .concat(
        fontFamily.fontWeight ? `font-weight: ${fontFamily.fontWeight}` : []
      )
      .join(";\n")
  }
}

export interface TextProps
  extends ColorProps,
    FontSizeProps,
    LineHeightProps,
    MaxWidthProps,
    SpaceProps,
    StyledSystemDisplayProps,
    TextAlignProps,
    VerticalAlignProps {
  fontFamily?: string
  style?: CSSProperties
  /**
   * React Native specific. Allows you to tell the native renderers whether
   * this field could be multi-line or not.
   */
  numberOfLines?: number
  /**
   * React Native specific. When `numberOfLines` is set, this prop defines how
   * text will be truncated. `numberOfLines` must be set in conjunction with
   * this prop.
   */
  ellipsizeMode?: string
}

/** Base Text component for typography */
export const Text = primitives.Text.attrs<TextProps>({})`
  ${fontFamilyHelper};
  ${fontSize};
  ${lineHeight};
  ${color};
  ${display};
  ${maxWidth};
  ${space};
  ${textAlign};
  ${verticalAlign};
`

/**
 * The supported typefaces
 */
export type FontTypes = keyof TypeSizes

export interface TypeSizeKeys {
  sans: SansSize
  serif: SerifSize
  display: DisplaySize
}

/**
 * Any valid font family
 */
export type FontFamily = typeof themeProps["fontFamily"]

/**
 * Any valid font weight
 */
export type FontWeights =
  | keyof FontFamily["sans"]
  | keyof FontFamily["serif"]
  | keyof FontFamily["display"]

/**
 * Returns the weight, if given, otherwise it defaults to `regular` unless
 * explicitly given `null` in which case it returns undefined, meaning the
 * weight should be inherited from the component’s parent.
 *
 * @param weight
 */
function _fontWeight(weight?: null | FontWeights) {
  if (weight === null) {
    return undefined
  }
  return weight || "regular"
}

function _selectFontFamilyType(weight?: null | FontWeights, italic?: boolean) {
  return italic ? "italic" : weight
}

interface StyledTextProps extends Partial<TextProps> {
  size: string | string[]
  weight?: null | FontWeights
  italic?: boolean
}

/**
 * Creates a wrapper around the generic `Text` component for a font type defined
 * in the palette’s theme (sans, serif, or display).
 *
 * The component’s props are specified with type parameter `P` and should hold
 * both the component’s specific props (size, weight, italic) as well as all of
 * the generic `Text` component’s props, although as optional.
 *
 * @param fontType
 *        The font type that this text component represents.
 * @param selectFontFamilyType
 *        An optional function that maps weight+italic to a font-family.
 */
function createStyledText<P extends StyledTextProps>(
  fontType: keyof FontFamily,
  selectFontFamilyType: typeof _selectFontFamilyType = _selectFontFamilyType
) {
  return styled<P>(
    ({ size, weight, italic, ...textProps }: StyledTextProps) => {
      const fontFamilyType = selectFontFamilyType(_fontWeight(weight), italic)
      // This is mostly to narrow the type of `fontFamilyType` to remove `null`.
      if (fontFamilyType === null) {
        throw new Error("Did not expect `fontType` to be `null`.")
      }
      return (
        <Text
          fontFamily={
            fontFamilyType && themeProps.fontFamily[fontType][fontFamilyType]
          }
          {...determineFontSizes(fontType, size)}
          {...textProps}
        />
      )
    }
  )``
}

/**
 * Sans
 */

export interface SansProps extends Partial<TextProps> {
  italic?: boolean

  size: SansSize

  /**
   * Explicitly specify `null` to inherit weight from parent, otherwise default
   * to `regular`.
   */
  weight?: null | "regular" | "medium"
}

/**
 * The Sans typeface is used for presenting objective dense information
 * (such as tables) and intervening communications (such as error feedback).
 *
 * @example
 *
 * <Sans color="black10" size="3t" weight="medium" italic>Hi</Sans>
 */
export const Sans = createStyledText<SansProps>("sans", (weight, italic) => {
  return italic && weight === "medium"
    ? "mediumItalic"
    : _selectFontFamilyType(weight, italic)
})

/**
 * Serif
 */

export interface SerifProps extends Partial<TextProps> {
  italic?: boolean

  size: SerifSize

  /**
   * Explicitly specify `null` to inherit weight from parent, otherwise default
   * to `regular`.
   */
  weight?: null | "regular" | "semibold"
}

/**
 * The Serif typeface is used as the primary Artsy voice, guiding users through
 * flows, instruction, and communications.
 *
 * @example
 *
 * <Serif color="black10" size="3t" weight="semibold">Hi</Serif>
 */
export const Serif = createStyledText<SerifProps>("serif", (weight, italic) => {
  if (italic && weight && weight !== "regular") {
    throw new Error(
      `The serif font does not have an italic font with weight \`${weight}\``
    )
  }
  return _selectFontFamilyType(weight, italic)
})

export interface DisplayProps extends Partial<TextProps> {
  size: DisplaySize

  /**
   * Explicitly specify `null` to inherit weight from parent, otherwise default
   * to `regular`.
   */
  weight?: null | "regular"
}

/**
 * The Display typeface has limited utility and is in the process of being
 * phased out in most places. Ask your friendly neighborhood design team member
 * if you're unsure if it should be used.
 *
 * @example
 *
 * <Display color="black10" size="3t">Hi</Display>
 */
export const Display = createStyledText<DisplayProps>("display")
