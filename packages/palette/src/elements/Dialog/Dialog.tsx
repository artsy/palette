import React, { SFC } from "react"
import styled from "styled-components"
import { color } from "../../helpers"
import { Flex } from "../Flex"
import { Modal, ModalWidth } from "../Modal"
import { Sans } from "../Typography"

interface CtaProps {
  action(): void
  text: React.ReactNode
}

interface DialogProps {
  detail?: React.ReactNode
  primaryCta: CtaProps
  secondaryCta?: CtaProps
  onClose?: () => void
  show?: boolean
  title: string
}

/**
 * Dialog.
 * @deprecated: Use `ModalDialog` instead
 */
export const Dialog: SFC<DialogProps> = ({
  title,
  detail,
  show = true,
  primaryCta,
  secondaryCta,
  onClose = () => null,
}) => {
  const StyledSans = styled(Sans)`
    transition: color 0.14s ease;
    cursor: pointer;
    color: ${color("purple100")};
  `

  const ModalButton: React.FC<{
    secondary?: boolean
    onClick: () => void
  }> = (props) => {
    return <StyledSans pl={4} size="3" weight="medium" {...props} />
  }

  return (
    <Modal
      show={show}
      onClose={onClose}
      modalWidth={ModalWidth.Narrow}
      hideCloseButton
    >
      <>
        <Flex flexDirection="column">
          <Sans size="4" weight="medium" mb={10}>
            {title}
          </Sans>
          {detail && (
            <Sans size="3" color="black60">
              {detail}
            </Sans>
          )}
        </Flex>
        <Flex mt={3} justifyContent="flex-end">
          {secondaryCta && (
            <ModalButton secondary onClick={secondaryCta.action}>
              {secondaryCta.text}
            </ModalButton>
          )}
          <ModalButton onClick={primaryCta.action}>
            {primaryCta.text}
          </ModalButton>
        </Flex>
      </>
    </Modal>
  )
}

Dialog.displayName = "Dialog"
