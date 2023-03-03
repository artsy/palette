import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { zIndex as systemZIndex, ZIndexProps } from "styled-system"
import { usePortal } from "../../utils/usePortal"
import { Flex, FlexProps } from "../Flex"
import { FocusOn } from "react-focus-on"

const Focus = styled(FocusOn)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Backdrop = styled.div`
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
export type ModalBaseProps = React.HTMLAttributes<HTMLDivElement> &
  FlexProps &
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
export const ModalBase: React.FC<ModalBaseProps> = (props) => {
  if (typeof window === "undefined") {
    return null
  }
  return <_ModalBase {...props} />
}

export const _ModalBase: React.FC<ModalBaseProps> = ({
  children,
  zIndex = DEFAULT_MODAL_Z_INDEX,
  dialogProps = {},
  onClose = () => null,
  ...rest
}) => {
  const focusEl = useRef<HTMLDivElement | null>(null)
  const backdropEl = useRef<HTMLDivElement | null>(null)

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === backdropEl.current) {
      onClose()
    }
  }

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

    // Due to the dialog being portaled; we need to wait until the next tick
    // before we can perform any operations that rely on the sizing of elements.
    // Presumably anything that relies on this also listens to resize for updates.
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"))
    }, 0)

    window.addEventListener("resize", updateMaxHeight, { passive: true })

    return () => {
      window.removeEventListener("resize", updateMaxHeight)
    }
  }, [])

  const { createPortal } = usePortal()

  return createPortal(
    <Container zIndex={zIndex} {...rest}>
      <Focus ref={focusEl as any}>
        <Backdrop ref={backdropEl as any} onMouseDown={handleMouseDown}>
          <Dialog maxHeight={maxHeight} {...dialogProps}>
            {children}
          </Dialog>
        </Backdrop>
      </Focus>
    </Container>
  )
}

ModalBase.displayName = "ModalBase"
