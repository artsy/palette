import React from "react"
import { States } from "storybook-states"
import { HelpIcon } from "../../svgs"
import { Position, POSITION } from "../../utils/usePosition"
import { Box } from "../Box"
import { Text } from "../Text"
import { Tooltip, TooltipProps } from "./Tooltip"

const CONTENT =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis odio laudantium sint possimus debitis commodi iusto odit, sunt facilis consequuntur, hic rem doloremque illum provident temporibus atque. Ducimus, commodi necessitatibus?"

export default {
  title: "Components/Tooltip",
}

export const Default = () => {
  return (
    <States<Partial<TooltipProps>>
      states={[
        { placement: "top-start" },
        { placement: "bottom", width: 600 },
        { placement: "bottom", visible: true },
      ]}
    >
      <Tooltip content={CONTENT}>
        <Text
          variant="xs"
          textAlign="center"
          p={1}
          bg="black100"
          color="white100"
        >
          This text has a tooltip
        </Text>
      </Tooltip>
    </States>
  )
}

export const Placement = () => {
  return (
    <States<Partial<TooltipProps>>
      states={Object.keys(POSITION).map((placement) => ({
        placement: placement as Position,
      }))}
    >
      {(props) => {
        return (
          <Tooltip content={JSON.stringify(props)} visible {...props}>
            <Text
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
          </Tooltip>
        )
      }}
    </States>
  )
}

export const IconExample = () => {
  return (
    <Text variant="xs" display="flex" alignItems="center" lineHeight={1}>
      Hover (or focus) the icon to display the tooltip.{" "}
      <Tooltip content={CONTENT} placement="bottom">
        {/* Icons don't forwardRefs so we have to wrap in a span */}
        <Box as="span" style={{ lineHeight: 0 }}>
          <HelpIcon ml={0.5} />
        </Box>
      </Tooltip>
    </Text>
  )
}
