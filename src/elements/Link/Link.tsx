import styled from "styled-components"
import { color as styledColor, space, SpaceProps } from "styled-system"
import { color } from "../../helpers"
import { Color } from "../../Theme"

enum UnderlineBehavior {
  Default = "default",
  Hover = "hover",
  None = "none",
}

export interface LinkProps extends SpaceProps {
  color?: Color
  hoverColor?: Color
  noUnderline?: boolean
  underlineBehavior?: UnderlineBehavior
}

const computeUnderline = (
  state: string,
  behavior: UnderlineBehavior
): string => {
  const blocklist: UnderlineBehavior[] =
    state === "hover"
      ? [UnderlineBehavior.None]
      : [UnderlineBehavior.Hover, UnderlineBehavior.None]
  const none = blocklist.includes(behavior)
  return none ? "none" : "underline"
}

const backwardsCompatCompute = (state: string, props: LinkProps) => {
  const behavior = props.noUnderline
    ? UnderlineBehavior.Hover
    : props.underlineBehavior
  return computeUnderline(state, behavior)
}

/**
 * Basic <a> tag styled with additional LinkProps
 * Spec: https://zpl.io/2Gm6D3d
 */
export const Link = styled.a<LinkProps>`
  color: ${color("black100")};
  transition: color 0.25s;
  text-decoration: ${props => backwardsCompatCompute("normal", props)};
  &:hover {
    text-decoration: ${props => backwardsCompatCompute("hover", props)};
    color: ${props =>
      props.hoverColor ? color(props.hoverColor) : color("black100")};
  }
  ${space};
  ${styledColor};
`

Link.displayName = "Link"

Link.defaultProps = {
  underlineBehavior: UnderlineBehavior.Default,
}
