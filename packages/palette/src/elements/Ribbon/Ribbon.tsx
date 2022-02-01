import { TextVariant } from "@artsy/palette-tokens/dist/typography/types"
import React from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import { useThemeConfig } from "../../Theme"
import { Flex, FlexProps } from "../Flex"
import { Text } from "../Text"
import { keyframes } from "styled-components"
import { Box } from "../Box"

const VARIANTS = {
  defaultLight: {
    backgroundColor: "black10",
    color: "black100",
  },
  defaultDark: {
    backgroundColor: "black100",
    color: "white100",
  },
  success: {
    backgroundColor: "green100",
    color: "white100",
  },
  error: {
    backgroundColor: "red100",
    color: "white100",
  },
  brand: {
    backgroundColor: "brand",
    color: "white100",
  },
}
const marquee = keyframes`
  0% { left: 0; }
  100% { left: -100%; }
`

const Container = styled(Flex)`
  ${variant({ variants: VARIANTS })}
  overflow: hidden;
  position: relative;
  /* width: 1000px;
  height: 30px; */
`
const InnerContainer = styled(Flex)`
  display: block;
  width: 200%;
  /* height: 30px; */

  position: absolute;
  overflow: hidden;

  animation: ${marquee} 5s linear infinite;
`

const StyledText = styled(Text)`
  ${variant({ variants: VARIANTS })}
  white-space: nowrap;
  float: left;
  width: 50%;
`

export interface RibbonProps extends FlexProps {
  variant?: keyof typeof VARIANTS
  ribbonText: string
  ribbonDivider?: string
  repetitionCount?: number
}

/** A ribbon */
export const Ribbon: React.FC<RibbonProps> = ({
  ribbonText,
  repetitionCount,
  ribbonDivider = "•",
  ...rest
}) => {
  const size: TextVariant = useThemeConfig({ v2: "small", v3: "sm" })

  return (
    <Container
      justifyContent="space-between"
      alignItems="center"
      p={0.5}
      {...rest}
      overFlow="hidden"
    >
      {Array.from(Array(repetitionCount), (i) => {
        return (
          <InnerContainer key={`ribbon-text-${i}`}>
            <StyledText variant={size} textAlign="center" flex="1">
              {ribbonText}
            </StyledText>
            <StyledText variant={size} textAlign="center" flex="1">
              {ribbonDivider}
            </StyledText>
          </InnerContainer>
        )
      })}
    </Container>
  )
}

Ribbon.defaultProps = {
  variant: "defaultDark",
  repetitionCount: 1,
}
