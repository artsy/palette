import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled, { keyframes } from "styled-components"
import { border, BorderProps } from "styled-system"
import { splitProps } from "../../utils/splitProps"
import { Box, BoxProps } from "../Box"
import { Text, TextProps } from "../Text"

/** PlaceholderProps */
export type PlaceholderBoxProps = BoxProps

/** A black10 Box */
export const PlaceholderBox = styled(Box)``
PlaceholderBox.defaultProps = { bg: "black10" }

const splitBorderProps = splitProps<BorderProps>(border)

/** PlaceholderTextProps */
export type PlaceholderTextProps = TextProps

const PlaceholderTextOverlay = styled(PlaceholderBox)`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: calc(100% - 0.25em);
  transform: translateY(-50%);
`

/**
 * Allows you to create boxes the exact dimensions of a given piece of text
 */
export const PlaceholderText: React.FC<PlaceholderTextProps> = ({
  children,
  ...rest
}) => {
  const [borderProps, textProps] = splitBorderProps(rest)

  return (
    <Text color="transparent" {...textProps}>
      <Box as="span" display="inline-flex" position="relative" aria-hidden>
        {children}

        <PlaceholderTextOverlay {...borderProps} />
      </Box>
    </Text>
  )
}

const FADE_ANIMATION = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 0; }
  100% { opacity: 0.5; }
`

const PlaceholderFade = styled(Box)`
  background-color: ${themeGet("colors.white100")};
  animation: ${FADE_ANIMATION} 2s ease-in-out infinite;
`

export type PlaceholderProps = BoxProps

export const Placeholder: React.FC<PlaceholderProps> = ({
  children,
  ...rest
}) => {
  return (
    <Box position="relative" {...rest}>
      {children}

      <PlaceholderFade
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        left={0}
      />
    </Box>
  )
}
