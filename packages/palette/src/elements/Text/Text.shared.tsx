import {
  color,
  ColorProps,
  compose,
  ResponsiveValue,
  style,
  typography,
  TypographyProps,
} from "styled-system"
import { Color } from "../../Theme"
import { TextVariant } from "./tokens"

/**
 * Text
 */
export type TextProps = TypographyProps &
  ColorProps & {
    variant?: TextVariant
    textColor?: ResponsiveValue<Color>
  }

const textColor = style({
  prop: "textColor",
  cssProperty: "color",
  key: "colors",
})

/**
 * styled functions for Text
 */
export const textMixin = compose(
  typography,
  color,
  textColor
)
