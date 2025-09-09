import React from "react"
import { States } from "storybook-states"
import { Position, POSITION } from "../../utils"
import { Box } from "../Box"
import { Button } from "../Button"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Text } from "../Text"
import { Popover, PopoverProps } from "./Popover"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

const CONTENT =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi eius autem aliquid cumque, mollitia incidunt totam. Id ut quae hic in quisquam, cupiditate iure nobis, provident minus voluptatem tenetur consequatur."

export default {
  component: Popover,
  title: "Components/Popover",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A floating popover component that can be positioned relative to an anchor element.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
  },
}

export const Default = {
  args: {
    placement: "bottom",
    popover: (
      <Text variant="xs" width={300}>
        {CONTENT}
      </Text>
    ),
    children: ({ onVisible, anchorRef }) => (
      <Box textAlign="center">
        <Button
          ref={anchorRef}
          variant="secondaryBlack"
          size="small"
          onClick={onVisible}
        >
          Click to display popover
        </Button>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Default popover.",
      },
    },
  },
}

export const Visible = {
  args: {
    placement: "bottom",
    visible: true,
    popover: (
      <Text variant="xs" width={300}>
        {CONTENT}
      </Text>
    ),
    children: ({ anchorRef }) => (
      <Box textAlign="center">
        <Button ref={anchorRef} variant="secondaryBlack" size="small">
          Popover Visible
        </Button>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Popover visible state.",
      },
    },
  },
}

export const WithContentInteraction = {
  args: {
    placement: "bottom",
    visible: true,
    popover: (
      <Text variant="xs" width={300}>
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
        | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
        | | | | | | | | | | | | | | | | | | | | | — (Content interaction with
        close button.)
      </Text>
    ),
    children: ({ anchorRef }) => (
      <Box textAlign="center">
        <Button ref={anchorRef} variant="secondaryBlack" size="small">
          Popover With Content Interaction
        </Button>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Popover with content interaction.",
      },
    },
  },
}

export const Pointer = {
  args: {
    placement: "bottom",
    pointer: true,
    visible: true,
    p: 0,
    popover: (
      <>
        {new Array(4).fill(0).map((_, i) => (
          <Text
            key={i}
            variant="sm-display"
            overflowEllipsis
            bg="red10"
            px={1}
            py={0.5}
          >
            Example Item
          </Text>
        ))}
      </>
    ),
    children: ({ anchorRef }) => (
      <Box textAlign="center">
        <Button ref={anchorRef} variant="secondaryBlack" size="small">
          Popover With Pointer
        </Button>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Popover with pointer and multiple items.",
      },
    },
  },
}

export const DarkVariant = {
  args: {
    placement: "bottom",
    variant: "defaultDark",
    visible: true,
    pointer: true,
    zIndex: 99,
    popover: (
      <Text variant="xs" width={300}>
        {CONTENT}
      </Text>
    ),
    children: ({ anchorRef }) => (
      <Box textAlign="center">
        <Button ref={anchorRef} variant="secondaryBlack" size="small">
          Popover Dark Variant
        </Button>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Popover with dark variant styling.",
      },
    },
  },
}

export const IgnoreClickOutside = {
  args: {
    placement: "bottom",
    ignoreClickOutside: true,
    popover: (
      <Text variant="xs" width={300}>
        {CONTENT}
      </Text>
    ),
    children: ({ anchorRef }) => (
      <Box textAlign="center">
        <Button ref={anchorRef} variant="secondaryBlack" size="small">
          Popover Ignore Click Outside
        </Button>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Popover with ignoreClickOutside enabled.",
      },
    },
  },
}

export const Placement = {
  render: () => (
    <States<Partial<PopoverProps>>
      states={Object.keys(POSITION).map((placement) => ({
        placement: placement as Position,
      }))}
    >
      {(props) => (
        <Popover
          popover={<Text variant="xs">{JSON.stringify(props)}</Text>}
          visible
          variant="defaultDark"
          pointer
          {...props}
        >
          {({ anchorRef }) => (
            <Text
              ref={anchorRef as any}
              variant="xs"
              textAlign="center"
              p={1}
              maxWidth="50%"
              mx="auto"
              bg="mono10"
            >
              {JSON.stringify(props)}
            </Text>
          )}
        </Popover>
      )}
    </States>
  ),
  parameters: {
    chromatic: { disable: true },
    docs: {
      description: {
        story: "Popover shown in all available placement positions.",
      },
    },
  },
}

export const ManageFocus = {
  render: () => (
    <States<Partial<PopoverProps>>
      states={[
        { visible: true, manageFocus: false },
        { visible: true, manageFocus: true },
      ]}
    >
      <Popover
        placement="bottom"
        popover={
          <Text variant="xs" width={300}>
            {CONTENT}
          </Text>
        }
      >
        {({ onVisible, anchorRef }) => (
          <Box textAlign="center">
            <Button
              ref={anchorRef}
              variant="secondaryBlack"
              size="small"
              onClick={onVisible}
            >
              Click to display popover
            </Button>
          </Box>
        )}
      </Popover>
    </States>
  ),
  parameters: {
    docs: {
      description: {
        story: "Popover with different focus management settings.",
      },
    },
  },
}

export const PopoverActions = {
  render: () => (
    <States<Partial<PopoverProps>> states={[{ visible: true }]}>
      <Popover
        placement="bottom"
        popover={({ onHide, onDismiss }) => (
          <>
            <Text variant="xs" width={300}>
              {CONTENT}
            </Text>

            <Spacer y={2} />

            <Flex>
              <Button
                flex={1}
                size="small"
                variant="secondaryBlack"
                onClick={onHide}
              >
                Hide
              </Button>

              <Spacer x={1} />

              <Button
                flex={1}
                size="small"
                variant="secondaryBlack"
                onClick={onDismiss}
              >
                Dismiss
              </Button>
            </Flex>
          </>
        )}
      >
        {({ onVisible, anchorRef }) => (
          <Box textAlign="center">
            <Button
              ref={anchorRef}
              variant="secondaryBlack"
              size="small"
              onClick={onVisible}
            >
              Click to display popover
            </Button>
          </Box>
        )}
      </Popover>
    </States>
  ),
  parameters: {
    docs: {
      description: {
        story: "Popover with action buttons (Hide and Dismiss).",
      },
    },
  },
}

export const CrashAtSpecificZoomLevels = {
  render: () => (
    <>
      <Box height={100}>Zoom to 90% in Chrome, click, then scroll.</Box>

      <Box height={2000} bg="mono5">
        <Box height={200} />

        <Popover
          placement="top"
          popover={({ onHide, onDismiss }) => (
            <>
              <Text variant="xs" width={300}>
                {CONTENT}
              </Text>

              <Spacer y={2} />

              <Flex>
                <Button
                  flex={1}
                  size="small"
                  variant="secondaryBlack"
                  onClick={onHide}
                >
                  Hide
                </Button>

                <Spacer x={1} />

                <Button
                  flex={1}
                  size="small"
                  variant="secondaryBlack"
                  onClick={onDismiss}
                >
                  Dismiss
                </Button>
              </Flex>
            </>
          )}
        >
          {({ onVisible, anchorRef }) => (
            <Box textAlign="center">
              <Button
                ref={anchorRef}
                variant="secondaryBlack"
                size="small"
                onClick={onVisible}
              >
                Click to display popover
              </Button>
            </Box>
          )}
        </Popover>
      </Box>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: "Test case for popover behavior at specific zoom levels.",
      },
    },
  },
}
