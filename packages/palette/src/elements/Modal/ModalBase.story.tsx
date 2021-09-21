import React, { useEffect, useState } from "react"
import { Text } from ".."
import { Box } from "../Box"
import { Button } from "../Button"
import { Input } from "../Input"
import { Join } from "../Join"
import { Spacer } from "../Spacer"
import { ModalBase, ModalBaseProps } from "./ModalBase"

const Example: React.FC<
  ModalBaseProps & {
    dialogChildren?: JSX.Element
    bodyChildren?: JSX.Element
    /** Simulates an input being added after render */
    defer?: boolean
    /** Simulates an input being mutated by an external entity */
    focusVisible?: boolean
  }
> = ({ bodyChildren, dialogChildren, defer, focusVisible, ...rest } = {}) => {
  const [open, setOpen] = useState(false)
  const label = open ? "opened" : "open"
  const handleClose = () => setOpen(false)

  const [deferred, setDeferred] = useState(false)

  useEffect(() => {
    if (defer && open) {
      setTimeout(() => {
        setDeferred(true)
      }, 1000)
    }
  }, [defer, open])

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!focusVisible) return

    const el = event.currentTarget

    document.querySelectorAll("input").forEach((input) => {
      input.classList.remove("focus-visible")
    })

    el.classList.add("focus-visible")
  }

  return (
    <>
      <Button variant="secondaryGray" onClick={() => setOpen(true)}>
        {label}
      </Button>

      {bodyChildren}

      {open && (
        <ModalBase onClose={handleClose} {...rest}>
          <Box
            background="black"
            p={4}
            width="100%"
            height="100%"
            style={{ border: "2px solid red" }}
          >
            <Box textAlign="center">
              <Text variant="md" color="white100">
                <Join separator={<Spacer my={1} />}>
                  <>Some example content. Click outside to close.</>
                  <Button variant="primaryWhite" onClick={handleClose}>
                    Or click here to close.
                  </Button>
                  <Input
                    placeholder="Just an example for focusing"
                    onFocus={handleFocus}
                  />
                  <Input
                    placeholder="Just an example for focusing"
                    onFocus={handleFocus}
                  />
                  {dialogChildren}
                  {deferred && (
                    <Input placeholder="Deferred input" onFocus={handleFocus} />
                  )}
                </Join>
              </Text>
            </Box>
          </Box>
        </ModalBase>
      )}
    </>
  )
}

export default { title: "Components/ModalBase" }

export const Default = () => {
  return <Example />
}

export const DeferredFocusables = () => {
  return <Example defer />
}

export const SimulateFocusVisible = () => {
  return <Example focusVisible />
}

export const Fullscreen = () => {
  return (
    <Example
      dialogProps={{
        width: "100%",
        height: "100%",
        background: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  )
}

export const Scrolling = () => {
  return (
    <Example
      bodyChildren={
        <>
          {Array.from(Array(100)).map((_, i) => (
            <div key={i}>content should not scroll when modal is open</div>
          ))}
        </>
      }
      dialogChildren={
        <>
          {Array.from(Array(100)).map((_, i) => (
            <div key={i}>content should be scrollable</div>
          ))}
        </>
      }
    />
  )
}
