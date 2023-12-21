import { action } from "@storybook/addon-actions"
import React from "react"
import { States } from "storybook-states"
import { Position, POSITION } from "../../utils"
import { Box } from "../Box"
import { Button } from "../Button"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Text } from "../Text"
import { Popover, PopoverProps } from "./Popover"
import { Pill } from "../Pill"

const CONTENT =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi eius autem aliquid cumque, mollitia incidunt totam. Id ut quae hic in quisquam, cupiditate iure nobis, provident minus voluptatem tenetur consequatur."

export default {
  title: "Components/Popover",
}

export const Default = () => {
  return (
    <States<Partial<PopoverProps>>
      states={[
        {},
        { visible: true },
        { onClose: action("onClose"), onDismiss: action("onDismiss") },
        {
          visible: true,
          popover: (
            <Text variant="xs" width={300}>
              | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
              | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
              | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
              | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
              | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
              | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
              | | | — (Content interaction with close button.)
            </Text>
          ),
        },
        {
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
        },
        {
          variant: "defaultDark",
          placement: "bottom",
          visible: true,
          pointer: true,
          zIndex: 99,
        },
        {
          ignoreClickOutside: true,
        },
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
        {({ onVisible, anchorRef }) => {
          return (
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
          )
        }}
      </Popover>
    </States>
  )
}

Default.story = {
  parameters: { chromatic: { disable: true } },
}

export const Placement = () => {
  return (
    <States<Partial<PopoverProps>>
      states={Object.keys(POSITION).map((placement) => ({
        placement: placement as Position,
      }))}
    >
      {(props) => {
        return (
          <Popover
            popover={<Text variant="xs">{JSON.stringify(props)}</Text>}
            visible
            variant="defaultDark"
            pointer
            {...props}
          >
            {({ anchorRef }) => {
              return (
                <Text
                  ref={anchorRef as any}
                  variant="xs"
                  textAlign="center"
                  p={1}
                  maxWidth="50%"
                  mx="auto"
                  bg="black10"
                >
                  {JSON.stringify(props)}
                </Text>
              )
            }}
          </Popover>
        )
      }}
    </States>
  )
}

Placement.story = {
  parameters: { chromatic: { disable: true } },
}

const ExamplePopover: React.FC = ({ children }) => {
  return (
    <Popover
      popover={
        <>
          <Text variant="xs" fontWeight="bold">
            New filters
          </Text>
          <Text variant="xs">
            Choose artist and alert criteria to accurately narrow your results.
          </Text>
        </>
      }
      width={250}
      variant="defaultDark"
      pointer
      visible
      ignoreClickOutside
      manageFocus={false}
    >
      {({ anchorRef }) => {
        return (
          <Box ref={anchorRef as any} m="auto">
            {children}
          </Box>
        )
      }}
    </Popover>
  )
}

export const InternalScrollContainer = () => {
  return (
    <Box overflow="auto" height="100%">
      <Box height="300vh" border="1px dotted" borderColor="black60" p={2}>
        <Spacer y={12} />

        <Box textAlign="center">
          <ExamplePopover>
            <Pill>Popover should remain anchored to this element</Pill>
          </ExamplePopover>
        </Box>
      </Box>
    </Box>
  )
}

InternalScrollContainer.story = {
  parameters: { chromatic: { disable: true } },
}

export const ManageFocus = () => {
  return (
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
        {({ onVisible, anchorRef }) => {
          return (
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
          )
        }}
      </Popover>
    </States>
  )
}

export const PopoverActions = () => {
  return (
    <States<Partial<PopoverProps>> states={[{ visible: true }]}>
      <Popover
        placement="bottom"
        popover={({ onHide, onDismiss }) => {
          return (
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
          )
        }}
      >
        {({ onVisible, anchorRef }) => {
          return (
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
          )
        }}
      </Popover>
    </States>
  )
}
