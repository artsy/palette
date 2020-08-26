import React from "react"
import styled, { css } from "styled-components"
import { color, space } from "../../helpers"
import { Box, BoxProps } from "../Box"
import { VisuallyHidden } from "../VisuallyHidden"

const DOT_COLOR_MS = 250

const Dot = styled(Box).attrs({ m: 0.5 })<{ active: boolean }>`
  width: ${space(0.5)}px;
  height: ${space(0.5)}px;
  border-radius: 50%;
  background-color: ${color("black10")};
  transition: background-color ${DOT_COLOR_MS}ms;

  ${({ active }) =>
    active &&
    css`
      background-color: ${color("black100")};
    `}
`

Dot.displayName = "Dot"

/** ProgressDotsProps */
export interface ProgressDotsProps extends BoxProps {
  activeIndex: number
  amount: number
}

/**
 * Renders an `amount` of dots and announces progress when updated
 */
export const ProgressDots: React.FC<ProgressDotsProps> = ({
  activeIndex,
  amount,
  ...rest
}) => {
  return (
    <>
      <Box
        role="presentation"
        display="flex"
        alignItems="center"
        justifyContent="center"
        {...rest}
      >
        {[...new Array(amount)].map((_, i) => (
          <Dot key={i} active={i === activeIndex} />
        ))}
      </Box>

      <VisuallyHidden aria-live="polite" aria-atomic="true">
        Page {activeIndex + 1} of {amount}
      </VisuallyHidden>
    </>
  )
}
