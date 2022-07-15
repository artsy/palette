import React from "react"
import styled from "styled-components"
import { CheckIcon } from "../../svgs"
import { Box } from "../Box"
import { CHECK_STATES } from "./tokens"

export interface CheckProps {
  disabled?: boolean
  error?: boolean
  hover?: boolean
  focus?: boolean
  selected?: boolean
}

/** Toggeable check mark */
export const Check: React.FC<CheckProps> = ({
  disabled,
  selected,
  ...rest
}) => {
  return (
    <Container
      mr={1}
      border="1px solid"
      disabled={disabled}
      selected={selected}
      {...rest}
    >
      <CheckIcon aria-hidden fill={"currentColor" as any} />
    </Container>
  )
}

const Container = styled(Box)<CheckProps>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.25s, border-color 0.25s, color 0.25s;

  ${(props) => {
    const mode = (() => {
      switch (true) {
        case props.focus:
          return CHECK_STATES.focus
        case props.hover:
          return CHECK_STATES.hover
        case props.error:
          return CHECK_STATES.error
        case props.disabled:
          return CHECK_STATES.disabled
        default:
          return CHECK_STATES.default
      }
    })()

    return props.selected ? mode.selected : mode.resting
  }};
`
