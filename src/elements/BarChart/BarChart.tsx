import React, { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { color, space } from "../../helpers"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Sans } from "../Typography"

interface BarBoxProps {
  isHighlighted?: boolean
}

const BarBox = styled(Box)`
  transition: height 0.8s ease;
  position: relative;
  background: ${(props: BarBoxProps) =>
    props.isHighlighted ? color("black60") : color("black10")};
  margin-right: 2px;
  :last-child {
    margin-right: 0;
  }
  flex: 1;
  cursor: pointer;
  :hover {
    background: ${(props: BarBoxProps) =>
      props.isHighlighted ? color("black60") : color("black30")};
  }
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
`

const LabelWrapper = styled(Flex)`
  z-index: 2;
  background-color: ${color("white100")};
  border-radius: 2px;
  padding: ${space(0.5)}px ${space(1)}px;
  position: fixed;
  transform: translateX(-50%);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
  text-align: center;
  white-space: nowrap;
`
const ChartContainer = styled(Flex)`
  border-bottom: 1px solid ${color("black10")};
`

const StaticLabelPositioner = styled(Flex)`
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
  white-space: nowrap;
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

const MousePositionContext = React.createContext({ x: 0, y: 0 })

const ProvideMousePosition: React.SFC = ({ children }) => {
  const [state, setState] = useState({ x: 0, y: 0 })

  useEffect(
    () => {
      const setMousePosition = (ev: MouseEvent) => {
        setState({
          x: ev.clientX,
          y: ev.clientY,
        })
      }
      window.addEventListener("mousemove", setMousePosition)
      return () => {
        window.removeEventListener("mousemove", setMousePosition)
      }
    },
    [false]
  )

  return (
    <MousePositionContext.Provider value={state}>
      {children}
    </MousePositionContext.Provider>
  )
}

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

const StaticLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <StaticLabelPositioner>
      <StaticLabelWrapper>{children}</StaticLabelWrapper>
      <LabelLine />
    </StaticLabelPositioner>
  )
}

const Bar = ({
  heightPercent,
  label,
  staticLabel,
  isHighlighted,
  hasEnteredViewport,
}: {
  heightPercent: number
  label: React.ReactNode
  staticLabel?: React.ReactNode
  isHighlighted?: boolean
  hasEnteredViewport: boolean
}) => {
  const [hover, setHover] = useState(false)
  const height =
    heightPercent === 0 || !hasEnteredViewport
      ? "0px"
      : 10 + 0.7 * heightPercent + "px"
  return (
    <BarBox
      style={{ height }}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      isHighlighted={isHighlighted}
    >
      {staticLabel && <StaticLabel>{staticLabel}</StaticLabel>}
      {hover && label && <BarHoverLabel>{label}</BarHoverLabel>}
    </BarBox>
  )
}

const useHasEnteredViewport = (ref: React.RefObject<HTMLElement>) => {
  const [hasEntered, setHasEntered] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const rect = ref.current.getBoundingClientRect()
      if (rect.top <= window.innerHeight - rect.height) {
        setHasEntered(true)
        window.removeEventListener("scroll", handleScroll)
      }
    }
    window.addEventListener("scroll", handleScroll)
    window.dispatchEvent(new Event("scroll"))
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })
  return hasEntered
}

export const BarChart = () => {
  const ref = useRef(null)
  const hasEnteredViewport = useHasEnteredViewport(ref)
  return (
    <ProvideMousePosition>
      <Flex flexDirection="column" ref={ref}>
        <ChartContainer height="80px" width={200} alignItems="flex-end" mb={1}>
          <Bar
            heightPercent={20}
            label="yo"
            hasEnteredViewport={hasEnteredViewport}
          />
          <Bar
            heightPercent={30}
            label="yo"
            hasEnteredViewport={hasEnteredViewport}
          />
          <Bar
            heightPercent={100}
            label="yo"
            isHighlighted
            hasEnteredViewport={hasEnteredViewport}
            staticLabel={
              <Flex alignItems="center" flexDirection="column">
                <Sans weight="medium" size="2">
                  $30,000
                </Sans>
                <Sans color={"black60"} size="2">
                  This artwork
                </Sans>
              </Flex>
            }
          />
          <Bar
            heightPercent={100}
            label={"hello"}
            hasEnteredViewport={hasEnteredViewport}
          />
          <Bar
            heightPercent={0}
            label="yo"
            hasEnteredViewport={hasEnteredViewport}
          />
          <Bar
            heightPercent={1}
            label="yo"
            hasEnteredViewport={hasEnteredViewport}
          />
          <Bar
            heightPercent={5}
            label="yo"
            hasEnteredViewport={hasEnteredViewport}
          />
          <Bar
            heightPercent={50}
            hasEnteredViewport={hasEnteredViewport}
            label={
              <Flex alignItems="center" flexDirection="column">
                <Sans size="2" weight="medium">
                  Sept 30
                </Sans>
                <Sans size="2" color="black60">
                  423 views
                </Sans>
              </Flex>
            }
          />
          <Bar
            heightPercent={100}
            label={"hello"}
            hasEnteredViewport={hasEnteredViewport}
          />
        </ChartContainer>
        <Flex justifyContent="space-between">
          <Sans color={"black60"} size="2">
            $50
          </Sans>
          <Sans color={"black60"} size="2">
            $50,000
          </Sans>
        </Flex>
      </Flex>
    </ProvideMousePosition>
  )
}
