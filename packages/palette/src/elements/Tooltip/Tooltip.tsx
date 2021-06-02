import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { DROP_SHADOW } from "../../helpers"
import { useThemeConfig } from "../../Theme"
import { Box, BoxProps } from "../Box"
import { Text, TextVariant } from "../Text"

export interface TooltipProps
  extends BoxProps,
    React.HTMLAttributes<HTMLDivElement> {
  content: React.ReactNode
  placement?: "top" | "bottom"
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
  placement = "top",
  visible,
  ...rest
}) => {
  const innerWrapper = useRef<HTMLDivElement | null>(null)

  const [active, setActive] = useState(false)
  const [position, setPosition] = useState({
    left: 0,
    right: null,
    centered: true,
  })

  const computeTipPosition = () => {
    if (!innerWrapper.current) return

    let left = 0
    let right = null
    let centered = false

    const inner = innerWrapper.current.getBoundingClientRect()

    left = inner.width / 2
    centered = true
    const spillOver = width / 2 - left

    if (spillOver > inner.left) {
      centered = false
      left = 0
      right = null
    }

    if (spillOver > window.innerWidth - inner.right) {
      centered = false
      left = null
      right = 0
    }

    return {
      centered,
      left,
      right,
    }
  }

  useEffect(() => {
    const handler = () => setPosition(computeTipPosition())

    handler()
    window.addEventListener("resize", handler)

    return () => {
      window.removeEventListener("resize", handler)
    }
  }, [])

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

  return (
    <Box
      tabIndex={1}
      onClick={handleClick}
      onMouseOver={activate}
      onMouseOut={deactivate}
      onFocus={activate}
      onBlur={deactivate}
      position="relative"
      // TODO: Should avoid making assumptions about display
      display="inline-block"
      {...rest}
    >
      <Tip
        p={size === "sm" ? 0.5 : 2}
        width={width}
        bg="white100"
        {...(visible
          ? // If there's a visible prop being passed; use that
            { opacity: visible ? 1 : 0 }
          : // Otherwise use the active state
            { opacity: active ? 1 : 0 })}
        // Positioning
        {...{
          bottom: { top: "100%", mt: 0.5 },
          top: { bottom: "100%", mb: 0.5 },
        }[placement]}
        left={position.left ?? "auto"}
        right={position.right ?? "auto"}
        style={{
          transform: position.centered ? "translateX(-50%)" : "none",
        }}
      >
        <Text variant={tokens.variant} color="black60">
          {content}
        </Text>
      </Tip>

      <Box ref={innerWrapper as any}>{children}</Box>
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
  pointer-events: none;
  cursor: default;
`
