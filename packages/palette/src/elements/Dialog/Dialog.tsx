import React, { FC } from "react"
import { Button } from "../Button"
import { Flex } from "../Flex"
import { Modal, ModalWidth } from "../Modal"
import { Spacer } from "../Spacer"
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
 * @deprecated: Use `ModalDialog` instead
 */
export const Dialog: FC<DialogProps> = ({
  title,
  detail,
  show = true,
  primaryCta,
  secondaryCta,
  onClose = () => null,
}) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      modalWidth={ModalWidth.Narrow}
      hideCloseButton
    >
      <>
        <Flex flexDirection="column">
          <Text variant="sm-display" fontWeight="bold" mb={1}>
            {title}
          </Text>

          {detail && (
            <Text variant="xs" color="black60">
              {detail}
            </Text>
          )}
        </Flex>

        <Flex mt={2} justifyContent="flex-end">
          {secondaryCta && (
            <>
              <Button
                onClick={secondaryCta.action}
                size="small"
                variant="secondaryBlack"
              >
                {secondaryCta.text}
              </Button>

              <Spacer x={1} />
            </>
          )}

          <Button onClick={primaryCta.action} size="small">
            {primaryCta.text}
          </Button>
        </Flex>
      </>
    </Modal>
  )
}

Dialog.displayName = "Dialog"
