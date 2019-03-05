import React, { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { color, media, space } from "../../helpers"
import { breakpoints } from "../../Theme"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { MousePositionContext } from "./MousePositionContext"

interface BarBoxProps {
  isHighlighted?: boolean
}

const hideOnMobile = media.xs`
  display: none;
`

const BarBox = styled(Box)`
  transition: height 0.8s ease;
  position: relative;
  background: ${(props: BarBoxProps) =>
    props.isHighlighted ? color("black60") : color("black10")};
  margin-right: 2px;
  margin-bottom: -1px;
  :last-child {
    margin-right: 0;
  }
  flex: 1;
  cursor: pointer;
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
  @media (min-width: ${breakpoints.sm}px) {
    :hover {
      background: ${(props: BarBoxProps) =>
        props.isHighlighted ? color("black60") : color("black30")};
    }
  }
`

const LabelWrapper = styled(Flex)`
  ${hideOnMobile};
  z-index: 2;
  background-color: ${color("white100")};
  border-radius: 2px;
  padding: ${space(0.5)}px ${space(1)}px;
  position: fixed;
  transform: translateX(-50%);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
  text-align: center;
`

const StaticLabelPositioner = styled(Flex)`
  ${hideOnMobile};
  z-index: 1;
  pointer-events: none;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  bottom: 100%;
  flex-direction: column;
  align-items: center;
`
const StaticLabelWrapper = styled(Flex)`
  position: relative;
  background-color: ${color("white100")};
  border: 1px solid ${color("black10")};
  padding: ${space(0.5)}px ${space(1)}px;
  border-radius: 2px;
`

const LabelLine = () => (
  <svg width="2" height="10" viewBox="0 0 2 10">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.5 1.11111V0H1.5V1.11111H0.5ZM0.5 4.44444V2.22222H1.5V4.44444H0.5ZM0.5 7.77778V5.55556H1.5V7.77778H0.5ZM0.5 10V8.88889H1.5V10H0.5Z"
      fill={color("black30")}
    />
  </svg>
)

const useToolTipPositioning = (ref: React.RefObject<HTMLDivElement>) => {
  const { x, y } = useContext(MousePositionContext)
  if (ref.current) {
    return { top: y - 10 - ref.current.offsetHeight, left: x }
  }
  return { top: 0, left: 0 }
}

const BarHoverLabel = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null)
  const { top, left } = useToolTipPositioning(ref)
  return (
    <LabelWrapper ref={ref} style={{ top: top + "px", left: left + "px" }}>
      {children}
    </LabelWrapper>
  )
}

const HighlightLabel = ({
  children,
  onMeasureHighlightLabel,
}: {
  children: React.ReactNode
  onMeasureHighlightLabel: (height: number) => void
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    onMeasureHighlightLabel(ref.current.offsetHeight)
  })
  return (
    <StaticLabelPositioner ref={ref as any}>
      <StaticLabelWrapper>{children}</StaticLabelWrapper>
      <LabelLine />
    </StaticLabelPositioner>
  )
}

export const Bar = ({
  heightPercent,
  label,
  highlightLabel,
  hasEnteredViewport,
  onMeasureHeight,
}: {
  heightPercent: number
  label: React.ReactNode
  highlightLabel?: React.ReactNode
  hasEnteredViewport: boolean
  onMeasureHeight?: (height: number) => void
}) => {
  const [hover, setHover] = useState(false)
  const height =
    heightPercent === 0 || !hasEnteredViewport ? 0 : 10 + 0.7 * heightPercent
  return (
    <BarBox
      style={{ height }}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      isHighlighted={Boolean(highlightLabel)}
    >
      {highlightLabel && (
        <HighlightLabel
          onMeasureHighlightLabel={labelHeight =>
            onMeasureHeight(labelHeight + 10 + 0.7 * heightPercent)
          }
        >
          {highlightLabel}
        </HighlightLabel>
      )}
      {hover && label && <BarHoverLabel>{label}</BarHoverLabel>}
    </BarBox>
  )
}
