import {
  TEXT_VARIANTS,
  TextVariant,
} from "@artsy/palette-tokens/dist/typography/v3"
import styled, { css } from "styled-components"
import {
  color,
  ColorProps,
  compose,
  ResponsiveValue,
  style,
  system,
  typography,
  TypographyProps,
  variant,
} from "styled-system"
import { Color } from "../../themes/types"
import { Box, BoxProps } from "../Box"

/** BaseTextProps */
export type BaseTextProps = TypographyProps &
  Omit<ColorProps, "color"> & {
    /**
     * @description
     * Variants of the text. Possible to pass an array that
     * behaves accordingly to the media breakpoints ["sm", "md", "lg", "xl"]
     * @example
     * "sm"
     * "md"
     * ["md", "sm"]
     * @see {@link TextVariant}
     */
    variant?: ResponsiveValue<TextVariant>
    textColor?: ResponsiveValue<Color>
    /**
     * Max number of lines before truncating the content with an ellipsis at the end of the last line.
     * Overwriting display is required for this.
     */
    lineClamp?: number
  }

const textColor = style({
  prop: "textColor",
  cssProperty: "color",
  key: "colors",
})

export type TextTransform =
  | "none"
  | "capitalize"
  | "uppercase"
  | "lowercase"
  | "initial"
  | "inherit"

const textTransform = system({ textTransform: true })

/** styled functions for Text */
export const textMixin = compose(typography, color, textColor, textTransform)

/** Adds ellipsis to overflowing text */
export const overflowEllipsisMixin = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

/** TextProps */
export type TextProps = BaseTextProps &
  BoxProps & {
    overflowEllipsis?: boolean
    textTransform?: ResponsiveValue<TextTransform>
    lineClamp?: ResponsiveValue<number>
  }

/** Text */
export const Text = styled(Box)<TextProps>`
  && {
    ${variant({ variants: TEXT_VARIANTS })}
    ${textMixin}

    ${(props) => {
      return css`
        ${props.overflowEllipsis && overflowEllipsisMixin}
        ${props.lineClamp &&
        css`
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: ${props.lineClamp};
          line-clamp: ${props.lineClamp};
          overflow: hidden;
        `}
      `
    }}
  }
`

Text.displayName = "Text"

Text.defaultProps = {
  fontFamily: "sans",
  variant: "sm",
}
