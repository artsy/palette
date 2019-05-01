import * as React from "react"
import { PropertyControls, ControlType } from "framer"
import {
  Button as BaseButton,
  ButtonVariant,
  ButtonSize,
  Theme,
} from "@artsy/palette"

interface Props {
  text: string
  type: ButtonVariant
  size: ButtonSize
  width?: number
  fullWidth: boolean
}

export class Button extends React.Component<Props> {
  render() {
    const { fullWidth, size, text, type, width } = this.props
    const extraProps = fullWidth ? { width: width } : {}

    return (
      <Theme>
        <BaseButton variant={type} size={size} {...extraProps}>
          {text}
        </BaseButton>
      </Theme>
    )
  }

  // Set default values for props if there are none
  // https://reactjs.org/docs/react-component.html#defaultprops
  static defaultProps: Props = {
    text: "Hello World!",
    type: "primaryBlack",
    size: "medium",
    fullWidth: false,
  }

  // Add Framer UI for this component (in the properties panel)
  // https://framer.com/learn/docs/components#code
  static propertyControls: PropertyControls<Props> = {
    text: { type: ControlType.String, title: "Text" },
    type: {
      type: ControlType.Enum,
      title: "Type",
      options: [
        "primaryBlack",
        "primaryWhite",
        "secondaryGray",
        "secondaryOutline",
        "noOutline",
      ],
      optionTitles: [
        "Primary Black",
        "Primary White",
        "Secondary Gray",
        "Secondary Outline",
        "No Outline",
      ],
    },
    size: {
      type: ControlType.Enum,
      title: "Size",
      options: ["small", "medium", "large"],
      optionTitles: ["Small", "Medium", "Large"],
    },
    fullWidth: {
      type: ControlType.Boolean,
      disabledTitle: "Fixed",
      enabledTitle: "Dynamic",
    },
  }
}
