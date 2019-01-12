// @ts-ignore
import React from "react"
import styled, { keyframes } from "styled-components"

export interface SpinnerProps {
  /** Width of the spinner */
  width?: number
  /** Height of the spinner */
  height?: number
  /** Size of the spinner */
  size?: "small" | "medium" | "large"
}

const spin = keyframes`
  100% {
    transform: rotate(360deg)
  }
`

const getSize = (props: SpinnerProps) => {
  const base = { width: 25, height: 6 }

  switch (props.size) {
    case "small":
      return {
        width: base.width * 0.5,
        height: base.height * 0.5,
      }
    case "medium":
      return {
        width: base.width * 0.8,
        height: base.height * 0.8,
      }
    case "large":
      return {
        width: base.width,
        height: base.height,
      }
    default:
      return {
        width: props.width,
        height: props.height,
      }
  }
}

/** Generic Spinner component */
export const Spinner = styled.div<SpinnerProps>`
  background: black;
  animation: ${spin} 1s infinite linear;
  position: absolute;

  ${props => {
    const { width, height } = getSize(props)

    return `
      width: ${width}px;
      height: ${height}px;
      top: calc(50% - ${height}px / 2);
      left: calc(50% - ${width}px / 2);
    `
  }};
`

// @ts-ignore
Spinner.defaultProps = {
  width: 25,
  height: 6,
}

Spinner.displayName = "Spinner"
