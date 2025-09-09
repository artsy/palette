import React, { useEffect, useState } from "react"
import { Box } from "../Box"
import { Text } from "../Text"
import { Shelf } from "./Shelf"
import { ShelfNext } from "./ShelfNavigation"
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
      controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
    },
  },
}

const Demo = ({ amount = 25, ...rest }: { amount?: number } & any) => {
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

export const SingleItem = {
  render: () => (
    <Box maxWidth={1920} mx="auto">
      <Box mx={[2, 4]}>
        <Demo amount={1} />
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shelf with a single item.",
      },
    },
  },
}

export const FewItems = {
  render: () => (
    <Box maxWidth={1920} mx="auto">
      <Box mx={[2, 4]}>
        <Demo amount={3} />
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shelf with few items that don't require scrolling.",
      },
    },
  },
}

export const ManyItems = {
  render: () => (
    <Box maxWidth={1920} mx="auto">
      <Box mx={[2, 4]}>
        <Demo amount={20} />
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shelf with many items that require horizontal scrolling.",
      },
    },
  },
}

export const TenItems = {
  render: () => (
    <Box maxWidth={1920} mx="auto">
      <Box mx={[2, 4]}>
        <Demo amount={10} />
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shelf with ten items to demonstrate medium-sized collections.",
      },
    },
  },
}

export const NavigationDefault = {
  render: () => <ShelfNext />,
  parameters: {
    docs: {
      description: {
        story: "Default navigation button for shelf.",
      },
    },
  },
}

export const NavigationHover = {
  render: () => <ShelfNext hover={true} />,
  parameters: {
    docs: {
      description: {
        story: "Navigation button in hover state.",
      },
    },
  },
}

export const NavigationFocus = {
  render: () => <ShelfNext focus={true} />,
  parameters: {
    docs: {
      description: {
        story: "Navigation button in focus state.",
      },
    },
  },
}

export const NavigationDisabled = {
  render: () => <ShelfNext disabled={true} />,
  parameters: {
    docs: {
      description: {
        story: "Navigation button in disabled state.",
      },
    },
  },
}

export const NavigationHoverFocus = {
  render: () => <ShelfNext hover={true} focus={true} />,
  parameters: {
    docs: {
      description: {
        story: "Navigation button with both hover and focus states.",
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
