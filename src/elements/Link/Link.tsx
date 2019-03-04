import styled from "styled-components"
import { color as styledColor, space, SpaceProps } from "styled-system"
import { color } from "../../helpers"
import { Color } from "../../Theme"

enum UnderlineBehavior {
  Default = "default",
  Hover = "hover",
  None = "none",
}

const computeUnderline = (state: string, behavior: UnderlineBehavior): string => {
  const blocklist: UnderlineBehavior[] = state === "hover" ? [UnderlineBehavior.None] : [UnderlineBehavior.Hover, UnderlineBehavior.None]
  const none = blocklist.includes(behavior)
  return none ? "none" : "underline"
}

export interface LinkProps extends SpaceProps {
  underlineBehavior: UnderlineBehavior
  color?: Color
}

/**
 * Basic <a> tag styled with additional LinkProps
 * Spec: https://zpl.io/2Gm6D3d
 */
export const Link = styled.a<LinkProps>`
  color: ${color("black100")};
  transition: color 0.25s;
  text-decoration: ${props => (computeUnderline("normal", props.underlineBehavior))};
  &:hover {
    text-decoration: ${props => (computeUnderline("hover", props.underlineBehavior))};
    color: ${color("black100")};
  }
  &:focus {
    color: ${props => (props.color ? color(props.color) : color("black100"))};
  }
  ${space};
  ${styledColor};
`

Link.displayName = "Link"

Link.defaultProps = {
  underlineBehavior: UnderlineBehavior.Default
}
