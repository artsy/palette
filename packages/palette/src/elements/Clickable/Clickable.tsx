import React from "react"
import styled from "styled-components"
import { compose, ResponsiveValue, system } from "styled-system"
import { splitProps } from "../../utils/splitProps"
import { boxMixin, BoxProps } from "../Box"

const cursor = system({ cursor: true })
const textDecoration = system({ textDecoration: true })

/** ClickableProps */
export type ClickableProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  BoxProps & {
    cursor?: ResponsiveValue<string>
    textDecoration?: ResponsiveValue<string>
  }

const clickableMixin = compose(boxMixin, cursor, textDecoration)

/**
 * Clickable is a utility component useful for wrapping things like <div>s
 * without having to deal with the requirements to make the <div> accessible.
 */
export const Clickable = styled.button<ClickableProps>`
  appearance: none;
  padding: 0;
  border: 0;
  margin: 0;
  background-color: transparent;
  color: inherit;
  font: inherit;
  text-align: inherit;

  ${clickableMixin}

  &:disabled {
    cursor: default;
  }
`

Clickable.defaultProps = {
  cursor: "pointer",
  type: "button",
}

export const splitClickableProps = splitProps<ClickableProps>(clickableMixin)
