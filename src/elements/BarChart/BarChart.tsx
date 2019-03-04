import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { color, space } from "../../helpers"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Sans } from "../Typography"

const BarBox = styled(Box)`
  background: ${color("black10")};
  margin-right: 2px;
  :last-child {
    margin-right: 0;
  }
  flex: 1;
  cursor: pointer;
  :hover {
    background: ${color("black30")};
  }
`

const LabelWrapper = styled(Box)`
  background-color: ${color("white100")};
  border-radius: 2px;
  padding: ${space(0.5)}px ${space(1)}px;
  position: fixed;
  transform: translateX(-50%);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
`

const StaticLabelWrapper = styled(LabelWrapper)`
  border: 1px solid ${color("black10")};
  position: absolute;
  top: -10px;
  transform: translate(-50%, -100%);
  left: 50%;
  box-shadow: none;
`

const StaticLabelLine = styled.div`
  width: 0px;
  height: 10px;
  border-left: 1px dotted ${color("black30")};
  position: absolute;
  top: -10px;
  left: 50%;
`

const useToolTipPositioning = (ref: React.RefObject<HTMLDivElement>) => {
  useEffect(
    () => {
      const setLabelPosition = e => {
        const x = e.clientX
        const y = e.clientY
        const height = ref.current.offsetHeight
        const top = y - height - 10
        ref.current.style.top = top + "px"
        ref.current.style.left = x + "px"
      }

      window.addEventListener("mousemove", setLabelPosition)

      return () => {
        window.removeEventListener("mousemove", setLabelPosition)
      }
    },
    [false]
  )
}

const BarHoverLabel = ({ children }: { children: React.ReactNode }) => {
  const labelRef = useRef(null)
  useToolTipPositioning(labelRef)
  return <LabelWrapper ref={labelRef}>{children}</LabelWrapper>
}
const StaticLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <StaticLabelLine />
      <StaticLabelWrapper>{children}</StaticLabelWrapper>
    </>
  )
}

const Bar = ({
  heightPercent,
  label,
  staticLabel,
}: {
  heightPercent: number
  label: React.ReactNode
  staticLabel: React.ReactNode
}) => {
  const [hover, setHover] = useState(false)
  const px = heightPercent === 0 ? "0px" : 10 + 0.7 * heightPercent + "px"
  return (
    <>
      {hover && label && <BarHoverLabel>{label}</BarHoverLabel>}
      <BarBox
        height={px}
        onMouseEnter={() => {
          setHover(true)
        }}
        onMouseLeave={() => {
          setHover(false)
        }}
        position="relative"
      >
        {staticLabel && <StaticLabel>{staticLabel}</StaticLabel>}
      </BarBox>
    </>
  )
}

export const BarChart = () => (
  <Flex height="80px" width={200} alignItems="flex-end">
    <Bar heightPercent={20} label="yo" />
    <Bar heightPercent={30} label="yo" />
    <Bar heightPercent={40} label="yo" staticLabel="I am static" />
    <Bar heightPercent={0} label="yo" />
    <Bar heightPercent={1} label="yo" />
    <Bar heightPercent={5} label="yo" />
    <Bar
      heightPercent={50}
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
    <Bar heightPercent={100} label={"hello"} />
  </Flex>
)
