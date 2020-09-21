import { storiesOf } from "@storybook/react"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Box } from "../Box"
import { Clickable } from "../Clickable"
import { ProgressDots } from "../ProgressDots"
import { Text } from "../Text"
import { Swiper, SwiperCell, SwiperProps, SwiperRail } from "./"

const Demo = ({
  widths,
  heights = [400],
  ...rest
}: {
  widths: Array<number | string>
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
      <Demo widths={widths} onChange={setIndex} snap="start" />
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

storiesOf("Components/Swiper", module)
  .add("Simple", () => {
    const widths = [...new Array(25)].map(_ => 300)
    return <Demo widths={widths} />
  })
  .add("With horizontal margins", () => {
    const widths = [...new Array(25)].map(_ => 300)
    return (
      <>
        <Text>Should be flush with horizontal edges</Text>
        <Demo widths={widths} mx={[-2, -4]} />
      </>
    )
  })
  .add("Simple with left-edge snapping", () => {
    const widths = [...new Array(25)].map(_ => 300)
    return <Demo widths={widths} snap="start" />
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
