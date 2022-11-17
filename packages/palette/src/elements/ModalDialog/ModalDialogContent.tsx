import React from "react"
import { Clickable } from "../Clickable"
import { DROP_SHADOW } from "../../helpers/shadow"
import { Box, BoxProps } from "../Box"
import { Flex } from "../Flex"
import { Text } from "../Text"
import { CloseIcon } from "../../svgs/CloseIcon"
import { ArtsyLogoBlackIcon } from "../../svgs/ArtsyLogoBlackIcon"
import { useSentinelVisibility } from "../../utils/useSentinelVisibility"
import { Spacer } from "../Spacer"

export interface ModalDialogContentProps
  extends BoxProps,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  footer?: React.ReactNode
  hasLogo?: boolean
  onClose: () => void
  title?: string
}

export const ModalDialogContent: React.FC<ModalDialogContentProps> = ({
  children,
  footer,
  hasLogo,
  onClose,
  title,
  ...rest
}) => {
  const {
    sentinel: topSentinel,
    isSentinelVisible: isAtTop,
  } = useSentinelVisibility()

  const {
    sentinel: bottomSentinel,
    isSentinelVisible: isAtBottom,
  } = useSentinelVisibility()

  return (
    <Flex
      bg="white100"
      flexDirection="column"
      overflow="hidden"
      m={2}
      style={{ boxShadow: DROP_SHADOW }}
      {...rest}
    >
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        zIndex={1}
        style={{
          transition: "box-shadow 250ms",
          boxShadow: isAtTop ? DROP_SHADOW : undefined,
        }}
      >
        {(title || hasLogo) && (
          <Box m={2}>
            {hasLogo && (
              <ArtsyLogoBlackIcon
                display="block"
                style={{ width: "75px", height: "26px" }}
              />
            )}

            {hasLogo && title && <Spacer mt={2} />}

            {title && <Text variant="lg-display">{title}</Text>}
          </Box>
        )}

        <Clickable p={2} ml="auto" onClick={onClose} aria-label="Close">
          <CloseIcon fill="black100" display="block" />
        </Clickable>
      </Flex>

      <Box
        px={2}
        pb={2}
        flex={1}
        overflow="auto"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {topSentinel}
        {children}
        {bottomSentinel}
      </Box>

      {footer && (
        <Box
          p={2}
          style={{
            transition: "box-shadow 250ms",
            boxShadow: isAtBottom ? DROP_SHADOW : undefined,
          }}
        >
          {footer}
        </Box>
      )}
    </Flex>
  )
}
