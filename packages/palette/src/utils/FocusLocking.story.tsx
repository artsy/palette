import React, { useState } from "react"
import { Input } from "../elements/Input"
import { Button } from "../elements/Button"
import { AutocompleteInput } from "../elements/AutocompleteInput"
import { FocusOn } from "react-focus-on"

export default {
  title: "Utils/FocusLocking",
}

export const Default = () => {
  return (
    <>
      <Input placeholder="Not focusable" />
      <FocusOn>
        <Input placeholder="Focusable" />
        <Input placeholder="Focusable" />
        <a href="#" tabIndex={-1}>
          Skipped
        </a>
        <a href="#">Focusable</a>
        <Button variant="primaryGray" tabIndex={-1}>
          Skipped
        </Button>
        <Button variant="primaryGray">Focusable</Button>
      </FocusOn>
      <Input placeholder="Not focusable" />
    </>
  )
}

export const WithAutocompleteInput = () => {
  return (
    <FocusOn>
      <Input placeholder="Focusable" />
      <Input placeholder="Focusable" />
      <AutocompleteInput
        placeholder="Focusable"
        options={[
          { text: "One", value: "one" },
          { text: "Two", value: "two" },
          { text: "Three", value: "three" },
        ]}
      />
    </FocusOn>
  )
}

export const DisableToEnable = () => {
  const [value, setValue] = useState("")

  return (
    <FocusOn>
      <Input
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button disabled={!value}>Submit</Button>
    </FocusOn>
  )
}
