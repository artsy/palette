import { styled as primitives } from "../../platform/primitives"

import {
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system"

// @ts-ignore
import { ClassAttributes, HTMLAttributes } from "react"

export interface FlexProps extends SpaceProps, LayoutProps, FlexboxProps {}

/**
 * A utility component that encapsulates flexbox behavior
 */
export const Flex = primitives.View<FlexProps>`
  display: flex;
  ${compose(
    flexbox,
    layout,
    space
  )}
`

Flex.displayName = "Flex"
