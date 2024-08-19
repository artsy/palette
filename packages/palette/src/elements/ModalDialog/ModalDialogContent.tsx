import React, { FC } from "react"
import { Clickable, ClickableProps } from "../Clickable"
import { Box, BoxProps } from "../Box"
import { Flex } from "../Flex"
import { Text } from "../Text"
import CloseIcon from "@artsy/icons/CloseIcon"
import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import { useSentinelVisibility } from "../../utils/useSentinelVisibility"
import { Spacer } from "../Spacer"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { useTheme } from "../../Theme"

export interface ModalDialogContentProps
  extends BoxProps,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  footer?: React.ReactNode
  hasLogo?: boolean
  leftPanel?: React.ReactNode
  onClose: () => void
  rightPanel?: React.ReactNode
  title?: string
  header?: React.ReactNode
}

export const ModalDialogContent: React.FC<ModalDialogContentProps> = ({
  children,
  footer,
  hasLogo,
  leftPanel,
  onClose,
  rightPanel,
  title,
  header,
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

  const { theme } = useTheme()

  return (
    <Flex
      bg="white100"
      m={2}
      style={{ boxShadow: theme.effects.dropShadow }}
      {...rest}
    >
      {leftPanel}

      <Flex flexDirection="column" overflow="hidden" width="100%">
        <Flex
          flexDirection="column"
          zIndex={1}
          style={{
            transition: "box-shadow 250ms",
            boxShadow: isAtTop ? theme.effects.dropShadow : undefined,
          }}
        >
          <Flex alignItems="flex-start" justifyContent="space-between">
            {(title || hasLogo) && (
              <Box m={2}>
                {hasLogo && (
                  <ArtsyLogoIcon display="block" width={75} height={26} />
                )}

                {hasLogo && title && <Spacer y={2} />}

                {title && (
                  <Text variant="lg-display" lineClamp={6} hyphenate>
                    {title}
                  </Text>
                )}
              </Box>
            )}

            <ModalClose onClick={onClose} />
          </Flex>

          {header && (
            <Box px={2} pb={2}>
              {header}
            </Box>
          )}
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
              boxShadow: isAtBottom ? theme.effects.dropShadow : undefined,
            }}
          >
            {footer}
          </Box>
        )}
      </Flex>

      {rightPanel}
    </Flex>
  )
}

export type ModalCloseProps = ClickableProps

export const ModalClose: FC<ModalCloseProps> = (props) => {
  return (
    <Close p={2} ml="auto" aria-label="Close" {...props}>
      <CloseIcon fill="currentColor" display="block" />
    </Close>
  )
}

const Close = styled(Clickable)`
  color: ${themeGet("colors.black100")};

  &:focus,
  &:focus-visible {
    outline: none;
    color: ${themeGet("colors.black60")};
  }
`
