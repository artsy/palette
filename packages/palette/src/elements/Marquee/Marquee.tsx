import React, { useState, useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components"
import { variant } from "styled-system"
import { TextVariant } from "@artsy/palette-tokens/dist/typography/types"
import { Flex } from "../Flex"
import { Box, BoxProps } from "../Box"
import { media } from "../../helpers"
import { Text } from "../Text"

const VARIANTS = {
  defaultLight: {
    backgroundColor: "black10",
    color: "black100",
  },
  defaultDark: {
    backgroundColor: "black100",
    color: "white100",
  },
  brand: {
    backgroundColor: "brand",
    color: "white100",
  },
}

const move = (props) => keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-${props.offset}px);
  }
`

const Container = styled(Box)`
  ${variant({ variants: VARIANTS })}
  width: 100%;
  overflow-x: hidden;
`
const StyledText = styled(Text)`
  ${variant({ variants: VARIANTS })}
  white-space: nowrap;
`

const Inner = styled.div<{
  speed: string
  mobileSpeed: string
  offset: number
}>`
  animation: ${move} ${(props) => props.speed} infinite linear;
  cursor: default;
  user-select: none;
  white-space: nowrap;
  ${media.xs`
    animation: ${move} ${(props) => props.mobileSpeed} infinite linear;
  `};
`

const Item = styled.div`
  display: inline-block;
`

export interface MarqueeProps extends BoxProps {
  variant?: keyof typeof VARIANTS
  speed?: string
  mobileSpeed?: string
  color?: string
  marqueeText: string
  textSize?: TextVariant
  divider?: boolean
}

export const Marquee: React.FC<MarqueeProps> = ({
  marqueeText,
  textSize = "sm",
  divider = true,
  speed = "30s",
  mobileSpeed = "10s",
  color,
  ...rest
}) => {
  const containerEl = useRef<HTMLDivElement | null>(null)
  const childEl = useRef<HTMLDivElement | null>(null)

  const [amount, setAmount] = useState(1)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (!childEl.current || !containerEl.current) {
      return
    }
    const containerWidth = containerEl.current.getBoundingClientRect().width
    const childWidth = childEl.current.getBoundingClientRect().width
    const targetAmount = Math.min(Math.ceil(containerWidth / childWidth), 100)

    setOffset(targetAmount * childWidth)
    setAmount(Math.ceil(targetAmount * 2))
  }, [])

  return (
    <Container ref={containerEl as any} backgroundColor={color} {...rest}>
      <Inner speed={speed} mobileSpeed={mobileSpeed} offset={offset}>
        {Array.from(Array(amount)).map((_, i) => (
          <Item key={i} ref={childEl as any}>
            <Flex>
              <StyledText px={[2, 4]} py={0.5} variant={textSize}>
                {marqueeText}
              </StyledText>
              {divider && (
                <StyledText px={[1, 4]} py={0.5} variant={textSize}>
                  •
                </StyledText>
              )}
            </Flex>
          </Item>
        ))}
      </Inner>
    </Container>
  )
}

Marquee.defaultProps = {
  variant: "defaultDark",
}
