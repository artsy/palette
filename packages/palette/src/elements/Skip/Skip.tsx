import React from "react"
import styled from "styled-components"
import { Clickable, ClickableProps } from "../Clickable"
import { Text } from "../Text"
import { visuallyHiddenMixin } from "../VisuallyHidden"

const Container = styled(Clickable)`
  display: block;
  text-decoration: underline;
  outline: 0;

  &:not(:focus):not(:active) {
    ${visuallyHiddenMixin}
  }
`

/**
 * Either a button or an anchor tag
 */
export type SkipProps =
  | ClickableProps
  | ClickableProps & {
      as: "a"
      href: string
    }

/** Skip */
export const Skip = React.forwardRef(
  (
    { children, ...rest }: SkipProps,
    forwardedRef: React.MutableRefObject<HTMLButtonElement>
  ) => {
    return (
      <Container
        ref={forwardedRef as any}
        display="block"
        bg="black10"
        {...rest}
      >
        <Text p={1} variant="text">
          {children}
        </Text>
      </Container>
    )
  }
)
