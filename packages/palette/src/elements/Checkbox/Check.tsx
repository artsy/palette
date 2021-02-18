import React from "react"
import styled, { css } from "styled-components"
import { color, space } from "../../helpers"
import { CheckIcon } from "../../svgs"
import { Box } from "../Box"
import { CheckboxProps } from "./Checkbox"

const SIZE = 2 // 20px
const BORDER_WIDTH = 2 // 2px

const Container = styled(Box)<CheckProps>`
  width: ${space(SIZE)}px;
  height: ${space(SIZE)}px;
  transition: background-color 0.25s, border-color 0.25s;

  ${({ disabled, selected, error }) => {
    switch (true) {
      case disabled:
        return css`
          background-color: ${color("black5")};
          border-color: ${color("black10")};
        `
      case selected:
        return css`
          background-color: ${color("black100")};
          border-color: ${color("black100")};
        `
      case error:
        return css`
          background-color: ${color("white100")};
          border-color: ${color("red100")};
        `
      default:
        return css`
          background-color: ${color("white100")};
          border-color: ${color("black10")};
        `
    }
  }}

  svg {
    position: relative;
    top: -${BORDER_WIDTH}px;
    left: -${BORDER_WIDTH}px;
  }
`

export interface CheckProps
  extends Pick<CheckboxProps, "disabled" | "selected" | "error"> {}

/** Toggeable check mark */
export const Check: React.FC<CheckProps> = ({
  disabled,
  selected,
  ...rest
}) => {
  const iconColor = () => {
    if (disabled && selected) return "black30"
    if (disabled) return "black5"
    return "white100"
  }

  return (
    <Container
      mr={1}
      border={1}
      disabled={disabled}
      selected={selected}
      {...rest}
    >
      <CheckIcon aria-hidden fill={iconColor()} />
    </Container>
  )
}
