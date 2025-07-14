import composeRefs from "@seznam/compose-react-refs"
import { themeGet } from "@styled-system/theme-get"
import React, { forwardRef, useRef } from "react"
import styled from "styled-components"
import { Clickable, ClickableProps } from "../Clickable"

export type AutocompleteInputOptionProps = ClickableProps

export const AutocompleteInputOption = forwardRef<
  HTMLButtonElement,
  AutocompleteInputOptionProps
>(({ children, ...rest }, forwardedRef) => {
  const ref = useRef<HTMLButtonElement | null>(null)

  return (
    <Container ref={composeRefs(ref, forwardedRef) as any} bg="mono0" {...rest}>
      {children}
    </Container>
  )
})

AutocompleteInputOption.displayName = "AutocompleteInputOption"

const Container = styled(Clickable)`
  display: block;
  width: 100%;

  &:focus,
  &:active {
    outline: 0;
    background-color: ${themeGet("colors.mono5")};
  }
`
