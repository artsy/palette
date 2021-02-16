import React from "react"
import { Button } from "../Button"
import { Modal } from "./Modal"

export default {
  title: "Components/Modal",
}

export const Default = () => {
  return (
    <Modal show onClose={() => null}>
      Some example content
    </Modal>
  )
}

Default.story = {
  parameters: { chromatic: { delay: 500 } },
}

export const WithTitle = () => {
  return (
    <Modal show title="Modal Title" onClose={() => null}>
      Some example content
    </Modal>
  )
}

WithTitle.story = {
  name: "With title",
  parameters: { chromatic: { delay: 500 } },
}

export const WithLogo = () => {
  return (
    <Modal show title="Modal Title" hasLogo onClose={() => null}>
      Some example content
    </Modal>
  )
}

WithLogo.story = {
  name: "With logo",
  parameters: { chromatic: { delay: 500 } },
}

export const ModalWithFixedButton = () => {
  return (
    <Modal
      show
      title="Modal Title"
      onClose={() => null}
      FixedButton={<Button width="100%">Click me</Button>}
    >
      Some example content
    </Modal>
  )
}

ModalWithFixedButton.story = {
  name: "Modal with fixed button",
  parameters: { chromatic: { delay: 500 } },
}

export const WideModal = () => {
  return (
    <Modal show title="Modal Title" isWide onClose={() => null}>
      Some example content
    </Modal>
  )
}

WideModal.story = {
  name: "Wide modal",
  parameters: { chromatic: { delay: 500 } },
}
