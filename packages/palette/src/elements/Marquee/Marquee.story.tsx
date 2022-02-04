import React from "react"
import { Marquee } from "./Marquee"

export default {
  title: "Components/Marquee",
}

export const Default = () => {
  return <Marquee marqueeText="Black Owned" />
}

export const LightVariant = () => {
  return <Marquee marqueeText="Black Owned" variant="defaultLight" />
}

export const Brand = () => {
  return <Marquee marqueeText="Black Owned" variant="brand" />
}

export const NoDivider = () => {
  return <Marquee marqueeText="Black Owned" noDivider />
}
