import { styled as primitives } from "../../platform/primitives"

import {
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
} from "styled-system"

// @ts-ignore
import { ClassAttributes, HTMLAttributes } from "react"

export interface FlexProps
  extends SpaceProps,
    LayoutProps,
    FlexboxProps,
    PositionProps,
    ColorProps {}

/**
 * A utility component that encapsulates flexbox behavior
 */
export const Flex = primitives.View<FlexProps>`
  display: flex;
  ${compose(
    color,
    flexbox,
    layout,
    position,
    space
  )}
`

Flex.displayName = "Flex"
