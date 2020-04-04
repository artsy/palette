import { styled as primitives } from "../../platform/primitives"

import {
  alignContent,
  AlignContentProps,
  alignItems,
  AlignItemsProps,
  background,
  BackgroundProps,
  borderRadius,
  BorderRadiusProps,
  bottom,
  BottomProps,
  display,
  DisplayProps,
  flexBasis,
  FlexBasisProps,
  flexDirection,
  FlexDirectionProps,
  flexWrap,
  FlexWrapProps,
  height,
  HeightProps,
  justifyContent,
  JustifyContentProps,
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
  extends AlignItemsProps,
    AlignContentProps,
    BackgroundProps,
    BottomProps,
    TopProps,
    BorderRadiusProps,
    DisplayProps,
    FlexBasisProps,
    FlexDirectionProps,
    FlexWrapProps,
    HeightProps,
    JustifyContentProps,
    MaxHeightProps,
    MaxWidthProps,
    OrderProps,
    PositionProps,
    SpaceProps,
    WidthProps,
    ZIndexProps {
  flexGrow?: number | string
  flexShrink?: number | string
}

/**
 * A utility component that encapsulates flexbox behavior
 */
export const Flex = primitives.View<FlexProps>`
  display: flex;
  ${alignContent};
  ${alignItems};
  ${background};
  ${bottom};
  ${borderRadius};
  ${display};
  ${flexBasis};
  ${flexDirection};
  ${flexGrow};
  ${flexShrink};
  ${flexWrap};
  ${height};
  ${justifyContent};
  ${maxHeight};
  ${maxWidth};
  ${order};
  ${position};
  ${space};
  ${top};
  ${width};
  ${zIndex};
`

Flex.displayName = "Flex"
