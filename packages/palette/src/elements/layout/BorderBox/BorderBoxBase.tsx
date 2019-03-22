// @ts-ignore
import React from "react"

import { color, space } from "../../../helpers"
import { styledWrapper } from "../../../platform/primitives"
import { Flex, FlexProps } from "../Flex"

import {
  background,
  BackgroundProps,
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
  ${height};
  ${maxWidth};
  ${styledSpace};
  ${width};
`
