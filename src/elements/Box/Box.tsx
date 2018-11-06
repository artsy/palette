// @ts-ignore
import React from "react"
import { styled as primitives } from "../../platform/primitives"

import {
  background,
  BackgroundProps,
  bottom,
  BottomProps,
  color as styledColor,
  ColorProps,
  display,
  DisplayProps,
  height,
  HeightProps,
  left,
  LeftProps,
  maxWidth,
  MaxWidthProps,
  position,
  PositionProps,
  right,
  RightProps,
  space as styledSpace,
  SpaceProps,
  textAlign,
  TextAlignProps,
  top,
  TopProps,
  width,
  WidthProps,
  zIndex,
  ZIndexProps,
} from "styled-system"

export interface BoxProps
  extends BackgroundProps,
    BottomProps,
    BottomProps,
    ColorProps,
    DisplayProps,
    HeightProps,
    LeftProps,
    LeftProps,
    MaxWidthProps,
    PositionProps,
    PositionProps,
    RightProps,
    SpaceProps,
    TextAlignProps,
    TopProps,
    WidthProps,
    ZIndexProps {}

/**
 * Box is just a `View` or `div` (depending on the platform) with common styled-systems
 * hooks.
 */
export const Box = primitives.View<BoxProps>`
  ${background};
  ${bottom};
  ${display};
  ${height};
  ${left};
  ${maxWidth};
  ${position};
  ${right};
  ${styledColor};
  ${styledSpace};
  ${textAlign};
  ${top};
  ${width};
  ${zIndex};
`
