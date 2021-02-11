import React from "react"
import { Input } from "./Input"

const defaultProps = {
  placeholder: "Start typing…",
}

export default {
  title: "Components/Input",
}

export const _Input = () => {
  return <Input {...defaultProps} />
}

export const InputTitle = () => {
  return <Input {...defaultProps} title="Your offer" />
}

InputTitle.story = {
  name: "Input + title",
}

export const InputTitleRequired = () => {
  return <Input {...defaultProps} title="Your offer" required />
}

InputTitleRequired.story = {
  name: "Input + title + required",
}

export const InputTitleDesc = () => {
  return (
    <Input
      {...defaultProps}
      title="Your offer"
      description="This is my description"
    />
  )
}

InputTitleDesc.story = {
  name: "Input + title + desc",
}

export const InputError = () => {
  return <Input {...defaultProps} error="Something went wrong." />
}

InputError.story = {
  name: "Input + error",
}

export const InputDisabled = () => {
  return <Input {...defaultProps} disabled />
}

InputDisabled.story = {
  name: "Input + disabled",
}

export const InputSpecifiedWidth = () => {
  return <Input style={{ width: "50%" }} {...defaultProps} />
}

InputSpecifiedWidth.story = {
  name: "Input + specified width",
}
