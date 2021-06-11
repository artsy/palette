import React, { useState } from "react"
import styled from "styled-components"
import { DROP_SHADOW } from "../../helpers"
import { Position, usePosition } from "../../utils/usePosition"
import { Box } from "../Box"
import { Text } from "../Text"

export interface TooltipProps {
  content: React.ReactNode
  placement?: Position
  size?: "sm" | "lg"
  width?: number | null
  visible?: boolean
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
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
}) => {
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

  const { anchorRef, tooltipRef } = usePosition({
    position: placement,
    offset: 10,
    active: visible ?? active,
  })

  return (
    <>
      {React.cloneElement(children, {
        ref: anchorRef,
        tabIndex: 0,
        onClick: handleClick,
        onMouseOver: activate,
        onMouseOut: deactivate,
        onFocus: activate,
        onBlur: deactivate,
      })}

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
        <Text variant="xs">{content}</Text>
      </Tip>
    </>
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
