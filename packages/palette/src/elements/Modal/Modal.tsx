import React, { useEffect, useState } from "react"
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
import { ModalBase } from "./ModalBase"

/**
 * refreshModalContentKey should change if the modal displays new content and should fade
 * in/fade out with content update. If refreshModalContentKey does not change, the content
 * updates immedately.
 */
export interface ModalProps {
  children?: React.ReactNode
  FixedButton?: JSX.Element
  refreshModalContentKey?: string
  hasLogo?: boolean
  height?: string
  modalWidth?: ModalWidth
  isWide?: boolean
  onClose: () => void
  show?: boolean
  title?: string
  forcedScroll?: boolean // TODO: Find out if we can globally switch to `overflow: auto`
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
  forcedScroll?: boolean
}

export enum ModalWidth {
  Narrow = "300px",
  Normal = "440px",
  Wide = "900px",
}

const AnimatedView = animated(Box)

/**
 * Modal.
 * Spec: https://app.zeplin.io/project/5acd19ff49a1429169c3128b/screen/5c75ad115c1db5628cc03c2a
 */
export const Modal: React.FC<ModalProps> = ({
  children,
  refreshModalContentKey,
  FixedButton,
  title,
  show,
  modalWidth, // modalWidth overwrites isWide if present
  isWide,
  hasLogo,
  onClose,
  hideCloseButton,
  forcedScroll = true,
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
      // Opening
      setRenderModal(true)
      setVisibleContent(ModalContent)
      setSpringModalAnimation({
        transform: "translate(-50%, -50%) translateY(0vh)",
        opacity: 1,
        onRest: null,
      })
    } else {
      // Closing
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
        <ModalFlexContent>
          <ModalScrollContent
            forcedScroll={forcedScroll}
            hasLogo={hasLogo}
            modalWidth={modalWidth}
          >
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
                  <Serif size="5t" textAlign="center" color="black100">
                    {title}
                  </Serif>
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
      </AnimatedView>
    )
  }

  return (
    <>
      {renderModal && (
        <ModalBase onClose={hideCloseButton ? undefined : onClose}>
          <ModalElement
            style={modalAnimation}
            modalWidth={modalWidth}
            isWide={isWide}
            show={show}
          >
            {!hideCloseButton && (
              <CloseButton onClick={() => onClose()}>
                <CloseIcon fill="black60" />
              </CloseButton>
            )}
            {visibleContent}
          </ModalElement>
        </ModalBase>
      )}
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
  width: ${props =>
    props.modalWidth || (props.isWide ? ModalWidth.Wide : ModalWidth.Normal)};
  ${media.xs`
    max-height: 100vh;
    height: 100vh;
    width: 100vw;
    border-radius: 0;
  `};
`

const ModalFlexContent = styled(Flex)<ModalScrollContentProps>`
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  max-height: calc(100vh - 80px);
  ${media.xs`
    max-height: 100vh;
  `};
`

const ModalScrollContent = styled(Flex)<ModalScrollContentProps>`
  overflow: ${props => (props.forcedScroll ? "scroll" : "auto")};
  flex-direction: column;
  padding: ${props =>
    space(props.hasLogo || props.modalWidth === ModalWidth.Narrow ? 2 : 3)}px;
  ${media.xs`
    padding: ${space(2)}px;
  `};
`

// TODO: Consider extracting the equivalent of `TouchableWithoutFeedback`
// TODO: Icon should support `currentColor` as a valid color
const CloseButton = styled.button`
  position: fixed;
  appearance: none;
  top: 0;
  right: 0;
  cursor: pointer;
  padding: ${space(2)}px ${space(2)}px 0 0;
  background-color: transparent;
  border: 0;
  color: ${color("black100")};

  &:focus {
    path {
      fill: ${color("black60")};
    }
  }
`

const Logo = styled(ArtsyLogoBlackIcon)`
  width: 100px;
`

Modal.displayName = "Modal"
ModalWrapper.displayName = "ModalWrapper"
ModalScrollContent.displayName = "ModalScrollContent"
