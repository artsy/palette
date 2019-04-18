import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { color } from "../../helpers"
import { Flex } from "../Flex"
import { Sans } from "../Typography"
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

function useHighlightLabelPositionConstraints(
  wrapperDiv: HTMLDivElement | null,
  labelDiv: HTMLDivElement | null
) {
  // Constrain highlight label to be within the bounds of the graph
  useEffect(() => {
    if (!wrapperDiv || !labelDiv) {
      return
    }
    // reset highlight label position
    labelDiv.style.left = null
    labelDiv.style.right = null
    // force layout to find centered position
    labelDiv.offsetWidth

    const wrapperRect = wrapperDiv.getBoundingClientRect()
    const labelRect = labelDiv.getBoundingClientRect()

    // check for overlap with BarChart left bound
    const labelLeftOffset = wrapperRect.left - labelRect.left
    if (labelLeftOffset > 0) {
      // label is too far to the left, compensate
      labelDiv.style.left = labelLeftOffset + "px"
      return
    }
    // check for overlap with BarChart right bound
    const labelRightOffset = labelRect.right - wrapperRect.right
    if (labelRightOffset > 0) {
      // label is too far to the right, compensate
      labelDiv.style.right = labelRightOffset + "px"
    }
  })
}

export interface BarDescriptor {
  value: number
  label?: React.ReactNode | BarLabelProps
  highlightLabel?: React.ReactNode | BarLabelProps
  onClick?: any
  onHover?: any
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
  const wrapperRef = useRef<HTMLDivElement>(null)
  const highlightLabelRef = useRef<HTMLDivElement>(null)

  useHighlightLabelPositionConstraints(
    wrapperRef.current,
    highlightLabelRef.current
  )

  const hasEnteredViewport = useHasEnteredViewport(wrapperRef)
  const [minHeight, setMinHeight] = useState(0)
  const maxValue = bars.reduce((max, { value }) => {
    return value > max ? value : max
  }, -Infinity)
  return (
    <ProvideMousePosition>
      <Flex
        flexDirection="column"
        ref={wrapperRef as any}
        flexGrow="1"
        id="flex-wrapper"
      >
        <ChartContainer
          height="80px"
          alignItems="flex-end"
          mb={0.5}
          style={{ minHeight }}
        >
          {bars.map(
            ({ value, label, highlightLabel, onClick, onHover }, index) => {
              const heightPercent = (100 / maxValue) * value
              return (
                <Bar
                  key={index}
                  heightPercent={heightPercent}
                  label={coerceLabel(label)}
                  highlightLabelRef={highlightLabelRef}
                  highlightLabel={coerceLabel(highlightLabel)}
                  hasEnteredViewport={hasEnteredViewport}
                  onMeasureHeight={highlightLabel ? setMinHeight : null}
                  onClick={onClick}
                  onHover={onHover}
                />
              )
            }
          )}
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
