import styled from "styled-components"
import { space, SpaceProps, width, WidthProps } from "styled-system"
import { color } from "../../helpers"

export interface SeparatorProps extends SpaceProps, WidthProps {}

/**
 * A horizontal divider whose width and spacing can be adjusted
 */
export const Separator = styled.div<SeparatorProps>`
  border: 1px solid ${color("black10")};
  border-bottom-width: 0;
  ${space};
  ${width};
`

Separator.defaultProps = {
  width: "100%",
}
