import React, { useEffect, useState } from "react"
import { Text } from "../Text"
import { Box } from "../Box"
import { Button } from "../Button"
import { Input } from "../Input"
import { Join } from "../Join"
import { Spacer } from "../Spacer"
import { ModalBase, ModalBaseProps } from "./ModalBase"

const Example: React.FC<React.PropsWithChildren<ModalBaseProps & {
  dialogChildren?: JSX.Element
  bodyChildren?: JSX.Element
  /** Simulates an input being added after render */
  defer?: boolean
}>> = ({ bodyChildren, dialogChildren, defer, ...rest } = {}) => {
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

  return (
    <>
      <Button variant="primaryGray" onClick={() => setOpen(true)}>
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
              <Text variant="sm-display" color="white100">
                <Join separator={<Spacer y={2} />}>
                  <>Some example content. Click outside to close.</>
                  <Button variant="primaryWhite" onClick={handleClose}>
                    Or click here to close.
                  </Button>
                  <Input placeholder="Just an example for focusing" />
                  <Input placeholder="Just an example for focusing" />
                  {dialogChildren}
                  {deferred && <Input placeholder="Deferred input" />}
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
