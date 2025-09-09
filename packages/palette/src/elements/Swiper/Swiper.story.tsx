import React, { useEffect, useState } from "react"
import { Box } from "../Box"
import { CarouselBar } from "../CarouselBar"
import { Clickable } from "../Clickable"
import { ProgressDots } from "../ProgressDots"
import { Text } from "../Text"
import { Swiper, SwiperCell, SwiperProps, SwiperRail } from "./"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

const LOREM =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis dicta sunt nihil perspiciatis aperiam asperiores, earum facere repellendus in veniam, mollitia, ducimus delectus perferendis beatae facilis molestiae et ad quaerat!"

const Demo = ({
  widths = Array.from(Array(25)).map((_) => 300),
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
            bg="mono10"
            border="1px solid"
            borderColor="mono30"
            p={1}
            textAlign="center"
          >
            <Text variant="xs">{i + 1}</Text>
          </Clickable>
        ))}
      </Swiper>
    </Box>
  )
}

export default {
  component: Swiper,
  title: "Components/Swiper",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A swiper/carousel component with horizontal scrolling, navigation, and progress indicators.",
      },
      controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
    },
  },
}

export const Simple = {
  render: () => <Demo />,
}

export const WithHorizontalMargins = {
  render: () => {
    return (
      <>
        <Text>Should be flush with horizontal edges</Text>
        <Demo mx={[-2, -4]} />
      </>
    )
  },
}

export const SimpleWithLeftEdgeSnapping = {
  render: () => <Demo snap="start" />,
}

export const ProgressBarExample = {
  render: () => {
    const widths = Array.from(Array(10)).map((_) => 300)
    const [index, setIndex] = useState(0)
    const progress = (index * 100) / (widths.length - 1)

    return (
      <>
        <Demo widths={widths} onChange={setIndex} />
        <CarouselBar percentComplete={progress} />
      </>
    )
  },
}

export const ProgressDotsExample = {
  render: () => {
    const widths = Array.from(Array(10)).map((_) => 300)
    const [index, setIndex] = useState(0)

    return (
      <>
        <Demo widths={widths} onChange={setIndex} />
        <ProgressDots
          variant="dash"
          amount={widths.length}
          activeIndex={index}
        />
      </>
    )
  },
}

export const CustomRailAndCells = {
  render: () => {
    return (
      <Demo
        snap="start"
        widths={["100%", "100%", "100%", "100%"]}
        // eslint-disable-next-line react/display-name
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
  },
}

export const DynamicItems = {
  render: () => {
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
  },
  parameters: { chromatic: { disable: true } },
}

export const SwiperWithText = {
  render: () => {
    return (
      <Box mx={[2, 4]} my={2}>
        <Swiper>
          <Text bg="mono10" p={1} width={300}>
            {LOREM}
          </Text>

          <Text bg="mono10" p={1} width={300}>
            {LOREM}
          </Text>

          <Text bg="mono10" p={1} width={300}>
            {LOREM}
          </Text>

          <Text bg="mono10" p={1} width={300}>
            {LOREM}
          </Text>

          <Text bg="mono10" p={1} width={300}>
            {LOREM}
          </Text>
        </Swiper>
      </Box>
    )
  },
}

export const InitialIndexOnMount = {
  render: () => <Demo initialIndex={3} />,
}

export const NavigateViaProps = {
  render: () => {
    const [initialIndex, resetIndex] = useState(0)
    return (
      <Box>
        <Demo initialIndex={initialIndex} onChange={resetIndex} />
        <Box display="flex" justifyContent="space-around">
          <Clickable onClick={() => resetIndex(0)}>
            Navigate to page 1
          </Clickable>
          <Clickable onClick={() => resetIndex(1)}>
            Navigate to page 2
          </Clickable>
          <Clickable onClick={() => resetIndex(2)}>
            Navigate to page 3
          </Clickable>
          <Clickable onClick={() => resetIndex(3)}>
            Navigate to page 4
          </Clickable>
        </Box>
      </Box>
    )
  },
}

export const OverwritingDefaultMargins = {
  render: () => <Demo mt={6} ml={6} />,
}

export const ConditionalChildren = {
  render: () => {
    return (
      <Box mx={[2, 4]} my={2}>
        <Swiper>
          <Box bg="mono10" width={300} height={300} p={2}>
            <Text variant="xs">1</Text>
          </Box>

          <Box bg="mono10" width={300} height={300} p={2}>
            <Text variant="xs">2</Text>
          </Box>

          {false && (
            <Box bg="mono10" width={300} height={300} p={2}>
              <Text variant="xs">3</Text>
            </Box>
          )}

          {true && (
            <Box bg="mono10" width={300} height={300} p={2}>
              <Text variant="xs">4</Text>
            </Box>
          )}

          <Box bg="mono10" width={300} height={300} p={2}>
            <Text variant="xs">5</Text>
          </Box>

          <Box bg="mono10" width={300} height={300} p={2}>
            <Text variant="xs">6</Text>
          </Box>
        </Swiper>
      </Box>
    )
  },
}
