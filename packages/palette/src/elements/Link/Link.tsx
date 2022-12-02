import { Color } from "@artsy/palette-tokens/dist/themes/v3"
import styled from "styled-components"
import { color } from "../../helpers"
import { boxMixin, BoxProps } from "../Box"

type UnderlineBehaviors = "default" | "hover" | "none"

export interface LinkProps extends BoxProps {
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
 * @deprecated If working in Force, please use `RouterLink`.
 */
export const Link = styled.a<LinkProps>`
  color: ${color("black100")};
  transition: color 0.25s;
  text-decoration: ${(props) => backwardsCompatCompute("normal", props)};
  &:hover {
    text-decoration: ${(props) => backwardsCompatCompute("hover", props)};
    color: ${(props) =>
      props.hoverColor ? color(props.hoverColor) : color("black100")};
  }
  ${boxMixin};
`

Link.displayName = "Link"

Link.defaultProps = {
  underlineBehavior: "default",
}
