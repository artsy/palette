import styled from "styled-components"
import {
  color as styledColor,
  ColorProps,
  space,
  SpaceProps,
} from "styled-system"
import { color } from "../../helpers"

export interface LinkProps extends SpaceProps, ColorProps {
  noUnderline?: boolean
}

/**
 * Basic a tag
 */
export const Link = styled.a<LinkProps>`
  ${space};
  ${styledColor};
  text-decoration: ${props =>
    props.noUnderline || props.color ? "none" : "underline"};
  cursor: pointer;
  transition: color 0.25s;
  :hover {
    text-decoration: ${props => (props.color ? "none" : "underline")};
    color: ${color("black100")};
  }
  :focus {
    border: 1px solid ${color("purple100")};
    color: ${props =>
      props.color ? color(props.color as any) : color("black100")};
  }
`
