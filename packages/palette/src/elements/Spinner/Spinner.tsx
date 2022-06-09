import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import { ResponsiveValue, variant } from "styled-system"
import { Box, BoxProps } from "../Box"

const SPINNER_VARIANTS = {
  small: {
    width: 12.5,
    height: 3,
    // TODO: Remove `top` and `left`
    top: "calc(50% - 1.5px)",
    left: "calc(50% - 6.25px)",
  },

  medium: {
    width: 20,
    height: 4.8,
    // TODO: Remove `top` and `left`
    top: "calc(50% - 2.4px)",
    left: "calc(50% - 10px)",
  },

  large: {
    width: 25,
    height: 6,
    // TODO: Remove `top` and `left`
    top: "calc(50% - 3px)",
    left: "calc(50% - 12.5px)",
  },
} as const

export type SpinnerSize = keyof typeof SPINNER_VARIANTS

export interface SpinnerProps
  extends Omit<BoxProps, "size" | "width" | "height"> {
  /** Delay before spinner appears */
  delay?: number
  /** Size of the spinner */
  size?: ResponsiveValue<SpinnerSize>
  /** Color of the spinner */
  color?: ResponsiveValue<string>
}

/** Generic Spinner component */
export const Spinner: React.FC<SpinnerProps> = ({ delay, color, ...rest }) => {
  const [show, setShow] = useState(delay === 0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [delay])

  if (!show) return null

  return <Bar bg={color ?? "currentColor"} {...rest} />
}

const spin = keyframes`
  100% {
    transform: rotate(360deg)
  }
`

const Bar = styled(Box)`
  animation: ${spin} 1s infinite linear;
  ${variant({ variants: SPINNER_VARIANTS, prop: "size" })}
`

Spinner.defaultProps = {
  // TODO: Remove `position`
  position: "absolute",
  delay: 0,
  size: "large",
  color: "black100",
}

Spinner.displayName = "Spinner"
