import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { color } from "../../helpers"
import { Flex } from "../Flex"
import { Sans } from "../Typography"
import { Bar } from "./Bar"
import { ProvideMousePosition } from "./MousePositionContext"

const ChartContainer = styled(Flex)`
  border-bottom: 1px solid ${color("black10")};
`

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

export interface BarDescriptor {
  value: number
  label?: React.ReactNode
  highlightLabel?: React.ReactNode
}

export interface BarChartProps {
  bars: BarDescriptor[]
  minLabel: React.ReactNode
  maxLabel: React.ReactNode
}
export const BarChart = ({ bars, minLabel, maxLabel }: BarChartProps) => {
  const ref = useRef(null)
  const hasEnteredViewport = useHasEnteredViewport(ref)
  const [minHeight, setMinHeight] = useState(0)
  const maxValue = bars.reduce((max, { value }) => {
    return value > max ? value : max
  }, -Infinity)
  return (
    <ProvideMousePosition>
      <Flex flexDirection="column" ref={ref}>
        <ChartContainer
          height="80px"
          width={200}
          alignItems="flex-end"
          mt={2}
          mb={0.5}
          style={{ minHeight }}
        >
          {bars.map(({ value, label, highlightLabel }, index) => {
            return (
              <Bar
                key={index}
                heightPercent={(100 / maxValue) * value}
                label={label}
                highlightLabel={highlightLabel}
                hasEnteredViewport={hasEnteredViewport}
                onMeasureHeight={
                  highlightLabel ? height => setMinHeight(height) : null
                }
              />
            )
          })}
        </ChartContainer>
        <Flex justifyContent="space-between">
          <Sans color={"black60"} size="2">
            {minLabel}
          </Sans>
          <Sans color={"black60"} size="2">
            {maxLabel}
          </Sans>
        </Flex>
      </Flex>
    </ProvideMousePosition>
  )
}
