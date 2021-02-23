import React from "react"
import { States } from "storybook-states"
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
        { expanded: false, disabled: true },
        { expanded: true, disabled: true },
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
      <Toggle label="Example" maxWidth={350}>
        <Text>Expanded content</Text>
      </Toggle>
    </States>
  )
}
