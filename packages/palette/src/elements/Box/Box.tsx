// @ts-ignore
import React from "react"
import { styled as primitives } from "../../platform/primitives"

import {
  color,
  ColorProps,
  compose,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from "styled-system"

export interface BoxProps
  extends PositionProps,
    SpaceProps,
    ColorProps,
    LayoutProps {}

/**
 * Box is just a `View` or `div` (depending on the platform) with common styled-systems
 * hooks.
 */
export const Box = primitives.View<BoxProps>`
  ${compose(
    color,
    position,
    space,
    layout
  )}
`

Box.displayName = "Box"
