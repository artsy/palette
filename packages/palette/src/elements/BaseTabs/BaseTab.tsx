import React from "react"
import styled, { css } from "styled-components"
import { getThemeConfig } from "../../Theme"
import { Clickable, ClickableProps } from "../Clickable"
import { Text, TextProps } from "../Text"
import { STATES as V2_STATES } from "./tokens/v2"
import { STATES as V3_STATES } from "./tokens/v3"

/**
 * Utilize as="a" or as={Component} to alter functionality
 */
export type BaseTabProps = TextProps & {
  active?: boolean
  focus?: boolean
  hover?: boolean
} & (
    | // Default:
    { as?: keyof JSX.IntrinsicElements | React.ComponentType }
    // When displaying as an anchor tag, accept anchor props:
    | ({ as: "a" } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
    // When displaying as an anchor tag, accept anchor props:
    | ({ as: typeof Clickable } & ClickableProps)
  )

/**
 * Extends `Text`. Should always be nested within a `BaseTabs` container.
 *
 * Use the `as` prop to alter behavior.
 * E.g.: `<BaseTab as={RouterLink} to="/foo">Foo</BaseTab>`
 * or `<BaseTab as={Clickable} onClick={handleClick}>Foo</BaseTab>`
 */
export const BaseTab = styled(Text)<BaseTabProps>`
  display: flex;
  width: 100%;
  position: relative;
  text-decoration: none;
  white-space: nowrap;
  z-index: 1;

  ${(props) => {
    const states = getThemeConfig(props, { v2: V2_STATES, v3: V3_STATES })

    return css`
      ${states.default}
      ${props.hover && states.hover}
      ${props.focus && states.focus}
      ${props.active && states.active}

      &:hover:not(:disabled) {
        ${states.hover}
      }

      &:focus {
        outline: 0;
        ${states.focus}
      }
    `
  }}
`

BaseTab.defaultProps = {
  variant: "mediumText",
  mb: "-1px",
  alignItems: "flex-start",
  justifyContent: "center",
  textAlign: "center",
}

BaseTab.displayName = "BaseTab"

/**
 * So this is interesting: We can trick styled-components into correcting the CSS specificity (Text > Clickable)
 * by simply including a Clickable here.
 */
// @ts-ignore
const __Ignore__ = Clickable
