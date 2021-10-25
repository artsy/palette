import composeRefs from "@seznam/compose-react-refs"
import { themeGet } from "@styled-system/theme-get"
import React, { forwardRef, useEffect, useRef } from "react"
import styled from "styled-components"
import { Clickable, ClickableProps } from "../Clickable"

export interface AutocompleteInputOptionProps extends ClickableProps {
  selected: boolean
}

export const AutocompleteInputOption: React.ForwardRefExoticComponent<
  AutocompleteInputOptionProps & { ref?: React.Ref<HTMLButtonElement> }
> = forwardRef(({ children, selected, ...rest }, forwardedRef) => {
  const ref = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!ref.current || !selected) return

    // @ts-ignore
    if (typeof ref.current.scrollIntoViewIfNeeded === "function") {
      // @ts-ignore
      ref.current.scrollIntoViewIfNeeded()
      return
    }

    ref.current.scrollIntoView?.()
  }, [selected])

  return (
    <Container
      ref={composeRefs(ref, forwardedRef) as any}
      bg="white100"
      {...rest}
    >
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
    background-color: ${themeGet("colors.black5")};
  }
`
