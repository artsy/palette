import React from "react"
import styled, { css } from "styled-components"
import { color } from "../../helpers"
import { Text, TextProps } from "../Text"

/**
 * Utilize as="a" or as={Component} to alter functionality
 */
export type BaseTabProps = TextProps & {
  active?: boolean
} & (// FIXME: Should be able to remove this typing once styled-components is updated
  // Default:
  | {}
    // When displaying as an anchor tag, accept anchor props:
    | ({ as: "a" } & (React.AnchorHTMLAttributes<HTMLAnchorElement>))
    // Cop-out: if you pass as with a complex component, loosen up the types:
    | ({ as: React.ReactElement<unknown> } & Record<string, unknown>))

const BaseTabActiveMixin = css`
  outline: 0;
  color: ${color("black100")};
  border-bottom-color: ${color("black100")} !important;
`

/**
 * Extends `Text`. Should always be nested within a `BaseTabs` container.
 *
 * Use the `as` prop to alter behavior.
 * E.g.: `<BaseTab as={RouterLink} to="/foo">Foo</BaseTab>`
 * or `<BaseTab as={Clickable} onClick={handleClick}>Foo</BaseTab>`
 */
export const BaseTab = styled(Text)<BaseTabProps>`
  display: block;
  width: 100%;
  position: relative;
  text-decoration: none;
  white-space: nowrap;
  z-index: 1;
  color: ${color("black60")};

  ${({ active }) => active && BaseTabActiveMixin}
  &:focus,
  &.active {
    ${BaseTabActiveMixin}
  }

  &:focus {
    color: ${color("purple100")};
  }
`

BaseTab.defaultProps = {
  variant: "mediumText",
  mb: "-1px",
  pb: 1.5,
  borderBottom: "2px solid",
  borderColor: "transparent",
}

BaseTab.displayName = "BaseTab"
