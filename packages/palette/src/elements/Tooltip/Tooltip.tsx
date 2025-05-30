import React, { useState } from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import { isText } from "../../helpers"
import { Position, usePosition } from "../../utils/usePosition"
import { Box, BoxProps } from "../Box"
import { Pointer } from "../Pointer"
import { Text } from "../Text"
import { themeGet } from "@styled-system/theme-get"

export const TOOLTIP_VARIANTS = {
  defaultLight: {
    backgroundColor: "mono0",
    color: "mono100",
  },
  defaultDark: {
    backgroundColor: "mono100",
    color: "mono0",
  },
}

export type TooltipVariant = keyof typeof TOOLTIP_VARIANTS

export interface TooltipProps extends BoxProps {
  /** Anchor element to attach to tooltip */
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
  /** Content of tooltip */
  content: React.ReactNode
  offset?: number
  placement?: Position
  pointer?: boolean
  variant?: TooltipVariant
  visible?: boolean
}

/**
 * A tooltip
 */
export const Tooltip: React.FC<React.PropsWithChildren<TooltipProps>> = ({
  children,
  content,
  width = 230,
  offset = 10,
  placement = "top",
  pointer = false,
  variant = "defaultLight",
  visible,
  zIndex = 1,
  ...rest
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

  const {
    anchorRef,
    tooltipRef,
    state: { isFlipped },
  } = usePosition({
    position: placement,
    offset,
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
        width={width}
        zIndex={zIndex}
        style={
          // If visible is explictly set to `false` then the tooltip should be hidden
          // Otherwise it should be visible or utilize the active state.
          visible !== false
            ? {
                opacity: visible ?? active ? 1 : 0,
              }
            : { opacity: 0 }
        }
      >
        {pointer && (
          <Pointer
            anchorRef={anchorRef}
            tooltipRef={tooltipRef}
            variant={variant}
            placement={placement}
            isFlipped={isFlipped}
          />
        )}

        <Panel variant={variant} p={1} {...rest}>
          {isText(content) ? <Text variant="xs">{content}</Text> : content}
        </Panel>
      </Tip>
    </>
  )
}

const Tip = styled(Box)<{ variant?: TooltipVariant }>`
  position: absolute;
  transition: opacity 250ms ease-out;
  text-align: left;
  box-shadow: ${themeGet("effects.dropShadow")};
  cursor: default;
  pointer-events: none;
  font-weight: normal;
  font-style: normal;
  ${variant({ variants: TOOLTIP_VARIANTS })}
`

const Panel = styled(Box)<{ variant?: TooltipVariant }>`
  ${variant({ variants: TOOLTIP_VARIANTS })}
`

const compose = (a?: (...args: any) => any, b?: (...args: any) => any) => {
  return (...args) => {
    a?.(...args)
    b?.(...args)
  }
}
