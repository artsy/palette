import React, { SFC } from "react"
import styled from "styled-components"
import { color } from "../../helpers"
import { Flex } from "../Flex"
import { Modal, ModalWidth } from "../Modal"
import { Text } from "../Text"

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
 * Spec: https://app.zeplin.io/project/5acd19ff49a1429169c3128b/screen/5b9a7bdaa2fa5551fff7c014
 */
export const Dialog: SFC<DialogProps> = ({
  title,
  detail,
  show = true,
  primaryCta,
  secondaryCta,
  onClose = () => null,
}) => {
  // FIXME: Refactor to a button
  const StyledText = styled(Text)`
    transition: color 0.14s ease;
    cursor: pointer;
    color: ${color("purple100")};
  `

  const ModalButton: React.SFC<{
    secondary?: boolean
    onClick: () => void
  }> = props => {
    return <StyledText pl={4} variant="mediumText" {...props} />
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
          <Text variant="subtitle" mb={10}>
            {title}
          </Text>
          {detail && (
            <Text variant="text" color="black60">
              {detail}
            </Text>
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
