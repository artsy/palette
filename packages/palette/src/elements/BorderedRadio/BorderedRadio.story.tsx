import { fn } from "@storybook/test"
import React from "react"
import { RadioGroup } from "../RadioGroup"
import { BorderedRadio } from "./BorderedRadio"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  title: "Components/BorderedRadio",
  component: BorderedRadio,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "BorderedRadio component provides a radio button with border styling. Designed to be used within RadioGroup for creating radio button lists with consistent visual borders.",
      },
      controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
    },
  },
}

export const Default = {
  args: {
    value: "option1",
    children: "Option 1",
  },
}

export const WithPreselected = {
  render: () => (
    <RadioGroup defaultValue="Aural" onSelect={fn()}>
      <BorderedRadio value="Visual">Visual</BorderedRadio>
      <BorderedRadio value="Linguistic">Linguistic</BorderedRadio>
      <BorderedRadio value="Spatial">Spatial</BorderedRadio>
      <BorderedRadio value="Aural">Aural</BorderedRadio>
      <BorderedRadio value="Gestural">Gestural</BorderedRadio>
    </RadioGroup>
  ),
}

export const WithDeselectable = {
  render: () => (
    <RadioGroup deselectable onSelect={fn()}>
      <BorderedRadio value="Visual">Visual</BorderedRadio>
      <BorderedRadio value="Linguistic">Linguistic</BorderedRadio>
      <BorderedRadio value="Spatial">Spatial</BorderedRadio>
      <BorderedRadio value="Aural">Aural</BorderedRadio>
      <BorderedRadio value="Gestural">Gestural</BorderedRadio>
    </RadioGroup>
  ),
}

export const WithDisabledOption = {
  render: () => (
    <RadioGroup onSelect={fn()}>
      <BorderedRadio value="Visual">Visual</BorderedRadio>
      <BorderedRadio value="Linguistic" disabled>
        Linguistic (Disabled)
      </BorderedRadio>
      <BorderedRadio value="Spatial">Spatial</BorderedRadio>
      <BorderedRadio value="Aural">Aural</BorderedRadio>
      <BorderedRadio value="Gestural">Gestural</BorderedRadio>
    </RadioGroup>
  ),
}

export const WithErrorState = {
  render: () => (
    <RadioGroup onSelect={fn()}>
      <BorderedRadio value="Visual">Visual</BorderedRadio>
      <BorderedRadio value="Linguistic">Linguistic</BorderedRadio>
      <BorderedRadio value="Spatial" error>
        Spatial (Error)
      </BorderedRadio>
      <BorderedRadio value="Aural">Aural</BorderedRadio>
      <BorderedRadio value="Gestural">Gestural</BorderedRadio>
    </RadioGroup>
  ),
}
