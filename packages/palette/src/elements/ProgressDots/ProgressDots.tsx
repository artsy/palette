import React from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import { Box, BoxProps } from "../Box"
import { Clickable } from "../Clickable"
import { VisuallyHidden } from "../VisuallyHidden"

const VARIANTS = {
  dot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
  },
  dash: {
    height: "1px",
    flex: 1,
  },
}

type Variant = keyof typeof VARIANTS

/** ProgressDotsProps */
export interface ProgressDotsProps extends BoxProps {
  activeIndex: number
  amount: number
  variant?: Variant
  onClick?: (index: number) => void
}

/**
 * Renders an `amount` of dots and announces progress when updated
 */
export const ProgressDots: React.FC<ProgressDotsProps> = ({
  activeIndex,
  amount,
  variant: indicatorVariant = "dot",
  onClick,
  ...rest
}) => {
  return (
    <>
      <Box
        role="presentation"
        display="flex"
        alignItems="center"
        justifyContent="center"
        my={0.5}
        {...rest}
      >
        {Array.from(Array(amount)).map((_, i) => {
          const indicator = (
            <Indicator
              key={i}
              variant={indicatorVariant}
              bg={i === activeIndex ? "black100" : "black30"}
              mx={0.5}
            />
          )

          const handleClick = () => onClick && onClick(i)

          if (onClick) {
            return (
              <Clickable
                key={i}
                display="block"
                position="relative"
                width={indicatorVariant === "dash" ? "100%" : "auto"}
                onClick={handleClick}
              >
                {/* Pads out hit area. */}
                <Box
                  position="absolute"
                  top={-10}
                  bottom={-10}
                  left={0}
                  width="100%"
                />

                {indicator}
              </Clickable>
            )
          }

          return indicator
        })}
      </Box>

      <VisuallyHidden aria-live="polite" aria-atomic="true">
        Page {activeIndex + 1} of {amount}
      </VisuallyHidden>
    </>
  )
}

const Indicator = styled(Box)<{
  variant: Variant
  onClick?: (index: number) => void
}>`
  ${variant({ variants: VARIANTS })}
  transition: background-color 250ms;
`

Indicator.displayName = "Indicator"
