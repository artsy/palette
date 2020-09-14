import React from "react"
import styled from "styled-components"
import { compose, ResponsiveValue, system } from "styled-system"
import { boxMixin, BoxProps } from "../Box"

const cursor = system({ cursor: true })

export interface CursorProps {
  cursor?: ResponsiveValue<"pointer" | "default" | string>
}

const clickableMixin = compose(
  boxMixin,
  cursor
)

/**
 * ClickableProps
 */
export type ClickableProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  BoxProps &
  CursorProps

/**
 * Clickable is a utility component useful for wrapping things like <div>s
 * without having to deal with the requirements to make the <div> accessible.
 */
export const Clickable = styled.button<ClickableProps>`
  appearance: none;
  padding: 0;
  border: 0;
  background-color: transparent;
  ${clickableMixin}
`

Clickable.defaultProps = {
  cursor: "pointer",
}
