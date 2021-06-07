import React from "react"
import { States } from "storybook-states"
import { HelpIcon } from "../../svgs"
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
        { placement: "top" },
        { placement: "bottom" },
        { placement: "top", width: 600 },
        { placement: "bottom", visible: true },
      ]}
    >
      <Tooltip content={CONTENT} display="block">
        <Text variant="xs" textAlign="center">
          This text has a tooltip
        </Text>
      </Tooltip>
    </States>
  )
}

export const IconExample = () => {
  return (
    <Text variant="xs" display="flex" alignItems="center" lineHeight={1}>
      Hover (or focus) the icon to display the tooltip.{" "}
      <Tooltip
        content={CONTENT}
        placement="bottom"
        ml={0.5}
        // In our case, if we want true vertical centering we need
        // to zero-out the `lineHeight`
        style={{ lineHeight: 0 }}
      >
        <HelpIcon />
      </Tooltip>
    </Text>
  )
}
