import { themeGet } from "@styled-system/theme-get"
import React, { useMemo } from "react"
import styled, { keyframes } from "styled-components"
import { border, BorderProps } from "styled-system"
import { splitProps } from "../../utils/splitProps"
import { Box, BoxProps } from "../Box"
import { Text, TextProps } from "../Text"

/** SkeletonProps */
export type SkeletonBoxProps = BoxProps

/** A mono10 Box */
export const SkeletonBox = styled(Box)``
SkeletonBox.defaultProps = { bg: "mono10" }
SkeletonBox.displayName = "SkeletonBox"

const splitBorderProps = splitProps<BorderProps>(border)

/** SkeletonTextProps */
export type SkeletonTextProps = TextProps

const SkeletonTextOverlay = styled(SkeletonBox)`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: calc(100% - 0.25em);
  transform: translateY(-50%);
`

const toBlockCharacters = (text: React.ReactNode): string => {
  if (typeof text === 'string') {
    return text.replace(/\S/g, '█')
  }
  if (typeof text === 'number') {
    return text.toString().replace(/\S/g, '█')
  }
  return '████████'
}

/**
 * Allows you to create boxes the exact dimensions of a given piece of text
 */
export const SkeletonText: React.FC<
  React.PropsWithChildren<SkeletonTextProps>
> = ({ children, ...rest }) => {
  const [borderProps, textProps] = splitBorderProps(rest)
  const blocks = useMemo(() => toBlockCharacters(children), [children])

  return (
    <Text color="transparent" {...textProps}>
      <Box as="span" display="inline-flex" position="relative" aria-hidden="true">
        {blocks}

        <SkeletonTextOverlay {...borderProps} />
      </Box>
    </Text>
  )
}

const FADE_ANIMATION = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 0; }
  100% { opacity: 0.5; }
`

const SkeletonFade = styled(Box)`
  background-color: ${themeGet("colors.mono0")};
  animation: ${FADE_ANIMATION} 2s ease-in-out infinite;
`

export type SkeletonProps = BoxProps

/**
 * Animated wrapper for Skeletons
 */
export const Skeleton: React.FC<React.PropsWithChildren<SkeletonProps>> = ({
  children,
  ...rest
}) => {
  return (
    <Box position="relative" {...rest}>
      {children}

      <SkeletonFade position="absolute" top={0} right={0} bottom={0} left={0} />
    </Box>
  )
}
