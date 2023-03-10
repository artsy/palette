import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"
import { compose, ResponsiveValue, system } from "styled-system"
import { boxMixin, BoxProps } from "../Box"

const textDecoration = system({ textDecoration: true })

export interface LinkProps extends BoxProps {
  textDecoration?: ResponsiveValue<string>
}

const linkMixin = compose(boxMixin, textDecoration)

/**
 * Basic <a> tag styled with additional LinkProps
 *
 * Tip: If working on Force, please use RouterLink.
 */
export const Link = styled.a<LinkProps>`
  color: currentColor;
  transition: color 0.25s;
  &:hover {
    color: ${themeGet("colors.blue100")};
  }
  &:visited {
    color: ${themeGet("colors.blue150")};
  }
  ${linkMixin};
`

Link.displayName = "Link"

Link.defaultProps = {
  textDecoration: "underline",
}
