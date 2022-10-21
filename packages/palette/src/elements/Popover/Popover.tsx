import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { DROP_SHADOW } from "../../helpers"
import { isText } from "../../helpers/isText"
import { CloseIcon } from "../../svgs"
import { Position, useClickOutside, usePosition } from "../../utils"
import { useUpdateEffect } from "../../utils/useUpdateEffect"
import { Box, BoxProps } from "../Box"
import { Clickable } from "../Clickable"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Text } from "../Text"

export interface PopoverActions {
  /** Call to show popover */
  onVisible(): void
  /** Call to hide popover */
  onHide(): void
  /** Pass ref to element you want the popover to be anchored to */
  anchorRef: React.MutableRefObject<HTMLElement>
}

export interface PopoverProps extends BoxProps {
  title?: React.ReactNode
  placement?: Position
  /** Intially visible by default? */
  visible?: boolean
  popover: React.ReactNode
  children: ({ anchorRef, onVisible, onHide }: PopoverActions) => JSX.Element
  onClose?: () => void
}

/**
 * A `Popover` is a small modal-type element which is anchored, and can be
 * positioned relative to, another element.
 */
export const Popover: React.FC<PopoverProps> = ({
  title,
  placement = "top",
  visible: _visible = false,
  children,
  popover,
  onClose,
  ...rest
}) => {
  const [visible, setVisible] = useState(false)

  // If prop updates/set initial visibility.
  useEffect(() => {
    setVisible(_visible)
  }, [_visible])

  // Yields focus back and forth between popover and anchor
  useUpdateEffect(() => {
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

  const { anchorRef, tooltipRef } = usePosition({
    position: placement,
    offset: 10,
    active: visible,
  })

  useClickOutside({
    ref: tooltipRef,
    onClickOutside: handleHide,
    when: visible,
    type: "click",
  })

  return (
    <>
      {children({ anchorRef: anchorRef as any, onVisible, onHide })}

      {visible && (
        <Tip
          tabIndex={0}
          ref={tooltipRef as any}
          zIndex={1}
          display="inline-block"
          bg="white100"
          p={2}
          {...rest}
        >
          {title && (
            <>
              <Flex alignItems="center" flex={1} justifyContent="space-between">
                {isText(title) ? (
                  <Text variant="lg-display" lineHeight={1}>
                    {title}
                  </Text>
                ) : (
                  title
                )}

                <Spacer ml={4} />
              </Flex>

              <Spacer mt={0.5} />
            </>
          )}

          <Clickable
            position="absolute"
            right={0}
            top={0}
            pt={2}
            px={1}
            mx={0.5}
            onClick={handleHide}
            aria-label="Close"
          >
            <CloseIcon fill="black100" display="block" />
          </Clickable>

          {!title && <Spacer mt={2} />}

          {popover}
        </Tip>
      )}
    </>
  )
}

const Tip = styled(Box)`
  position: fixed;
  z-index: 1;
  text-align: left;
  transition: opacity 250ms ease-out;
  box-shadow: ${DROP_SHADOW};
`
