// @ts-ignore
import React from "react"

import { color, space } from "../../helpers"
import { styledWrapper } from "../../platform/primitives"
import { Flex, FlexProps } from "../Flex"

import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  height,
  HeightProps,
  maxWidth,
  MaxWidthProps,
  space as styledSpace,
  SpaceProps,
  width,
  WidthProps,
} from "styled-system"

export interface BorderBoxProps
  extends BackgroundProps,
    BorderProps,
    FlexProps,
    HeightProps,
    MaxWidthProps,
    SpaceProps,
    WidthProps {
  hover?: boolean
}

/**
 * A `View` or `div` (depending on the platform) that has a common border
 * and padding set by default
 */
export const BorderBoxBase = styledWrapper(Flex)<BorderBoxProps>`
  border: 1px solid ${color("black10")};
  border-radius: 2px;
  padding: ${space(2)}px;
  ${background};
  ${border};
  ${height};
  ${maxWidth};
  ${styledSpace};
  ${width};
`
