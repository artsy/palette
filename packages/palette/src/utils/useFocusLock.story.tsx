import React, { useRef } from "react"
import { useFocusLock } from "./useFocusLock"
import { Input } from "../elements/Input"
import { Button } from "../elements/Button"

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
