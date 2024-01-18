import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import CloseIcon from "@artsy/icons/CloseIcon"
import { Position, useClickOutside, usePortal, usePosition } from "../../utils"
import { useUpdateEffect } from "../../utils/useUpdateEffect"
import { Box, BoxProps } from "../Box"
import { Clickable } from "../Clickable"
import { Pointer } from "../Pointer"
import { themeGet } from "@styled-system/theme-get"

export const POPOVER_VARIANTS = {
  defaultLight: {
    backgroundColor: "white100",
    color: "black100",
  },
  defaultDark: {
    backgroundColor: "black100",
    color: "white100",
  },
}

export type PopoverVariant = keyof typeof POPOVER_VARIANTS

export interface PopoverActions {
  /** Call to show popover */
  onVisible(): void
  /** Call to hide popover */
  onHide(): void
  /** Call to dismiss popover */
  onDismiss(): void
  /** Pass ref to element you want the popover to be anchored to */
  anchorRef: React.MutableRefObject<HTMLElement>
}

export interface PopoverProps extends BoxProps {
  children: (actions: PopoverActions) => JSX.Element
  ignoreClickOutside?: boolean
  manageFocus?: boolean
  offset?: number
  /** Called whenever the Popver is closed (both explcitly dismissed and through click outside) */
  onClose?: () => void
  /** Called whenever the Popover is dismissed (explicitly) */
  onDismiss?: () => void
  placement?: Position
  /** Display triangular pointer back to anchor node */
  pointer?: boolean
  popover:
    | ((actions: Omit<PopoverActions, "anchorRef">) => JSX.Element)
    | React.ReactNode
  variant?: PopoverVariant
  /** Initial default visibility */
  visible?: boolean
}

/**
 * A `Popover` is a small modal-type element which is anchored, and can be
 * positioned relative to, another element.
 */
export const Popover: React.FC<PopoverProps> = ({
  children,
  ignoreClickOutside = false,
  manageFocus = true,
  offset = 10,
  onClose,
  onDismiss,
  placement = "top",
  pointer = false,
  popover,
  variant = "defaultLight",
  visible: _visible = false,
  zIndex = 1,
  ...rest
}) => {
  const [visible, setVisible] = useState(false)

  // If prop updates/set initial visibility.
  useEffect(() => {
    setVisible(_visible)
  }, [_visible])

  // Yields focus back and forth between popover and anchor
  useUpdateEffect(() => {
    if (!manageFocus) return

    if (visible && tooltipRef.current) {
      tooltipRef.current.focus()
      return
    }

    if (!anchorRef.current) return
    anchorRef.current.focus()
  }, [visible])

  const onVisible = useCallback(() => {
    setVisible(true)
  }, [])

  const onHide = useCallback(() => {
    setVisible(false)
  }, [])

  const handleHide = useCallback(() => {
    onHide()
    onClose?.()
  }, [onHide, onClose])

  const handleDismiss = useCallback(() => {
    handleHide()
    onDismiss?.()
  }, [handleHide, onDismiss])

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleHide()
      }
    }

    document.addEventListener("keydown", handleKeydown)

    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  }, [handleHide])

  const {
    anchorRef,
    tooltipRef,
    state: { isFlipped },
  } = usePosition({
    position: placement,
    offset,
    active: visible,
  })

  useClickOutside({
    ref: tooltipRef,
    onClickOutside: handleHide,
    when: visible && !ignoreClickOutside,
    type: "click",
  })

  const { createPortal } = usePortal()

  return (
    <>
      {children({
        anchorRef: anchorRef as any,
        onVisible,
        onHide: handleHide,
        onDismiss: handleDismiss,
      })}

      {visible &&
        createPortal(
          <Tip
            tabIndex={0}
            ref={tooltipRef as any}
            zIndex={zIndex}
            display="inline-block"
            position="relative"
            variant={variant}
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

            <Close
              position="relative"
              zIndex={2}
              p={1}
              onClick={handleDismiss}
              aria-label="Close"
            >
              <CloseIcon fill="currentColor" display="block" />
            </Close>

            <Panel
              variant={variant}
              position="relative"
              p={1}
              zIndex={1}
              {...rest}
            >
              {typeof popover === "function"
                ? popover({
                    onVisible,
                    onHide: handleHide,
                    onDismiss: handleDismiss,
                  })
                : popover}
            </Panel>
          </Tip>
        )}
    </>
  )
}

const Tip = styled(Box)<{ variant?: PopoverVariant }>`
  position: fixed;
  text-align: left;
  transition: opacity 250ms ease-out;
  box-shadow: ${themeGet("effects.dropShadow")};
  ${variant({ variants: POPOVER_VARIANTS })}
`

const Panel = styled(Box)<{ variant?: PopoverVariant }>`
  ${variant({ variants: POPOVER_VARIANTS })}
`

const Close = styled(Clickable)`
  float: right;
`
