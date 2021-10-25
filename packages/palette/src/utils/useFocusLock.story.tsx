import React, { useRef } from "react"
import { useFocusLock } from "./useFocusLock"
import { Input } from "../elements/Input"
import { Button } from "../elements/Button"
import { AutocompleteInput } from ".."

export default {
  title: "Hooks/useFocusLock",
}

export const Default = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  useFocusLock(ref)

  return (
    <>
      <Input placeholder="Not focusable" />
      <div ref={ref}>
        <Input placeholder="Focusable" />
        <Input placeholder="Focusable" />
        <Button>Focusable</Button>
      </div>
      <Input placeholder="Not focusable" />
    </>
  )
}

export const WithAutocompleteInput = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  useFocusLock(ref)

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
