import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled, { keyframes } from "styled-components"
import { border, BorderProps } from "styled-system"
import { splitProps } from "../../utils/splitProps"
import { Box, BoxProps } from "../Box"
import { Text, TextProps } from "../Text"

interface DoneProps {
  done?: boolean
}

/** SkeletonProps */
export type SkeletonBoxProps = BoxProps & DoneProps

/** Skeleton */
export const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  done,
  children,
  ...rest
}) => {
  return (
    <Box bg="black10" position="relative" overflow="hidden" {...rest}>
      {!done && (
        <SkeletonFade
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
        />
      )}

      {children}
    </Box>
  )
}

const splitBorderProps = splitProps<BorderProps>(border)

/** SkeletonTextProps */
export type SkeletonTextProps = TextProps & {
  done?: boolean
}

const SkeletonTextOverlay = styled(SkeletonBox)`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: calc(100% - 0.25em);
  transform: translateY(-50%);
`

/** SkeletonText */
export const SkeletonText: React.FC<SkeletonTextProps> = ({
  children,
  done,
  ...rest
}) => {
  const [borderProps, textProps] = splitBorderProps(rest)

  return (
    <Text color="transparent" {...textProps}>
      <Box as="span" display="inline-flex" position="relative" aria-hidden>
        {children}

        <SkeletonTextOverlay done={done} {...borderProps} />
      </Box>
    </Text>
  )
}

const FADE = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`

const SkeletonFade = styled(Box)<DoneProps>`
  background-color: ${themeGet("colors.black5")};
  animation: ${FADE} 2s ease-in-out infinite;
`
