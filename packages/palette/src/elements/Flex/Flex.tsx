import { styled as primitives } from "../../platform/primitives"

import {
  alignContent,
  AlignContentProps,
  alignItems,
  AlignItemsProps,
  alignSelf,
  AlignSelfProps,
  background,
  BackgroundProps,
  borderRadius,
  BorderRadiusProps,
  bottom,
  BottomProps,
  compose,
  display,
  DisplayProps,
  flex,
  flexBasis,
  FlexBasisProps,
  flexDirection,
  FlexDirectionProps,
  FlexProps as SystemFlexProps,
  flexWrap,
  FlexWrapProps,
  height,
  HeightProps,
  justifyContent,
  JustifyContentProps,
  justifyItems,
  JustifyItemsProps,
  justifySelf,
  JustifySelfProps,
  maxHeight,
  MaxHeightProps,
  maxWidth,
  MaxWidthProps,
  order,
  OrderProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  style,
  top,
  TopProps,
  width,
  WidthProps,
  zIndex,
  ZIndexProps,
} from "styled-system"

// @ts-ignore
import { ClassAttributes, HTMLAttributes } from "react"

const flexGrow = style({
  prop: "flexGrow",
})

const flexShrink = style({
  prop: "flexShrink",
})

export interface FlexProps
  extends AlignContentProps,
    AlignItemsProps,
    AlignSelfProps,
    BackgroundProps,
    BorderRadiusProps,
    BottomProps,
    DisplayProps,
    FlexBasisProps,
    FlexDirectionProps,
    FlexWrapProps,
    HeightProps,
    JustifyContentProps,
    JustifyItemsProps,
    JustifySelfProps,
    MaxHeightProps,
    MaxWidthProps,
    OrderProps,
    PositionProps,
    SpaceProps,
    SystemFlexProps,
    TopProps,
    WidthProps,
    ZIndexProps {
  flexGrow?: number | string
  flexShrink?: number | string
}

const flexMixin = compose(
  alignContent,
  alignItems,
  alignSelf,
  background,
  borderRadius,
  bottom,
  display,
  flex,
  flexBasis,
  flexDirection,
  flexWrap,
  height,
  justifyContent,
  justifyItems,
  justifySelf,
  maxHeight,
  maxWidth,
  order,
  position,
  space,
  top,
  width,
  zIndex
)

/**
 * A utility component that encapsulates flexbox behavior
 */
export const Flex = primitives.View<FlexProps>`
  display: flex;
  ${flexMixin}
  ${flexGrow}
  ${flexShrink}
`

Flex.displayName = "Flex"
