// @ts-ignore
import React from "react"
import styled, { keyframes } from "styled-components"
import { color } from "../../helpers"
import { getSize, SpinnerProps } from "./Spinner.shared"

const spin = keyframes`
  100% {
    transform: rotate(360deg)
  }
`

/** Generic Spinner component */
export const Spinner = styled.div<SpinnerProps>`
  animation: ${spin} 1s infinite linear;
  position: absolute;

  ${props => {
    const { width, height } = getSize(props)

    return `
      background: ${color(props.color)};
      width: ${width}px;
      height: ${height}px;
      top: calc(50% - ${height}px / 2);
      left: calc(50% - ${width}px / 2);
    `
  }};
`

Spinner.defaultProps = {
  width: 25,
  height: 6,
  color: "black100",
}

Spinner.displayName = "Spinner"
