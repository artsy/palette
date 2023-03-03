import React, { useRef, useState } from "react"
import { useFocusLock } from "./useFocusLock"
import { Input } from "../elements/Input"
import { Button } from "../elements/Button"
import { AutocompleteInput } from "../elements/AutocompleteInput"

export default {
  title: "Hooks/useFocusLock",
}

export const Default = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  useFocusLock({ ref })

  return (
    <>
      <Input placeholder="Not focusable" />
      <div ref={ref}>
        <Input placeholder="Focusable" />
        <Input placeholder="Focusable" />
        <a href="#" tabIndex={-1}>
          Skipped
        </a>
        <a href="#">Focusable</a>
        <Button variant="primaryGray" tabIndex={-1}>
          Skipped
        </Button>
        <Button variant="primaryGray" disabled>
          Disabled
        </Button>
        <Button variant="primaryGray">Focusable</Button>
      </div>
      <Input placeholder="Not focusable" />
    </>
  )
}

export const WithAutocompleteInput = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  useFocusLock({ ref })

  return (
    <div ref={ref}>
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
    </div>
  )
}

export const DisableToEnable = () => {
  const [value, setValue] = useState("")

  const ref = useRef<HTMLDivElement | null>(null)

  useFocusLock({ ref })

  return (
    <div ref={ref}>
      <Input
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button disabled={!value}>Submit</Button>
    </div>
  )
}
