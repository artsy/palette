import React from "react"
import { Value } from "react-powerplug"
import { Serif } from "../Typography"
import { Slider } from "./Slider"

export default { title: "Components/Slider" }

export const WithLabel = () => {
  return (
    <Value initial={[0, 100]}>
      {({ value, set }) => {
        const valueToString: any = ([min, max]) => "$" + min + " - $" + max
        return (
          <div>
            <Serif size="3" color="black60" my={2}>
              {valueToString(value)}
            </Serif>
            <Slider
              allowCross={false}
              min={10}
              max={100}
              step={1}
              defaultValue={[10, 100]}
              onChange={set}
            />
          </div>
        )
      }}
    </Value>
  )
}

WithLabel.story = {
  name: "With label",
}

export const Disabled = () => {
  return (
    <Slider
      allowCross={false}
      min={10}
      max={100}
      step={1}
      defaultValue={[10, 100]}
      disabled
    />
  )
}
