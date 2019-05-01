import * as React from "react"
import { PropertyControls, ControlType } from "framer"
import { Button as BaseButton, Theme } from "@artsy/palette"

type Props = { text: string }

export class Button extends React.Component<Props> {
  render() {
    return (
      <Theme>
        <BaseButton>{this.props.text}</BaseButton>
      </Theme>
    )
  }

  // Set default values for props if there are none
  // https://reactjs.org/docs/react-component.html#defaultprops
  static defaultProps: Props = {
    text: "Hello World!",
  }

  // Add Framer UI for this component (in the properties panel)
  // https://framer.com/learn/docs/components#code
  static propertyControls: PropertyControls<Props> = {
    text: { type: ControlType.String, title: "Text" },
  }
}

// Define some standard CSS for your component
const style: React.CSSProperties = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "#8855FF",
  background: "rgba(136, 85, 255, 0.1)",
  overflow: "hidden",
}
