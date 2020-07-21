import { styled as primitives } from "../../platform/primitives"

import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  color,
  ColorProps,
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
} from "styled-system"

export interface BoxProps
  extends BackgroundProps,
    BorderProps,
    Omit<ColorProps, "color">,
    FlexboxProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    TextAlignProps {}

/**
 * All the system functions for Box
 */
export const boxMixin = compose(
  background,
  border,
  color,
  flexbox,
  layout,
  position,
  space,
  textAlign
)

/**
 * Box is just a `View` or `div` (depending on the platform) with common styled-systems
 * hooks.
 */
export const Box = primitives.View<BoxProps>`
  ${boxMixin}
`

Box.displayName = "Box"

/** RegExp for filtering BoxProps */
export const BOX_PROP_REGEX = new RegExp(`^(${boxMixin.propNames.join("|")})$`)

/** Splits out props into valid and invalid BoxProps */
export const splitBoxProps = <
  T extends BoxProps,
  U extends Omit<T, keyof BoxProps>
>(
  props: T
): [BoxProps, U] => {
  const boxProps = {} as T
  const notBoxProps = {} as U

  for (const key of Object.keys(props)) {
    if (BOX_PROP_REGEX.test(key)) {
      boxProps[key] = props[key]
      continue
    }

    notBoxProps[key] = props[key]
  }

  return [boxProps, notBoxProps]
}
