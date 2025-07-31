import { Color, Flex, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { ChartTooltipProps, coerceTooltip } from "../DataVis/ChartTooltip"
import { ProvideMousePosition } from "../DataVis/MousePositionContext"
import { useIntersectionObserver } from "../DataVis/useIntersectionObserver"
import { Bar } from "./Bar"

const ChartContainer = styled(Flex)`
  border-bottom: 1px solid ${themeGet("colors.mono10")};
`

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
  label?: React.ReactNode | ChartTooltipProps
  axisLabelX?: React.ReactNode
  highlightLabel?: React.ReactNode | ChartTooltipProps
  onClick?: any
  onHover?: any
}

export interface BarChartProps {
  bars: BarDescriptor[]
  minLabel: React.ReactNode
  maxLabel: React.ReactNode
  primaryColor?: Color
  hoverColor?: Color
  highlightColor?: Color
}
/**
 * BarChart is a component which displays some bars of varying heights in a row.
 * Useful for histograms etc.
 * @param props props
 */
export const BarChart = ({ bars, minLabel, maxLabel, primaryColor, hoverColor, highlightColor }: BarChartProps) => {
  const highlightLabelRef = useRef<HTMLDivElement>(null)
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false)

  const { ref: wrapperRef } = useIntersectionObserver({
    once: true,
    options: { threshold: 0.2 },
    onIntersection: () => {
      setHasEnteredViewport(true)
    },
  })

  useHighlightLabelPositionConstraints(
    wrapperRef.current as HTMLDivElement,
    highlightLabelRef.current
  )

  const [minHeight, setMinHeight] = useState(0)
  const maxValue = Math.max(...bars.map(({ value }) => value))
  const allZero = bars.every((item) => item.value === 0)
  return (
    <ProvideMousePosition>
      <Flex
        flexDirection="column"
        ref={wrapperRef as any}
        flexGrow={1}
        id="flex-wrapper"
      >
        <ChartContainer
          height="80px"
          alignItems="flex-end"
          mb={0.5}
          style={{ minHeight }}
        >
          {bars.map(
            (
              { value, label, axisLabelX, highlightLabel, onClick, onHover },
              index
            ) => {
              const heightPercent =
                maxValue === 0 ? 100 : (100 / maxValue) * value
              return (
                <Bar
                  key={index}
                  heightPercent={allZero ? 0 : heightPercent}
                  label={coerceTooltip(label)}
                  axisLabelX={axisLabelX}
                  highlightLabelRef={highlightLabelRef}
                  highlightLabel={coerceTooltip(highlightLabel)}
                  hasEnteredViewport={hasEnteredViewport}
                  onMeasureHeight={highlightLabel ? setMinHeight : null}
                  onClick={onClick}
                  onHover={onHover}
                  primaryColor={primaryColor}
                  hoverColor={hoverColor}
                  highlightColor={highlightColor}
                />
              )
            }
          )}
        </ChartContainer>

        <Flex justifyContent="space-between">
          <Text color="mono60" variant="xs">
            {minLabel}
          </Text>

          <Text color="mono60" variant="xs">
            {maxLabel}
          </Text>
        </Flex>

        {bars.filter((bar) => bar.axisLabelX).length > 0 && (
          <Flex>
            {bars.map(({ axisLabelX }, i) => (
              <BarAxisLabelContainer key={i}>
                <AxisLabelX color="mono60" variant="xs">
                  {axisLabelX}
                </AxisLabelX>
              </BarAxisLabelContainer>
            ))}
          </Flex>
        )}
      </Flex>
    </ProvideMousePosition>
  )
}

const BarAxisLabelContainer = styled.div`
  flex: 1;
  min-height: ${themeGet("space.2")};
  position: relative;
`

const AxisLabelX = styled(Text)`
  position: absolute;
  text-align: center;
  white-space: nowrap;
  left: 50%;
  transform: translateX(-50%);
`
