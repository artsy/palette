import * as React from "react"
import { PropertyControls, ControlType } from "framer"
import { Input as PaletteInput } from "@artsy/palette"

type Props = { text: string }

export class Input extends React.Component<Props> {
  // Return the component contents in JSX
  // https://reactjs.org/docs/introducing-jsx.html
  render() {
    return <PaletteInput />
  }

  // Add Framer UI for this component (in the properties panel)
  // https://framer.com/learn/docs/components#code
  static propertyControls: PropertyControls<Props> = {
    text: { type: ControlType.String, title: "Text" },
  }
}
