import { fn } from "@storybook/test"
import React, { useEffect, useState } from "react"
import { Box } from "../Box"
import { Clickable } from "../Clickable"
import { Text } from "../Text"
import {
  Carousel,
  CarouselCell,
  CarouselNext,
  CarouselPrevious,
  CarouselProps,
  CarouselRail,
} from "./"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

const LOREM =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, adipisci. Voluptate voluptatum porro facere atque dolores est neque ipsam quaerat necessitatibus? Deleniti tempora assumenda accusantium, quia quo ad rem expedita!"

const Demo = ({
  widths = Array.from(Array(10)).map((_) => 300),
  heights = [400],
  ...rest
}: {
  widths?: Array<number | string>
  heights?: number[]
} & Omit<CarouselProps, "children">) => {
  return (
    <Box mx={[2, 4]} my={2}>
      <Carousel onChange={fn()} {...rest}>
        {widths.map((width, i) => {
          return (
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
          )
        })}
      </Carousel>
    </Box>
  )
}

export default {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A carousel component for displaying a horizontally scrollable collection of items with navigation controls. Supports variable widths, heights, and custom styling.",
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

export const Multiple = {
  render: () => (
    <>
      <Demo />
      <Demo />
      <Demo />
    </>
  ),
}

export const SinglePage = {
  render: () => {
    const widths = [250, 250]
    return <Demo widths={widths} />
  },
}

export const SingleOverflowingItem = {
  render: () => {
    const widths = [2000]
    return <Demo widths={widths} />
  },
  parameters: {
    docs: {
      description: {
        story:
          "Carousel with a single item that overflows the container width.",
      },
    },
  },
}

export const MultipleOverflowingItems = {
  render: () => {
    const widths = [100, 2000, 1000, 100, 1000]
    return <Demo widths={widths} />
  },
  parameters: {
    docs: {
      description: {
        story:
          "Carousel with multiple items of varying widths, some overflowing.",
      },
    },
  },
}

export const TwoishPages = {
  render: () => {
    const widths = Array.from(Array(5)).map((_) => 250)
    return <Demo widths={widths} />
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel spanning approximately two pages with 5 items.",
      },
    },
  },
}

export const ManyPages = {
  render: () => {
    const widths = Array.from(Array(100)).map((_) => 250)
    return <Demo widths={widths} />
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel with many items spanning multiple pages (100 items).",
      },
    },
  },
}

export const VaryingWidths = {
  render: () => {
    const widths = Array.from(Array(25)).map((_, i) => {
      if (i % 15 === 0) return 400
      if (i % 5 === 0) return 300
      if (i % 3 === 0) return 333
      if (i % 2 === 0) return 275
      return 250
    })

    return <Demo widths={widths} />
  },
  parameters: {
    docs: {
      description: {
        story:
          "Carousel with items of varying widths to demonstrate layout flexibility.",
      },
    },
  },
}

export const VaryingHeights = {
  render: () => {
    const widths = Array.from(Array(25)).map((_, i) => {
      if (i % 15 === 0) return 400
      if (i % 5 === 0) return 300
      if (i % 3 === 0) return 333
      if (i % 2 === 0) return 275
      return 250
    })

    return <Demo widths={widths} heights={[400, 300, 333, 275]} />
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel with items of varying widths and heights.",
      },
    },
  },
}

export const DynamicItems = {
  render: () => {
    const [widths, setWidths] = useState([300])
    useEffect(() => {
      const interval = setInterval(() => {
        setWidths((prevWidths) => [...prevWidths, 300])
      }, 500)
      return () => clearInterval(interval)
    }, [])

    return <Demo widths={widths} />
  },
  parameters: {
    chromatic: { disable: true },
    docs: {
      description: {
        story:
          "Carousel that dynamically adds items every 500ms to test layout updates.",
      },
    },
  },
}

export const CustomArrows = {
  render: () => {
    return (
      <Demo
        Previous={(props) => (
          <CarouselPrevious
            {...props}
            style={{ transform: "translateX(0)" }}
            bg="mono5"
            color="red100"
            height={300}
            opacity={0.75}
            zIndex={1}
          />
        )}
        Next={(props) => {
          return (
            <CarouselNext
              {...props}
              style={{ transform: "translateX(0)" }}
              bg="mono5"
              color="red100"
              height={300}
              opacity={0.75}
              zIndex={1}
            />
          )
        }}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel with custom styled navigation arrows.",
      },
    },
  },
}

export const CustomRailAndCells = {
  render: () => {
    return (
      <Demo
        widths={["100%", "100%", "100%", "100%"]}
        // eslint-disable-next-line react/display-name
        Cell={React.forwardRef((props, ref) => {
          return (
            <CarouselCell
              {...props}
              ref={ref as any}
              display="inline-flex"
              width="100%"
              pr={0}
            />
          )
        })}
        Rail={(props) => {
          return <CarouselRail {...props} transition="none" display="block" />
        }}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Carousel with custom rail and cell components for advanced layouts.",
      },
    },
  },
}

export const CarouselWithText = {
  render: () => {
    return (
      <Box mx={[2, 4]} my={2}>
        <Carousel>
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
          <Text bg="mono10" p={1} width={300}>
            {LOREM}
          </Text>
        </Carousel>
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Carousel containing text content blocks instead of other components.",
      },
    },
  },
}

export const InitialIndexOnMount = {
  render: () => {
    return <Demo initialIndex={3} />
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel that starts at a specific index (3) on mount.",
      },
    },
  },
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
          <Clickable onClick={() => resetIndex(4)}>
            Navigate to page 5
          </Clickable>
        </Box>
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Carousel with external navigation controls to jump to specific pages.",
      },
    },
  },
}

export const ConditionalChildren = {
  render: () => {
    return (
      <Box mx={[2, 4]} my={2}>
        <Carousel>
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
        </Carousel>
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Carousel with conditionally rendered children to test dynamic content.",
      },
    },
  },
}

export const PaginationByCell = {
  render: () => {
    return <Demo paginateBy="cell" />
  },
  parameters: {
    docs: {
      description: {
        story: "Carousel with cell-based pagination instead of page-based.",
      },
    },
  },
}

export const PaginationByCellWithVaryingWidths = {
  render: () => {
    const widths = Array.from(Array(25)).map((_, i) => {
      if (i % 15 === 0) return 400
      if (i % 5 === 0) return 300
      if (i % 3 === 0) return 333
      if (i % 2 === 0) return 275
      return 250
    })

    return <Demo paginateBy="cell" widths={widths} />
  },
  parameters: {
    docs: {
      description: {
        story: "Cell-based pagination with items of varying widths.",
      },
    },
  },
}
