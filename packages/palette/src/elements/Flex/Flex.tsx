import tag from "clean-tag"
import styled from "styled-components"

import {
  alignContent,
  AlignContentProps,
  alignItems,
  AlignItemsProps,
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
    BottomProps,
    DisplayProps,
    FlexBasisProps,
    FlexDirectionProps,
    FlexWrapProps,
    HeightProps,
    JustifyContentProps,
    MaxHeightProps,
    MaxWidthProps,
    PositionProps,
    SpaceProps,
    WidthProps,
    ZIndexProps {
  flexGrow?: number | string
}

/**
 * A utility component that encapsulates flexbox behavior
 */
export const Flex = styled(tag)<FlexProps>`
  display: flex;
  ${alignContent};
  ${alignItems};
  ${bottom};
  ${display};
  ${flexBasis};
  ${flexDirection};
  ${flexGrow};
  ${flexWrap};
  ${height};
  ${justifyContent};
  ${maxHeight};
  ${maxWidth};
  ${position};
  ${space};
  ${width};
  ${zIndex};
`

Flex.displayName = "Flex"
