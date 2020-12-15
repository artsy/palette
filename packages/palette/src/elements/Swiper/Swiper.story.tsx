import { storiesOf } from "@storybook/react"
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
  widths = [...new Array(25)].map(_ => 300),
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

const ProgressBarDemo = () => {
  const widths = [...new Array(10)].map(_ => 300)
  const [index, setIndex] = useState(0)
  const progress = (index * 100) / (widths.length - 1)

  return (
    <>
      <Demo widths={widths} onChange={setIndex} />
      <ProgressBar progress={progress} />
    </>
  )
}

const ProgressDotsDemo = () => {
  const widths = [...new Array(10)].map(_ => 300)
  const [index, setIndex] = useState(0)

  return (
    <>
      <Demo widths={widths} onChange={setIndex} />
      <ProgressDots amount={widths.length} activeIndex={index} />
    </>
  )
}

const Dynamic = () => {
  const [index, setIndex] = useState(0)
  const [widths, setWidths] = useState([300])
  useEffect(() => {
    const interval = setInterval(() => {
      setWidths(prevWidths => [...prevWidths, 300])
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

const Navigation = () => {
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

storiesOf("Components/Swiper", module)
  .add("Simple", () => {
    return <Demo />
  })
  .add("With horizontal margins", () => {
    return (
      <>
        <Text>Should be flush with horizontal edges</Text>
        <Demo mx={[-2, -4]} />
      </>
    )
  })
  .add("Simple with left-edge snapping", () => {
    return <Demo snap="start" />
  })
  .add("Progress bar example", () => {
    return <ProgressBarDemo />
  })
  .add("Progress dots example", () => {
    return <ProgressDotsDemo />
  })
  .add("Custom rail and cells", () => {
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
        Rail={props => {
          return <SwiperRail {...props} display="block" />
        }}
      />
    )
  })
  .add("Dynamic items", () => {
    return <Dynamic />
  })
  .add("Swiper with text", () => {
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
  })
  .add("initialIndex on mount", () => {
    return <Demo initialIndex={3} />
  })
  .add("Navigate via props", () => {
    return <Navigation />
  })
  .add("Overwriting default margins", () => {
    return <Demo mt={6} ml={6} />
  })
