import React from "react"
import { States } from "storybook-states"
import { Box } from "../Box"
import { Link } from "../Link"
import { Text } from "../Text"
import { Toggle, ToggleProps } from "./Toggle"

const SecondaryAction = () => {
  return (
    <Link
      onClick={(e) => {
        alert("hello world!")
        e.stopPropagation()
      }}
    >
      Alert
    </Link>
  )
}

export default {
  title: "Components/Toggle",
}

export const Default = () => {
  return (
    <States<ToggleProps>
      states={[
        {},
        { expanded: true },
        { expanded: true, disabled: false },
        { renderSecondaryAction: SecondaryAction },
        { renderSecondaryAction: SecondaryAction, disabled: true },
        {
          label: (
            <>
              <Text variant="mediumText">Heading</Text>
              <Text variant="text">Subheading</Text>
            </>
          ),
        },
      ]}
    >
      <Toggle label="Example">
        <Text>Expanded content</Text>
      </Toggle>
    </States>
  )
}
