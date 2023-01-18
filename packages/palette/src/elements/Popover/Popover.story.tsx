import { action } from "@storybook/addon-actions"
import React from "react"
import { States } from "storybook-states"
import { Position, POSITION } from "../../utils"
import { Box } from "../Box"
import { Button } from "../Button"
import { Text } from "../Text"
import { Popover, PopoverProps } from "./Popover"

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
        { onClose: action("onClose") },
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
