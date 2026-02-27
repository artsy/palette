import styled from "styled-components"
import {
  border,
  BorderProps,
  color,
  ColorProps,
  compose,
  space,
  SpaceProps,
  width,
  WidthProps,
} from "styled-system"

export interface SeparatorProps
  extends SpaceProps,
    WidthProps,
    BorderProps,
    ColorProps {}

/**
 * A horizontal divider whose width and spacing can be adjusted
 */
export const Separator = styled.div.attrs<SeparatorProps>((props) => ({
  width: props.width ?? "100%",
  color: props.color ?? "mono10",
}))<SeparatorProps>`
  border-width: 1px;
  border-style: solid;
  border-bottom-width: 0;
  background-color: transparent;
  border-color: currentColor;
  margin: 0;
  ${compose(space, width, border, color)};
`
