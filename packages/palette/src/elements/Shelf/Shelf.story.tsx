import React, { useEffect, useState } from "react"
import { States } from "storybook-states"
import { Box } from "../Box"
import { Text } from "../Text"
import { Shelf, ShelfProps } from "./Shelf"
import { ShelfNavigationProps, ShelfNext } from "./ShelfNavigation"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  component: Shelf,
  title: "Components/Shelf",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A horizontal scrollable shelf container for displaying collections of items.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
  },
}

const Demo = ({
  amount = 25,
  ...rest
}: Partial<ShelfProps> & { amount?: number }) => {
  return (
    <Shelf {...rest}>
      {Array.from(Array(amount))
        .map((_, i) => [300, 250, 200, 333, 400][i % 5])
        .map((height, j) => (
          <Box
            key={j}
            width={300}
            height={height}
            bg="mono10"
            border="1px solid"
            borderColor="mono30"
            p={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text variant="sm-display">{j + 1}</Text>
          </Box>
        ))}
    </Shelf>
  )
}

export const Default = {
  render: () => (
    <Box maxWidth={1920} mx="auto">
      <Box mx={[2, 4]}>
        <Demo />
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic shelf component with default settings.",
      },
    },
  },
}

export const CenterAligned = {
  render: () => (
    <Box maxWidth={1920} mx="auto">
      <Box mx={[2, 4]}>
        <Demo alignItems="center" />
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shelf with items center-aligned vertically.",
      },
    },
  },
}

export const NoProgress = {
  render: () => (
    <Box maxWidth={1920} mx="auto">
      <Box mx={[2, 4]}>
        <Demo showProgress={false} />
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shelf without progress indicators.",
      },
    },
  },
}

export const DifferingAmounts = {
  render: () => (
    <Box maxWidth={1920} mx="auto">
      <Box mx={[2, 4]}>
        <States<Partial<ShelfProps> & { amount: number }>
          states={[
            { amount: 1 },
            { amount: 3 },
            { amount: 20 },
            { amount: 10 },
          ]}
        >
          <Demo />
        </States>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Shelf with different amounts of items to demonstrate scrolling behavior.",
      },
    },
  },
}

export const NavigationButtons = {
  render: () => (
    <States<ShelfNavigationProps>
      states={[
        {},
        { hover: true },
        { focus: true },
        { disabled: true },
        { hover: true, focus: true },
      ]}
    >
      <ShelfNext />
    </States>
  ),
  parameters: {
    docs: {
      description: {
        story: "Navigation buttons for shelf with different states.",
      },
    },
  },
}

export const ClientSideUpdates = {
  render: () => {
    const [amount, setAmount] = useState(1)

    useEffect(() => {
      const interval = setInterval(() => {
        setAmount(Math.floor(Math.random() * Math.floor(15)) + 1)
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }, [])

    return (
      <>
        <pre>Amount: {amount}</pre>
        <Demo amount={amount} />
      </>
    )
  },
  parameters: {
    chromatic: { disable: true },
    docs: {
      description: {
        story:
          "Shelf with client-side updates to demonstrate dynamic content changes.",
      },
    },
  },
}
