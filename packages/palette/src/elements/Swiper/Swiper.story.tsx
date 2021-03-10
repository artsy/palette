import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Box } from "../Box"
import { Clickable } from "../Clickable"
import { ProgressDots } from "../ProgressDots"
import { Text } from "../Text"
import { Swiper, SwiperCell, SwiperProps, SwiperRail } from "./"

const LOREM =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis dicta sunt nihil perspiciatis aperiam asperiores, earum facere repellendus in veniam, mollitia, ducimus delectus perferendis beatae facilis molestiae et ad quaerat!"

const Demo = ({
  widths = [...new Array(25)].map((_) => 300),
  heights = [400],
  ...rest
}: {
  widths?: Array<number | string>
  heights?: number[]
} & Omit<SwiperProps, "children">) => {
  return (
    <Box mx={[2, 4]} my={2}>
      <Swiper {...rest}>
        {widths.map((width, i) => (
          <Clickable
            key={i}
            width={width}
            height={heights[i % heights.length]}
            bg="black10"
            border="1px solid"
            borderColor="black30"
            p={1}
            textAlign="center"
          >
            <Text variant="caption">{i + 1}</Text>
          </Clickable>
        ))}
      </Swiper>
    </Box>
  )
}

const Bar = styled(Box)`
  transition: transform 200ms;
`

const ProgressBar = ({ progress = 0 }: { progress: number }) => {
  return (
    <Box
      bg="black10"
      position="relative"
      width="50%"
      height={2}
      mx="auto"
      overflow="hidden"
    >
      <Bar
        bg="black100"
        width="100%"
        height="100%"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Box>
  )
}

export default { title: "Components/Swiper" }

export const Simple = () => {
  return <Demo />
}

export const WithHorizontalMargins = () => {
  return (
    <>
      <Text>Should be flush with horizontal edges</Text>
      <Demo mx={[-2, -4]} />
    </>
  )
}

WithHorizontalMargins.story = {
  name: "With horizontal margins",
}

export const SimpleWithLeftEdgeSnapping = () => {
  return <Demo snap="start" />
}

SimpleWithLeftEdgeSnapping.story = {
  name: "Simple with left-edge snapping",
}

export const ProgressBarExample = () => {
  const widths = [...new Array(10)].map((_) => 300)
  const [index, setIndex] = useState(0)
  const progress = (index * 100) / (widths.length - 1)

  return (
    <>
      <Demo widths={widths} onChange={setIndex} />
      <ProgressBar progress={progress} />
    </>
  )
}

ProgressBarExample.story = {
  name: "Progress bar example",
}

export const ProgressDotsExample = () => {
  const widths = [...new Array(10)].map((_) => 300)
  const [index, setIndex] = useState(0)

  return (
    <>
      <Demo widths={widths} onChange={setIndex} />
      <ProgressDots amount={widths.length} activeIndex={index} />
    </>
  )
}

ProgressDotsExample.story = {
  name: "Progress dots example",
}

export const CustomRailAndCells = () => {
  return (
    <Demo
      snap="start"
      widths={["100%", "100%", "100%", "100%"]}
      Cell={React.forwardRef((props, ref) => {
        return (
          <SwiperCell
            {...props}
            ref={ref as any}
            display="inline-flex"
            width="100%"
            pr={0}
          />
        )
      })}
      Rail={(props) => {
        return <SwiperRail {...props} display="block" />
      }}
    />
  )
}

CustomRailAndCells.story = {
  name: "Custom rail and cells",
}

export const DynamicItems = () => {
  const [index, setIndex] = useState(0)
  const [widths, setWidths] = useState([300])
  useEffect(() => {
    const interval = setInterval(() => {
      setWidths((prevWidths) => [...prevWidths, 300])
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Demo widths={widths} onChange={setIndex} />
      <ProgressDots amount={widths.length} activeIndex={index} />
    </>
  )
}

DynamicItems.story = {
  name: "Dynamic items",
  parameters: { chromatic: { disable: true } },
}

export const SwiperWithText = () => {
  return (
    <Box mx={[2, 4]} my={2}>
      <Swiper>
        <Text bg="black10" p={1} width={300}>
          {LOREM}
        </Text>

        <Text bg="black10" p={1} width={300}>
          {LOREM}
        </Text>

        <Text bg="black10" p={1} width={300}>
          {LOREM}
        </Text>

        <Text bg="black10" p={1} width={300}>
          {LOREM}
        </Text>

        <Text bg="black10" p={1} width={300}>
          {LOREM}
        </Text>
      </Swiper>
    </Box>
  )
}

SwiperWithText.story = {
  name: "Swiper with text",
}

export const InitialIndexOnMount = () => {
  return <Demo initialIndex={3} />
}

InitialIndexOnMount.story = {
  name: "initialIndex on mount",
}

export const NavigateViaProps = () => {
  const [initialIndex, resetIndex] = useState(0)
  return (
    <Box>
      <Demo initialIndex={initialIndex} onChange={resetIndex} />
      <Box display="flex" justifyContent="space-around">
        <Clickable onClick={() => resetIndex(0)}>Navigate to page 1</Clickable>
        <Clickable onClick={() => resetIndex(1)}>Navigate to page 2</Clickable>
        <Clickable onClick={() => resetIndex(2)}>Navigate to page 3</Clickable>
        <Clickable onClick={() => resetIndex(3)}>Navigate to page 4</Clickable>
      </Box>
    </Box>
  )
}

NavigateViaProps.story = {
  name: "Navigate via props",
}

export const OverwritingDefaultMargins = () => {
  return <Demo mt={6} ml={6} />
}

OverwritingDefaultMargins.story = {
  name: "Overwriting default margins",
}
