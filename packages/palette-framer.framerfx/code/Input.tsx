import * as React from "react"
import { PropertyControls, ControlType } from "framer"
import { Input as PaletteInput } from "@artsy/palette"

interface Props {
  text: string
  title?: string
  placeholder: string
  required?: boolean
  disabled?: boolean
}

export class Input extends React.Component<Props> {
  render() {
    const { disabled, placeholder, text, title, required } = this.props
    return (
      <PaletteInput
        placeholder={placeholder}
        title={title}
        disabled={disabled}
        required={required}
        value={text}
      />
    )
  }

  // Add Framer UI for this component (in the properties panel)
  // https://framer.com/learn/docs/components#code
  static propertyControls: PropertyControls<Props> = {
    title: { type: ControlType.String, title: "Title" },
    text: { type: ControlType.String, title: "Text" },
    placeholder: { type: ControlType.String, title: "Placeholder" },
    required: { type: ControlType.Boolean },
    disabled: { type: ControlType.Boolean },
  }
}
