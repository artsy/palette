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
  compose,
  display,
  DisplayProps,
  height,
  HeightProps,
  left,
  LeftProps,
  maxHeight,
  MaxHeightProps,
  maxWidth,
  MaxWidthProps,
  minHeight,
  MinHeightProps,
  minWidth,
  MinWidthProps,
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
    ColorProps,
    DisplayProps,
    HeightProps,
    LeftProps,
    MaxWidthProps,
    MinWidthProps,
    MaxHeightProps,
    MinHeightProps,
    PositionProps,
    RightProps,
    SpaceProps,
    TextAlignProps,
    TopProps,
    WidthProps,
    ZIndexProps {}

/**
 * All the system functions for Box
 */
export const boxMixin = compose(
  background,
  bottom,
  display,
  height,
  left,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  position,
  right,
  styledColor,
  styledSpace,
  textAlign,
  top,
  width,
  zIndex
)

/**
 * Box is just a `View` or `div` (depending on the platform) with common styled-systems
 * hooks.
 */
export const Box = primitives.View<BoxProps>`
  ${boxMixin}
`

Box.displayName = "Box"
