import { themeGet } from "@styled-system/theme-get"
import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import { BoxProps } from "../../../dist"
import { Color } from "../../Theme"
import { Box } from "../Box"

export interface SpinnerProps extends Omit<BoxProps, "size"> {
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
export const Spinner: React.FC<SpinnerProps> = ({ delay, ...rest }) => {
  const [show, setShow] = useState(delay === 0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [delay])

  if (!show) {
    return null
  }

  return <SpinnerBar {...rest} />
}

const SpinnerBar = styled(Box)<SpinnerProps>`
  animation: ${spin} 1s infinite linear;

  ${(props) => {
    const { width, height } = getSize(props)

    return `
      background-color: ${
        props.color === "currentColor"
          ? "currentColor"
          : themeGet(`colors.${props.color}`)(props)
      };

      width: ${width}px;
      height: ${height}px;
      top: calc(50% - ${height}px / 2);
      left: calc(50% - ${width}px / 2);
    `
  }};
`
// TODO: Remove default `position`, `top`, & `left` props
Spinner.defaultProps = {
  position: "absolute",
  delay: 0,
  width: 25,
  height: 6,
  color: "black100",
}

Spinner.displayName = "Spinner"
