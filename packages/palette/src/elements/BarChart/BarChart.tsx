import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { color } from "../../helpers"
import { Sans } from "../../tokens/Typography"
import { Flex } from "../Flex"
import { Bar } from "./Bar"
import { BarLabel, BarLabelProps, isBarLabelProps } from "./BarLabel"
import { ProvideMousePosition } from "./MousePositionContext"

const ChartContainer = styled(Flex)`
  border-bottom: 1px solid ${color("black10")};
  flex: 1;
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

const coerceLabel = (label: React.ReactNode | BarLabelProps) =>
  isBarLabelProps(label) ? <BarLabel {...label} /> : label

export interface BarDescriptor {
  value: number
  label?: React.ReactNode | BarLabelProps
  highlightLabel?: React.ReactNode | BarLabelProps
}

export interface BarChartProps {
  bars: BarDescriptor[]
  minLabel: React.ReactNode
  maxLabel: React.ReactNode
}
/**
 * BarChart is a component which displays some bars of varying heights in a row.
 * Useful for histograms etc.
 * @param props props
 */
export const BarChart = ({ bars, minLabel, maxLabel }: BarChartProps) => {
  const ref = useRef(null)
  const hasEnteredViewport = useHasEnteredViewport(ref)
  const [minHeight, setMinHeight] = useState(0)
  const maxValue = bars.reduce((max, { value }) => {
    return value > max ? value : max
  }, -Infinity)
  return (
    <ProvideMousePosition>
      <Flex flexDirection="column" ref={ref} flexGrow="1">
        <ChartContainer
          height="80px"
          alignItems="flex-end"
          mb={0.5}
          style={{ minHeight }}
        >
          {bars.map(({ value, label, highlightLabel }, index) => {
            const heightPercent = (100 / maxValue) * value
            return (
              <Bar
                key={index}
                heightPercent={heightPercent}
                label={coerceLabel(label)}
                highlightLabel={coerceLabel(highlightLabel)}
                hasEnteredViewport={hasEnteredViewport}
                onMeasureHeight={highlightLabel ? setMinHeight : null}
              />
            )
          })}
        </ChartContainer>
        <Flex justifyContent="space-between">
          <Sans color="black60" size="2">
            {minLabel}
          </Sans>
          <Sans color="black60" size="2">
            {maxLabel}
          </Sans>
        </Flex>
      </Flex>
    </ProvideMousePosition>
  )
}
