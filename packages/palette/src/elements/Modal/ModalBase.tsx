import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { RemoveScroll } from "react-remove-scroll"
import styled from "styled-components"
import { zIndex as systemZIndex, ZIndexProps } from "styled-system"
import { useFocusLock } from "../../utils/useFocusLock"
import { Flex, FlexProps } from "../Flex"

// TODO: Update TypeScript definitions for this library
// https://github.com/theKashey/react-remove-scroll
const ScrollIsolation = styled(RemoveScroll as any)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled(Flex)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  ${systemZIndex}
`

const Dialog = styled(Flex).attrs({ role: "dialog" })`
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  > * {
    max-height: 100%;
  }
`

/** BaseModal */
export type ModalBaseProps = FlexProps &
  ZIndexProps & {
    children?: React.ReactNode
    dialogProps?: FlexProps
    onClose?(): void
  }

/**
 * It seems we've landed on this value as the 'top'
 */
export const DEFAULT_MODAL_Z_INDEX = 9999

/**
 * BaseModal
 * Low-level modal that has no opinions about layout/overlay
 * Modals content using a portal, locks scroll.
 */
export const ModalBase: React.FC<ModalBaseProps> = ({
  children,
  zIndex = DEFAULT_MODAL_Z_INDEX,
  dialogProps = {},
  onClose = () => null,
  ...rest
}) => {
  const appendEl = useRef(document.createElement("div"))
  const containerEl = useRef<HTMLDivElement | null>(null)
  const scrollIsolationEl = useRef<HTMLDivElement | null>(null)

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === scrollIsolationEl.current) {
      onClose()
    }
  }

  useFocusLock(containerEl)

  useEffect(() => {
    if (appendEl.current === null) return

    // Append the dialog
    document.body.appendChild(appendEl.current)
  }, [])

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          // Prevent <esc> from interfering with the returned focus
          event.preventDefault()
          event.stopPropagation()

          // Handle close
          return onClose()
        default:
          break
      }
    }

    document.addEventListener("keydown", handleKeydown)
    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  }, [onClose])

  // Sets to `innerHeight` so as to simulate `100vh` on iOS
  const [maxHeight, setMaxHeight] = useState(window.innerHeight)

  // Keeps `maxHeight` in sync
  useEffect(() => {
    const updateMaxHeight = () => {
      setMaxHeight(window.innerHeight)
    }

    window.addEventListener("resize", updateMaxHeight, { passive: true })
    return () => {
      window.removeEventListener("resize", updateMaxHeight)
    }
  }, [])

  return createPortal(
    <Container ref={containerEl as any} zIndex={zIndex} {...rest}>
      <ScrollIsolation
        ref={scrollIsolationEl as any}
        onMouseDown={handleMouseDown}
      >
        <Dialog maxHeight={maxHeight} {...dialogProps}>
          {children}
        </Dialog>
      </ScrollIsolation>
    </Container>,
    appendEl.current
  )
}

ModalBase.displayName = "ModalBase"
