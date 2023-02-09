import React, { useRef, useState } from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import { DROP_SHADOW, isText } from "../../helpers"
import { Position } from "../../utils/usePosition"
import { Box, BoxProps } from "../Box"
import { Pointer, POINTER_SIZE } from "../Pointer"
import { Text } from "../Text"
import {
  useFloating,
  autoUpdate,
  flip,
  offset as offsetMiddleware,
  shift,
  arrow,
  hide,
} from "@floating-ui/react"

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
  offset?: number
  placement?: Position
  pointer?: boolean
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
  offset = 10,
  placement: desiredPlacement = "top",
  pointer = false,
  variant = "defaultLight",
  visible,
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

  const pointerRef = useRef<HTMLDivElement | null>(null)

  const { x, y, refs, middlewareData, placement } = useFloating({
    placement: desiredPlacement,
    middleware: [
      flip(),
      offsetMiddleware(offset),
      shift(),
      arrow({
        element: pointerRef,
        padding: offset,
      }),
      hide(),
    ],
    whileElementsMounted: autoUpdate,
  })

  const side = placement.split("-")[0]

  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[side]

  return (
    <>
      {React.cloneElement(children, {
        ref: refs.setReference,
        tabIndex: 0,
        onClick: compose(handleClick, children.props?.onClick),
        onMouseOver: compose(activate, children.props?.onMouseOver),
        onMouseOut: compose(deactivate, children.props?.onMouseOut),
        onFocus: compose(activate, children.props?.onFocus),
        onBlur: compose(deactivate, children.props?.onBlur),
      })}

      <Tip
        ref={refs.setFloating as any}
        variant={variant}
        width={width}
        top={y}
        left={x}
        zIndex={1}
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
            ref={pointerRef as any}
            variant={variant}
            top={middlewareData.arrow?.y}
            left={middlewareData.arrow?.x}
            right=""
            bottom=""
            {...{ [`${staticSide}`]: `${-POINTER_SIZE / 2}px` }}
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
  z-index: 1;
  transition: opacity 250ms ease-out;
  text-align: left;
  box-shadow: ${DROP_SHADOW};
  cursor: default;
  pointer-events: none;
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
