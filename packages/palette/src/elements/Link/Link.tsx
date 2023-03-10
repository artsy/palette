import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"
import { color } from "../../helpers"
import { Color } from "../../Theme"
import { boxMixin, BoxProps } from "../Box"

type UnderlineBehaviors = "default" | "hover" | "none"

export interface LinkProps extends BoxProps {
  visitedColor?: Color
  hoverColor?: Color
  noUnderline?: boolean
  underlineBehavior?: UnderlineBehaviors
}

const computeUnderline = (
  state: string,
  behavior: UnderlineBehaviors
): string => {
  const blocklist: UnderlineBehaviors[] =
    state === "hover" ? ["none"] : ["hover", "none"]
  const none = blocklist.includes(behavior)
  return none ? "none" : "underline"
}

const backwardsCompatCompute = (state: string, props: LinkProps) => {
  const behavior = props.noUnderline ? "hover" : props.underlineBehavior
  return computeUnderline(state, behavior!)
}

/**
 * Basic <a> tag styled with additional LinkProps
 *
 * Tip: If working on Force, please use RouterLink.
 */
export const Link = styled.a<LinkProps>`
  color: inherit;
  transition: color 0.25s;
  text-decoration: ${(props) => backwardsCompatCompute("normal", props)};
  &:hover {
    text-decoration: ${(props) => backwardsCompatCompute("hover", props)};
    color: ${(props) =>
      props.hoverColor ? color(props.hoverColor) : themeGet("colors.blue100")};
  }
  &:visited {
    color: ${(props) =>
      props.visitedColor
        ? color(props.visitedColor)
        : themeGet("colors.blue150")};
  }
  ${boxMixin};
`

Link.displayName = "Link"

Link.defaultProps = {
  underlineBehavior: "default",
}
