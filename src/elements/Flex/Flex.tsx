import { styled as primitives } from "../../platform/primitives"

import {
  alignContent,
  AlignContentProps,
  alignItems,
  AlignItemsProps,
  bottom,
  BottomProps,
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
  position,
  PositionProps,
  space,
  SpaceProps,
  style,
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

export interface FlexProps
  extends AlignItemsProps,
    AlignContentProps,
    FlexBasisProps,
    FlexDirectionProps,
    FlexWrapProps,
    JustifyContentProps,
    SpaceProps,
    HeightProps,
    WidthProps,
    MaxHeightProps,
    MaxWidthProps,
    PositionProps,
    BottomProps,
    ZIndexProps {
  flexGrow?: number | string
}

/**
 * A utility component that encapsulates flexbox behavior
 */
export const Flex = primitives.View<FlexProps>`
  display: flex;
  ${alignContent};
  ${alignItems};
  ${flexBasis};
  ${flexDirection};
  ${flexGrow};
  ${flexWrap};
  ${justifyContent};
  ${space};
  ${height};
  ${maxHeight};
  ${width};
  ${maxWidth};
  ${position};
  ${bottom};
  ${zIndex};
`

Flex.displayName = "Flex"
