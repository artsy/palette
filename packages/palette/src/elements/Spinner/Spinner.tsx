// @ts-ignore
import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import { color } from "../../helpers"
import { Color } from "../../Theme"

export interface SpinnerProps {
  /** Delay before spinner appears */
  delay?: number
  /** Width of the spinner */
  width?: number
  /** Height of the spinner */
  height?: number
  /** Size of the spinner */
  size?: "small" | "medium" | "large"
  /** Color of the spinner */
  color?: Color | "currentColor"
}

/**
 * Returns width and height of spinner based on size
 * @param props
 */
export const getSize = (props: SpinnerProps) => {
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

const spin = keyframes`
  100% {
    transform: rotate(360deg)
  }
`

/** Generic Spinner component */
export const Spinner: React.FC<SpinnerProps> = (props) => {
  const [show, setShow] = useState(props.delay === 0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, props.delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  if (!show) {
    return null
  }

  return <SpinnerBar {...props} />
}

const SpinnerBar = styled.div<SpinnerProps>`
  animation: ${spin} 1s infinite linear;
  position: absolute;

  ${(props) => {
    const { width, height } = getSize(props)

    return `
      background-color: ${
        props.color === "currentColor" ? "currentColor" : color(props.color)
      };
      width: ${width}px;
      height: ${height}px;
      top: calc(50% - ${height}px / 2);
      left: calc(50% - ${width}px / 2);
    `
  }};
`

Spinner.defaultProps = {
  delay: 0,
  width: 25,
  height: 6,
  color: "black100",
}

Spinner.displayName = "Spinner"
