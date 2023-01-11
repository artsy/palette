import React, { useState } from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import { DROP_SHADOW, isText } from "../../helpers"
import { Position, usePosition } from "../../utils/usePosition"
import { Box, BoxProps } from "../Box"
import { Text } from "../Text"

export const TOOLTIP_VARIANTS = {
  defaultLight: {
    backgroundColor: "white100",
    color: "black100",
  },
  defaultDark: {
    backgroundColor: "black100",
    color: "white100",
  },
}

export type TooltipVariant = keyof typeof TOOLTIP_VARIANTS

export interface TooltipProps extends BoxProps {
  /** Anchor element to attach to tooltip */
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
  /** Content of tooltip */
  content: React.ReactNode
  placement?: Position
  variant?: TooltipVariant
  visible?: boolean
}

/**
 * A tooltip
 */
export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  width = 230,
  placement = "top",
  variant = "defaultLight",
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
        onClick: compose(handleClick, children.props?.onClick),
        onMouseOver: compose(activate, children.props?.onMouseOver),
        onMouseOut: compose(deactivate, children.props?.onMouseOut),
        onFocus: compose(activate, children.props?.onFocus),
        onBlur: compose(deactivate, children.props?.onBlur),
      })}

      <Tip
        ref={tooltipRef as any}
        variant={variant}
        p={1}
        width={width}
        zIndex={1}
        {...(visible
          ? // If there's a visible prop being passed; use that
            { opacity: visible ? 1 : 0 }
          : // Otherwise use the active state
            { opacity: active ? 1 : 0 })}
      >
        {isText(content) ? <Text variant="xs">{content}</Text> : content}
      </Tip>
    </>
  )
}

const Tip = styled(Box)<{ variant?: TooltipVariant }>`
  position: absolute;
  z-index: 1;
  transition: opacity 250ms ease-out;
  text-align: left;
  box-shadow: ${DROP_SHADOW};
  cursor: default;
  pointer-events: none;
  ${variant({ variants: TOOLTIP_VARIANTS })}
`

const compose = (a?: (...args: any) => any, b?: (...args: any) => any) => {
  return (...args) => {
    a?.(...args)
    b?.(...args)
  }
}
