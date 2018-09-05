// @ts-ignore
import React from "react"

import { color } from "../helpers"
import { styled as primitives } from "../platform/primitives"
import { space, SpaceProps, width, WidthProps } from "styled-system"

interface SeparatorProps extends SpaceProps, WidthProps {}

/**
 * A horizontal divider whose width and spacing can be adjusted
 */
export const Separator = primitives.View.attrs<SeparatorProps>({})`
  border: 1px solid ${color("black10")};
  border-bottom-width: 0;
  ${space};
  ${width};
`

Separator.defaultProps = {
  width: "100%",
}
