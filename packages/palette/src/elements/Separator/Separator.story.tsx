import React from "react"
import { Box } from "../Box"
import { Text } from "../Text"
import { Theme } from "../../Theme"
import { Separator } from "./Separator"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: Separator,
  title: "Components/Separator",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A horizontal line separator component with customizable colors and styling.",
      },
    },
    controls: {
      exclude: STORYBOOK_PROPS_BLOCKLIST,
    },
  },
}

export const Default = {
  args: {
    as: "hr",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic horizontal line separator.",
      },
    },
  },
}

export const WithColor = {
  args: {
    as: "hr",
    color: "mono30",
  },
  parameters: {
    docs: {
      description: {
        story: "Separator with custom color.",
      },
    },
  },
}

export const WithBorderColor = {
  args: {
    as: "hr",
    borderColor: "red100",
  },
  parameters: {
    docs: {
      description: {
        story: "Separator with custom border color.",
      },
    },
  },
}

export const WithSpacing = {
  args: {
    as: "hr",
    borderWidth: 5,
    my: 2,
  },
  parameters: {
    docs: {
      description: {
        story: "Separator with custom width and vertical spacing.",
      },
    },
  },
}

export const ResponsiveArray = {
  args: {
    as: "hr",
    my: [1, 2, 4],
    width: ["50%", "75%", "100%"],
  },
  render: (args) => {
    return (
      <Box>
        <Text variant="sm">Above</Text>
        <Separator {...args} />
        <Text variant="sm">Below</Text>
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Responsive array syntax for vertical margin and width. Values change at the sm and md breakpoints.",
      },
    },
  },
}

export const ObjectSyntax = {
  args: {
    as: "hr",
    my: { _: 1, sm: 2, md: 4 },
    width: { _: "50%", sm: "75%", md: "100%" },
  },
  render: (args) => {
    return (
      <Box>
        <Text variant="sm">Above</Text>
        <Separator {...args} />
        <Text variant="sm">Below</Text>
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Responsive object syntax for vertical margin and width, keyed by breakpoint name.",
      },
    },
  },
}

export const ArbitraryValues = {
  render: () => {
    return (
      <Box>
        <Box height={60} bg="mono30">
          <Text variant="sm">
            Separator below has a vertical margin of 31px
          </Text>
        </Box>
        <Separator my="31px" />
        <Box height={60} bg="mono30">
          <Text variant="sm">Separator below has a vertical margin of -1</Text>
        </Box>
        <Separator my={-1} />
        <Box height={60} bg="mono30">
          <Text variant="sm">Separator below has a vertical margin of 0</Text>
        </Box>
        <Separator my={0} />
        <Box height={60} bg="mono30" />
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Vertical margins outside the usual scale: a pixel string (31px), a negative scale value (-1, which overlaps the box above) and zero.",
      },
    },
  },
}

export const AsHr = {
  args: {
    as: "hr",
  },
  render: (args) => {
    return (
      <Box>
        <Text variant="sm">Above</Text>
        <Separator {...args} my={2} />
        <Text variant="sm">Below</Text>
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Rendered as an hr element. The browser's default hr height and margins must not show through.",
      },
    },
  },
}

export const CustomBorderColor = {
  args: {
    as: "hr",
    borderColor: "blue100",
  },
  render: (args) => {
    return (
      <Box>
        <Text variant="sm">Above</Text>
        <Separator {...args} my={2} />
        <Text variant="sm">Below</Text>
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "The borderColor prop overrides the default color.",
      },
    },
  },
}

export const DarkTheme = {
  args: {
    as: "hr",
  },
  render: (args) => {
    return (
      <Theme theme="dark">
        <Box bg="mono0" color="mono100" p={2}>
          <Text variant="sm">Above</Text>
          <Separator {...args} my={2} />
          <Text variant="sm">Below</Text>
        </Box>
      </Theme>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Separator inside the dark theme.",
      },
    },
  },
}
