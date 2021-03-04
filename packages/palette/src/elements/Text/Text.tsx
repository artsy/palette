import { themeGet } from "@styled-system/theme-get"
import styled, { css } from "styled-components"
import {
  color,
  ColorProps,
  compose,
  ResponsiveValue,
  style,
  typography,
  TypographyProps,
  variant,
} from "styled-system"
import { Color } from "../../Theme"
import { Box, BoxProps } from "../Box"
import { TextVariant } from "./tokens/types"
import { TEXT_VARIANTS as V2_TEXT_VARIANTS } from "./tokens/v2"
import { TEXT_VARIANTS as V3_TEXT_VARIANTS } from "./tokens/v3"

/** BaseTextProps */
export type BaseTextProps = TypographyProps &
  Omit<ColorProps, "color"> & {
    variant?: ResponsiveValue<TextVariant>
    textColor?: ResponsiveValue<Color>
  }

const textColor = style({
  prop: "textColor",
  cssProperty: "color",
  key: "colors",
})

/** styled functions for Text */
export const textMixin = compose(typography, color, textColor)

/** Adds ellipsis to overflowing text */
export const overflowEllipsisMixin = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

/** TextProps */
export type TextProps = BaseTextProps &
  BoxProps & { overflowEllipsis?: boolean }

/** Text */
export const Text = styled(Box)<TextProps>`
  ${(props) => {
    if (props.theme.id === "v2") {
      return css`
        ${variant({ variants: V2_TEXT_VARIANTS.small })(props)}
        ${textMixin}

      @media (min-width: ${themeGet("breakpoints.0")}) {
          ${variant({ variants: V2_TEXT_VARIANTS.large })}
          ${textMixin}
        }
      `
    }

    return css`
      ${variant({ variants: V3_TEXT_VARIANTS })(props)}
      ${textMixin}
    `
  }}

  ${({ overflowEllipsis }) => overflowEllipsis && overflowEllipsisMixin}
`

Text.displayName = "Text"

Text.defaultProps = {
  fontFamily: "sans",
  variant: "text",
}
