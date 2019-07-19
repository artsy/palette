import React, { SFC, useEffect, useRef, useState } from "react"
import { animated, useSpring } from "react-spring"
import styled from "styled-components"
import { color, space } from "../../helpers"
import { CloseIcon } from "../../svgs"
import { ArtsyLogoBlackIcon } from "../../svgs/ArtsyLogoBlackIcon"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Serif } from "../Typography"

interface ModalProps {
  FixedButton?: JSX.Element
  hasLogo?: boolean
  isWide?: boolean
  onClose?: () => void
  show?: boolean
  title?: string
}

interface TransitionElementProps {
  isWide?: boolean
  show?: boolean
}

const usePrevious = value => {
  const ref = useRef(null)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

const AnimatedView = animated(Box)

/**
 * Modal.
 * Spec: https://app.zeplin.io/project/5acd19ff49a1429169c3128b/screen/5c75ad115c1db5628cc03c2a
 */
export const Modal: SFC<ModalProps> = ({
  children,
  FixedButton,
  title,
  show,
  isWide,
  hasLogo,
  onClose,
}) => {
  const [childrenState, setChildrenState] = useState(children)
  const [springContentAnimation, setSpringContentAnimation] = useState({
    opacity: 1,
    onRest: null,
  })
  const [springModalAnimation, setSpringModalAnimation] = useState({
    transform: "translate(-50%, 0%) translateY(50vh)",
    opacity: 1,
    onRest: null,
  })
  const [visibleContent, setVisibleContent] = useState(null)

  const previousChildren = usePrevious(childrenState)
  const contentAnimation = useSpring(springContentAnimation)
  const modalAnimation = useSpring(springModalAnimation)

  useEffect(() => {
    if (!show) {
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
        },
      })
    } else {
      setVisibleContent(ModalContent)
      setSpringModalAnimation({
        transform: "translate(-50%, -50%) translateY(0vh)",
        opacity: 1,
        onRest: null,
      })
    }
  }, [show])

  const updateVisibleContent = () => {
    setChildrenState(children)
    // Replaces content
    setVisibleContent(ModalContent)
    // Fades in new content
    setSpringContentAnimation({
      opacity: 1,
      onRest: null,
    })
  }

  // Listens for props to change and fades in new content
  useEffect(() => {
    if (previousChildren && children !== previousChildren) {
      setSpringContentAnimation({
        opacity: 0,
        onRest: () => updateVisibleContent(),
      })
    }
  }, [children])

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
    <ModalOuterWrapper show={show}>
      <ModalWrapper>
        <ModalElement style={modalAnimation} isWide={isWide} show={show}>
          <CloseIconWrapper onClick={() => onClose()}>
            <CloseIcon fill="black60" />
          </CloseIconWrapper>
          {visibleContent}
        </ModalElement>
      </ModalWrapper>
    </ModalOuterWrapper>
  )
}

const FixedButtonWrapper = styled(Box)`
  position: fixed;
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
  z-index: 100;
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
  max-height: calc(100% - 80px);
  min-height: 58px;
  overflow: hidden;
  background-color: ${color("white100")};
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  width: ${props => (props.isWide ? "900px" : "440px")};
`

const ModalScrollContent = styled(Box)<ModalProps>`
  height: 100%;
  width: 100%;
  overflow: scroll;
  padding-bottom: ${props => (!!props.FixedButton ? "112px" : space(2) + "px")};
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
