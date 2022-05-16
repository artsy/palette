import { themeGet } from "@styled-system/theme-get"
import React, { FC, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { DROP_SHADOW, media } from "../../helpers"
import { CloseIcon } from "../../svgs"
import { ArtsyLogoBlackIcon } from "../../svgs/ArtsyLogoBlackIcon"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Join } from "../Join"
import { Spacer } from "../Spacer"
import { Text } from "../Text"
import { useSentinelVisibility } from "../../utils/useSentinelVisibility"

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
 * Spec: https://www.figma.com/file/m6gDpKHEWDbYJyrwsVZDBr/Artsy-3.0-Design-System?node-id=6150%3A7290
 * @deprecated: Use `ModalDialog` instead
 */
export const Modal: FC<ModalProps> = ({
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
  const { sentinel, isSentinelVisible: isScrolled } = useSentinelVisibility()

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
      <ModalOuterWrapper show={show} className={fadeIn ? "fadeIn" : ""}>
        <ModalWrapper ref={wrapperRef} onClick={handleWrapperClick}>
          <ModalElement
            modalWidth={modalWidth}
            isWide={isWide}
            show={show}
            className={fadeIn ? "fadeIn" : ""}
          >
            <ModalFlexContent>
              <ModalStickyHeader
                position="sticky"
                top={0}
                display="flex"
                justifyContent="center"
                flexDirection="column"
                isScrolled={isScrolled}
                px={2}
              >
                <Spacer my={1} />
                <Flex>
                  <Box pr={6} flex={1}>
                    <Join separator={<Spacer py={1} />}>
                      {hasLogo && <Logo my={1} />}
                      {title && (
                        <Text
                          variant="lg-display"
                          color="black100"
                          py={hasLogo ? 0 : 1}
                        >
                          {title}
                        </Text>
                      )}
                    </Join>
                  </Box>

                  {!hideCloseButton && (
                    <CloseIconWrapper my={1} onClick={() => onClose()}>
                      <CloseIcon fill="black60" />
                    </CloseIconWrapper>
                  )}
                </Flex>
                <Spacer py={1} />
              </ModalStickyHeader>

              <ModalScrollContent
                hasLogo={hasLogo}
                modalWidth={modalWidth}
                px={2}
                py={1}
                pb={2}
              >
                <>
                  {sentinel}
                  {children}
                </>
              </ModalScrollContent>

              {FixedButton && (
                <FixedButtonWrapper isScrolled={isScrolled} p={2}>
                  {FixedButton}
                </FixedButtonWrapper>
              )}
            </ModalFlexContent>
          </ModalElement>
        </ModalWrapper>
      </ModalOuterWrapper>
    </>
  )
}

interface ShadowOnScroll {
  isScrolled?: boolean
}

const FixedButtonWrapper = styled(Flex)<ShadowOnScroll>`
  box-shadow: ${({ isScrolled }) => (isScrolled ? DROP_SHADOW : "none")};
  flex: 0 0 auto;
  transition: box-shadow 250ms ease-in-out;
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

const ModalElement = styled(Flex)<TransitionElementProps>`
  position: absolute;
  height: ${(props) => (props.height ? props.height : "auto") as any};
  max-height: calc(100vh - 80px);
  min-height: 58px;
  overflow: hidden;
  background-color: ${themeGet("colors.white100")};
  box-shadow: ${DROP_SHADOW};
  width: ${(props) =>
    props.modalWidth || (props.isWide ? ModalWidth.Wide : ModalWidth.Normal)};

  ${media.xs`
    max-height: 100vh;
    height: calc(100vh - ${themeGet("space.4")});
    width: calc(100vw - ${themeGet("space.4")});
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

const ModalStickyHeader = styled(Box)<ModalScrollContentProps & ShadowOnScroll>`
  box-shadow: ${({ isScrolled }) => (isScrolled ? DROP_SHADOW : "none")};
  transition: box-shadow 250ms ease-in-out;
`

const ModalScrollContent = styled(Flex)<ModalScrollContentProps>`
  overflow: auto;
  flex-direction: column;
`

const CloseIconWrapper = styled(Flex)`
  cursor: pointer;
`

const Logo = styled(ArtsyLogoBlackIcon)`
  width: 78px;
`

Modal.displayName = "Modal"
ModalWrapper.displayName = "ModalWrapper"
ModalScrollContent.displayName = "ModalScrollContent"
