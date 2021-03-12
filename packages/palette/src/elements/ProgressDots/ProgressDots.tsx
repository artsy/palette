import React from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import { useThemeConfig } from "../../Theme"
import { Box, BoxProps } from "../Box"
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

const Indicator = styled(Box)<{ variant: Variant }>`
  ${variant({ variants: VARIANTS })}
  transition: background-color 250ms;
`

Indicator.displayName = "Indicator"

/** ProgressDotsProps */
export interface ProgressDotsProps extends BoxProps {
  activeIndex: number
  amount: number
  variant?: Variant
}

/**
 * Renders an `amount` of dots and announces progress when updated
 */
export const ProgressDots: React.FC<ProgressDotsProps> = ({
  activeIndex,
  amount,
  variant: indicatorVariant = "dot",
  ...rest
}) => {
  const bgColor = useThemeConfig({ v2: "black10", v3: "black30" })

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
        {[...new Array(amount)].map((_, i) => (
          <Indicator
            key={i}
            variant={indicatorVariant}
            bg={i === activeIndex ? "black100" : bgColor}
            mx={0.5}
          />
        ))}
      </Box>

      <VisuallyHidden aria-live="polite" aria-atomic="true">
        Page {activeIndex + 1} of {amount}
      </VisuallyHidden>
    </>
  )
}
