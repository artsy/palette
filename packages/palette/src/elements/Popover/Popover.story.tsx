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
      states={[{}, { title: "Example Title", visible: true }]}
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
                variant="secondaryOutline"
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
  parameters: { chromatic: { delay: 500 } },
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
                  bg="black100"
                  color="white100"
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
