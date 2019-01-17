import styled from "styled-components"
import { color as styledColor, space, SpaceProps } from "styled-system"
import { color } from "../../helpers"
import { Color } from "../../Theme"

export interface LinkProps extends SpaceProps {
  noUnderline?: boolean
  color?: Color
}

/**
 * Basic <a> tag styled with additional LinkProps
 * Spec: https://zpl.io/2Gm6D3d
 */
export const Link = styled.a<LinkProps>`
  color: ${color("black100")};
  transition: color 0.25s;
  text-decoration: ${props =>
    props.noUnderline || props.color ? "none" : "underline"};
  &:hover {
    text-decoration: ${props => (props.color ? "none" : "underline")};
    color: ${color("black100")};
  }
  &:focus {
    color: ${props => (props.color ? color(props.color) : color("black100"))};
  }
  ${space};
  ${styledColor};
`
