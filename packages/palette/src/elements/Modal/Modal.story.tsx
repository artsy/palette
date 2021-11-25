import React from "react"
import { Button } from "../Button"
import { Modal } from "./Modal"

export default {
  title: "Components/Modal",
}

const content = `
  Chicharrones marfa tumeric squid four loko flexitarian celiac hell of hot chicken 
  jianbing salvia enamel pin woke. Migas you probably haven't heard of them church-key 
  pok pok banh mi yr ennui ethical subway tile authentic. Sartorial retro roof party, 
  gastropub bicycle rights drinking vinegar microdosing swag DIY deep v. Viral hella pop-up, 
  banh mi squid poke chambray yuccie biodiesel occupy scenester.
`

export const Default = () => {
  return (
    <Modal show onClose={() => null}>
      {content}
    </Modal>
  )
}

Default.story = {
  parameters: { chromatic: { delay: 500 } },
}

export const Title = () => {
  return (
    <Modal show title="Modal Title" onClose={() => null}>
      {content}
    </Modal>
  )
}

Title.story = {
  name: "Title",
  parameters: { chromatic: { delay: 500 } },
}

export const LongTitle = () => {
  return (
    <Modal
      show
      title="Modal Title with a longer title or headline text that runs on for mutliple lines"
      onClose={() => null}
    >
      {content}
    </Modal>
  )
}

LongTitle.story = {
  name: "Long title",
  parameters: { chromatic: { delay: 500 } },
}

export const Logo = () => {
  return (
    <Modal show hasLogo onClose={() => null}>
      {content}
    </Modal>
  )
}

Logo.story = {
  name: "Logo",
  parameters: { chromatic: { delay: 500 } },
}

export const LogoAndTitle = () => {
  return (
    <Modal show hasLogo title="Modal Title" onClose={() => null}>
      {content}
    </Modal>
  )
}

LogoAndTitle.story = {
  name: "Logo and title",
  parameters: { chromatic: { delay: 500 } },
}

export const FixedButton = () => {
  return (
    <Modal
      show
      title="Modal Title"
      hasLogo
      onClose={() => null}
      FixedButton={<Button width="100%">Click me</Button>}
    >
      {content.repeat(5)}
    </Modal>
  )
}

FixedButton.story = {
  name: "Fixed button",
  parameters: { chromatic: { delay: 500 } },
}

export const FixedButtonNoTitle = () => {
  return (
    <Modal
      show
      hasLogo
      onClose={() => null}
      FixedButton={<Button width="100%">Click me</Button>}
    >
      {content.repeat(5)}
    </Modal>
  )
}

FixedButtonNoTitle.story = {
  name: "Fixed button no title",
  parameters: { chromatic: { delay: 500 } },
}

export const FixedButtonNoLogo = () => {
  return (
    <Modal
      show
      title="Modal Title"
      onClose={() => null}
      FixedButton={<Button width="100%">Click me</Button>}
    >
      {content.repeat(5)}
    </Modal>
  )
}

FixedButtonNoLogo.story = {
  name: "Fixed button no logo",
  parameters: { chromatic: { delay: 500 } },
}

export const Wide = () => {
  return (
    <Modal show title="Modal Title" isWide onClose={() => null}>
      {content}
    </Modal>
  )
}

Wide.story = {
  name: "Wide",
  parameters: { chromatic: { delay: 500 } },
}
