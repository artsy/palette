import React, { SFC, useEffect, useState } from "react"
import { animated, useSpring } from "react-spring"
import styled from "styled-components"
import { color, media, space } from "../../helpers"
import { CloseIcon } from "../../svgs"
import { ArtsyLogoBlackIcon } from "../../svgs/ArtsyLogoBlackIcon"
import { usePrevious } from "../../utils/usePrevious"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Serif } from "../Typography"

/**
 * refreshModalContentKey should change if the modal displays new content and should fade
 * in/fade out with content update. If refreshModalContentKey does not change, the content
 * updates immedately.
 */
interface ModalProps {
  FixedButton?: JSX.Element
  refreshModalContentKey?: string
  hasLogo?: boolean
  height?: string
  isWide?: boolean
  onClose: () => void
  show?: boolean
  title?: string
  /*
   * Hide the X button if we don't want the user to be able to exit the modal without another action closing the modal
   */
  hideCloseXButton?: boolean
}

interface TransitionElementProps {
  isWide?: boolean
  show?: boolean
}

interface ModalScrollContentProps {
  FixedButton?: JSX.Element
}

const AnimatedView = animated(Box)

/**
 * Modal.
 * Spec: https://app.zeplin.io/project/5acd19ff49a1429169c3128b/screen/5c75ad115c1db5628cc03c2a
 */
export const Modal: SFC<ModalProps> = ({
  children,
  refreshModalContentKey,
  FixedButton,
  title,
  show,
  isWide,
  hasLogo,
  onClose,
  hideCloseXButton,
}) => {
  const [springContentAnimation, setSpringContentAnimation] = useState({
    opacity: 1,
    onRest: null,
  })
  const [springModalAnimation, setSpringModalAnimation] = useState({
    transform: "translate(-50%, 0%) translateY(50vh)",
    opacity: 0,
    onRest: null,
  })
  const [visibleContent, setVisibleContent] = useState(null)
  const [renderModal, setRenderModal] = useState(false)
  const previousChangeKey = usePrevious(refreshModalContentKey)

  const contentAnimation = useSpring(springContentAnimation)
  const modalAnimation = useSpring(springModalAnimation)

  const handleEscapeKey = event => {
    if (event && event.key === "Escape") {
      onClose()
    }
  }

  useEffect(() => {
    if (previousChangeKey === refreshModalContentKey) {
      setVisibleContent(ModalContent)
    } else {
      // Fades out content if changeKey updates
      setSpringContentAnimation({
        opacity: 0,
        onRest: () => fadeInNewContent(),
      })
    }
  }, [children])

  useEffect(() => {
    if (show) {
      setRenderModal(true)
      if (!hideCloseXButton) {
        // Binds key event for escape to close modal
        document.addEventListener("keyup", handleEscapeKey, true)
      }
      // Fixes the body to disable scroll
      document.body.style.overflowY = "hidden"
      setVisibleContent(ModalContent)
      setSpringModalAnimation({
        transform: "translate(-50%, -50%) translateY(0vh)",
        opacity: 1,
        onRest: null,
      })
    } else {
      document.body.style.overflowY = "visible"
      document.removeEventListener("keyup", handleEscapeKey, true)
      setSpringModalAnimation({
        transform: "translate(-50%, -50%) translateY(0vh)",
        opacity: 0,
        onRest: () => {
          setSpringModalAnimation({
            transform: "translate(-50%, 0%) translateY(50vh)",
            onRest: null,
            opacity: 0,
          })
          onClose()
          setRenderModal(false)
        },
      })
    }
  }, [show])

  const handleWrapperClick = () => {
    // If modal X icon is hidden we don't want to close the modal when the wrapper is clicked
    if (!hideCloseXButton) {
      onClose()
    }
  }

  const fadeInNewContent = () => {
    // Replaces content
    setVisibleContent(ModalContent)
    // Fades in new content
    setSpringContentAnimation({
      opacity: 1,
      onRest: null,
    })
  }

  const ModalContent = () => {
    return (
      <AnimatedView style={contentAnimation}>
        <ModalScrollContent px={4} pt={2} FixedButton={FixedButton}>
          {hasLogo && (
            <>
              <Flex justifyContent="center">
                <Logo />
              </Flex>
              <Spacer mb={1} />
            </>
          )}
          {title && (
            <>
              <Flex justifyContent="center">
                <Serif size="5t" textAlign="center" color="black100">
                  {title}
                </Serif>
              </Flex>
              <Spacer mb={1} />
            </>
          )}
          {children}
        </ModalScrollContent>
        {FixedButton && (
          <FixedButtonWrapper px={4} pt={2} pb={3}>
            {FixedButton}
          </FixedButtonWrapper>
        )}
      </AnimatedView>
    )
  }

  return (
    <>
      {renderModal && (
        <ModalOuterWrapper show={show} onClick={() => handleWrapperClick()}>
          <ModalWrapper>
            <ModalElement style={modalAnimation} isWide={isWide} show={show}>
              {!hideCloseXButton && (
                <CloseIconWrapper onClick={() => onClose()}>
                  <CloseIcon fill="black60" />
                </CloseIconWrapper>
              )}
              {visibleContent}
            </ModalElement>
          </ModalWrapper>
        </ModalOuterWrapper>
      )}
    </>
  )
}

const FixedButtonWrapper = styled(Box)`
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${color("white100")};
  border-top: 1px solid ${color("black10")};
`

const ModalOuterWrapper = styled(Box)<TransitionElementProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(229, 229, 229, 0.5);
  transition: opacity 250ms ease;
  opacity: ${props => (props.show ? "1" : "0")};
  pointer-events: ${props => (props.show ? "auto" : "none")};
`

const ModalWrapper = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const ModalElement = styled(AnimatedView)<TransitionElementProps>`
  position: absolute;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  height: ${props => (props.height ? props.height : "auto")};
  max-height: calc(100vh - 80px);
  min-height: 58px;
  overflow: hidden;
  background-color: ${color("white100")};
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  width: ${props => (props.isWide ? "900px" : "440px")};
  ${media.xs`
    max-height: 100vh;
    height: 100vh;
    width: 100vw;
    border-radius: 0;
  `};
`

const ModalScrollContent = styled(Box)<ModalScrollContentProps>`
  height: 100%;
  width: 100%;
  overflow: auto;
  padding-bottom: ${space(2)}px;
  max-height: ${props =>
    !!props.FixedButton
      ? `calc(100vh - (80px + ${space(9)}px));`
      : "calc(100vh - 80px)"};
  ${media.xs`
    max-height: ${props =>
      !!props.FixedButton ? `calc(100vh - (80px ${space(9)}px));` : "100vh"};
  `};
`

const CloseIconWrapper = styled(Box)`
  position: fixed;
  top: ${space(2)}px;
  right: ${space(2)}px;
  cursor: pointer;
`

const Logo = styled(ArtsyLogoBlackIcon)`
  width: 100px;
`

Modal.displayName = "Modal"
