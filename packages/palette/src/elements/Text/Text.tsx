import { themeGet } from "@styled-system/theme-get"
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
import { Color, getThemeConfig } from "../../Theme"
import { Box, BoxProps } from "../Box"
import { TextVariant } from "./tokens/types"
import { TEXT_VARIANTS as V2_TEXT_VARIANTS } from "./tokens/v2"
import { TEXT_VARIANTS as V3_TEXT_VARIANTS } from "./tokens/v3"

/** BaseTextProps */
export type BaseTextProps = TypographyProps &
  Omit<ColorProps, "color"> & {
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

type TextTransform =
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
  ${(props) => {
    return getThemeConfig(props, {
      v2: css`
        ${variant({ variants: V2_TEXT_VARIANTS.small })}
        ${textMixin}

        @media (min-width: ${themeGet("breakpoints.0")}) {
          ${variant({ variants: V2_TEXT_VARIANTS.large })}
          ${textMixin}
        }
      `,
      v3: css`
        ${variant({ variants: V3_TEXT_VARIANTS })}
        ${textMixin}
      `,
    })
  }}

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
`

Text.displayName = "Text"

Text.defaultProps = {
  fontFamily: "sans",
  variant: "text",
}
