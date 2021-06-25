import React, { SFC, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { color, media, space } from "../../helpers"
import { CloseIcon } from "../../svgs"
import { ArtsyLogoBlackIcon } from "../../svgs/ArtsyLogoBlackIcon"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Sans } from "../Typography"

/**
 * FIXME: This whole thing needs to be rebuilt from scratch
 */

interface ModalProps {
  FixedButton?: JSX.Element
  refreshModalContentKey?: string
  hasLogo?: boolean
  height?: string
  modalWidth?: ModalWidth
  isWide?: boolean
  onClose: () => void
  show?: boolean
  title?: string
  /*
   * Hide the X button if we don't want the user to be able to exit the modal without another action closing the modal
   */
  hideCloseButton?: boolean
}

interface TransitionElementProps {
  isWide?: boolean
  show?: boolean
  modalWidth?: ModalWidth
}

interface ModalScrollContentProps {
  hasLogo?: boolean
  modalWidth?: ModalWidth
}

export enum ModalWidth {
  Narrow = "300px",
  Normal = "440px",
  Wide = "900px",
}

/**
 * Modal.
 * Spec: https://app.zeplin.io/project/5acd19ff49a1429169c3128b/screen/5c75ad115c1db5628cc03c2a
 */
export const Modal: SFC<ModalProps> = ({
  children,
  FixedButton,
  title,
  show,
  modalWidth, // modalWidth overwrites isWide if present
  isWide,
  hasLogo,
  onClose,
  hideCloseButton,
}) => {
  const wrapperRef = useRef(null)
  const [fadeIn, setFadeIn] = useState(false)

  const handleEscapeKey = (event) => {
    if (event && event.key === "Escape") {
      onClose()
    }
  }

  useEffect(() => {
    if (show) {
      setFadeIn(true)

      if (!hideCloseButton) {
        // Binds key event for escape to close modal
        document.addEventListener("keyup", handleEscapeKey, true)
      }
      // Fixes the body to disable scroll
      document.body.style.overflowY = "hidden"
    } else {
      setFadeIn(false)
      document.body.style.overflowY = "visible"
      document.removeEventListener("keyup", handleEscapeKey, true)
    }

    return document.removeEventListener("keyup", handleEscapeKey, true)
  }, [show])

  const handleWrapperClick = (event) => {
    // If modal X icon is hidden we don't want to close the modal when the wrapper is clicked
    if (!hideCloseButton && event.target === wrapperRef.current) {
      onClose()
    }
  }

  if (!show) {
    return null
  }

  return (
    <>
      <ModalOuterWrapper show={show} className={fadeIn ? "fadeIn" : null}>
        <ModalWrapper ref={wrapperRef} onClick={handleWrapperClick}>
          <ModalElement
            modalWidth={modalWidth}
            isWide={isWide}
            show={show}
            className={fadeIn ? "fadeIn" : null}
          >
            <ModalFlexContent>
              {!hideCloseButton && (
                <CloseIconWrapper onClick={() => onClose()}>
                  <CloseIcon fill="black60" />
                </CloseIconWrapper>
              )}
              <ModalScrollContent hasLogo={hasLogo} modalWidth={modalWidth}>
                {hasLogo && (
                  <>
                    <Flex justifyContent="center">
                      <Logo />
                    </Flex>
                    <Spacer mb={2} />
                  </>
                )}
                {title && (
                  <>
                    <Flex justifyContent="center">
                      <Sans size="5t" textAlign="center" color="black100">
                        {title}
                      </Sans>
                    </Flex>
                    <Spacer mb={hasLogo ? 2 : [1, 2]} />
                  </>
                )}
                {children}
              </ModalScrollContent>
              {FixedButton && (
                <FixedButtonWrapper>{FixedButton}</FixedButtonWrapper>
              )}
            </ModalFlexContent>
          </ModalElement>
        </ModalWrapper>
      </ModalOuterWrapper>
    </>
  )
}

const FixedButtonWrapper = styled(Flex)`
  border-top: 1px solid ${color("black10")};
  padding: ${space(3)}px;
  ${media.xs`
    padding: ${space(2)}px;
  `};
  flex: 0 0 auto;
`

const ModalOuterWrapper = styled(Box)<TransitionElementProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(229, 229, 229, 0.5);
  opacity: 0;
  pointer-events: ${(props) => (props.show ? "auto" : "none")};

  &.fadeIn {
    transition: opacity 250ms ease;
    transition-delay: 1ms;
    opacity: 1;
  }
`

const ModalWrapper = styled(Flex)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`

const ModalElement = styled(Box)<TransitionElementProps>`
  position: absolute;
  border-radius: 5px;
  height: ${(props) => (props.height ? props.height : "auto")};
  max-height: calc(100vh - 80px);
  min-height: 58px;
  overflow: hidden;
  background-color: ${color("white100")};
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  width: ${(props) =>
    props.modalWidth || (props.isWide ? ModalWidth.Wide : ModalWidth.Normal)};
  ${media.xs`
    max-height: 100vh;
    height: 100vh;
    width: 100vw;
    border-radius: 0;
  `};

  transform: translateY(2000px);
  &.fadeIn {
    transition: all 400ms cubic-bezier(0.075, 0.82, 0.165, 1); /* easeOutCirc */
    transition-delay: 1ms;
    transform: translateY(0px);
  }
`

const ModalFlexContent = styled(Flex)<ModalScrollContentProps>`
  position: relative;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  max-height: calc(100vh - 80px);
  ${media.xs`
    max-height: 100vh;
  `};
`

const ModalScrollContent = styled(Flex)<ModalScrollContentProps>`
  overflow: auto;
  flex-direction: column;
  padding: ${(props) =>
    space(props.hasLogo || props.modalWidth === ModalWidth.Narrow ? 2 : 3)}px;
  ${media.xs`
    padding: ${space(2)}px;
  `};
`

const CloseIconWrapper = styled(Box)`
  position: absolute;
  top: ${space(2)}px;
  right: ${space(2)}px;
  cursor: pointer;
`

const Logo = styled(ArtsyLogoBlackIcon)`
  width: 100px;
`

Modal.displayName = "Modal"
ModalWrapper.displayName = "ModalWrapper"
ModalScrollContent.displayName = "ModalScrollContent"
