import React from "react"
import styled, { css } from "styled-components"
import { Clickable } from "../Clickable"
import { Text, TextProps } from "../Text"
import { STATES } from "./tokens"

/**
 * Utilize as="a" or as={Component} to alter functionality
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseTabProps<C extends React.ComponentType = any> = TextProps & {
  active?: boolean
  focus?: boolean
  hover?: boolean
} & React.ComponentPropsWithoutRef<C> & { as?: C }

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
    return css`
      ${STATES.default}
      ${props.hover && STATES.hover}
      ${props.focus && STATES.focus}
      ${props.active && STATES.active}

      &:hover:not(:disabled) {
        ${STATES.hover}
      }

      &:focus {
        outline: 0;
        ${STATES.focus}
      }
    `
  }}
`

BaseTab.defaultProps = {
  variant: "sm",
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
// @ts-expect-error  MIGRATE_STRICT_MODE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const __Ignore__ = Clickable
