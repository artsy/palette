import React, { useRef, useState } from "react"
import styled from "styled-components"
import { DROP_SHADOW } from "../../helpers"
import { useThemeConfig } from "../../Theme"
import { Position, usePosition } from "../../utils/usePosition"
import { Box, BoxProps } from "../Box"
import { Text, TextVariant } from "../Text"

export interface TooltipProps
  extends BoxProps,
    React.HTMLAttributes<HTMLDivElement> {
  content: React.ReactNode
  placement?: Position
  size?: "sm" | "lg"
  width?: number
  visible?: boolean
}

/**
 * A tooltip
 */
export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content: _content,
  size = "lg",
  width = 230,
  placement = "bottom-end",
  visible,
  ...rest
}) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const anchorRef = useRef<HTMLDivElement | null>(null)

  const [active, setActive] = useState(false)

  const handleClick = () => {
    setActive((prevActive) => !prevActive)
  }

  const activate = () => {
    setActive(true)
  }

  const deactivate = () => {
    setActive(false)
  }

  const content = typeof _content === "string" ? truncate(_content) : _content

  const tokens = useThemeConfig({
    v2: { variant: "small" as TextVariant },
    v3: { variant: "xs" as TextVariant },
  })

  usePosition({
    anchorRef,
    tooltipRef,
    position: placement,
    offset: 10,
    active: visible ?? active,
  })

  return (
    <Box
      tabIndex={1}
      onClick={handleClick}
      onMouseOver={activate}
      onMouseOut={deactivate}
      onFocus={activate}
      onBlur={deactivate}
      display="inline-block"
      {...rest}
    >
      <Tip
        p={size === "sm" ? 0.5 : 2}
        width={width}
        bg="white100"
        ref={tooltipRef as any}
        zIndex={1}
        {...(visible
          ? // If there's a visible prop being passed; use that
            { opacity: visible ? 1 : 0 }
          : // Otherwise use the active state
            { opacity: active ? 1 : 0 })}
      >
        <Text variant={tokens.variant} color="black60">
          {content}
        </Text>
      </Tip>

      <Box ref={anchorRef as any}>{children}</Box>
    </Box>
  )
}

const truncate = (tip: string): string => {
  let substring = tip.substring(0, 300)

  if (substring !== tip) {
    substring += "…"
  }

  return substring
}

const Tip = styled(Box)`
  position: absolute;
  z-index: 1;
  transition: opacity 250ms ease-out;
  text-align: left;
  box-shadow: ${DROP_SHADOW};
  cursor: default;
  pointer-events: none;
`
