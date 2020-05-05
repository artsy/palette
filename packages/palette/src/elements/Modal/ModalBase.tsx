import React, { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { FocusOn } from "react-focus-on"
import styled, { css } from "styled-components"
import { Flex, FlexProps } from "../Flex"

const ModalWrapper = styled(Flex)<{ overlay?: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  /* TODO: Use a token? Or some other alternative to wildstyle z-index? */
  z-index: 9999;

  ${({ overlay }) =>
    overlay &&
    css`
      /* TODO: Use a token? */
      background-color: rgba(229, 229, 229, 0.5);
    `}
`
/**
 * BaseModal
 */
export type ModalBaseProps = FlexProps & {
  overlay?: boolean
  onClose?(): void
}

/**
 * BaseModal
 * Low-level modal that has no opinions about layout.
 * Modals content using a portal, locks focus, handles aria-hidden isolation.
 */
export const ModalBase: React.FC<ModalBaseProps> = ({
  children,
  overlay = true,
  onClose = () => null,
  ...rest
}) => {
  const appendEl = useRef(document.createElement("div"))
  const wrapperEl = useRef<HTMLDivElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === wrapperEl.current) {
      onClose()
    }
  }

  useEffect(() => {
    const { current } = appendEl
    document.body.appendChild(current)
    return () => {
      document.body.removeChild(current)
    }
  }, [])

  return createPortal(
    <FocusOn onClickOutside={onClose} onEscapeKey={onClose}>
      <ModalWrapper
        // TODO: Remove cast as any. Something is wrong with styled's typings?
        ref={wrapperEl as any}
        onClick={handleClick}
        overlay={overlay}
        {...rest}
      >
        {children}
      </ModalWrapper>
    </FocusOn>,
    appendEl.current
  )
}

ModalBase.displayName = "ModalBase"
ModalWrapper.displayName = "ModalWrapper"
