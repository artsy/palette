import React from "react"
import { TextArea } from "./TextArea"

const defaultProps = {
  placeholder: "Start typing...",
}

export default {
  title: "Components/TextArea",
}

export const _TextArea = () => {
  return <TextArea {...defaultProps} />
}

_TextArea.story = {
  name: "TextArea",
}

export const TextAreaTitle = () => {
  return <TextArea {...defaultProps} title="Note" />
}

TextAreaTitle.story = {
  name: "TextArea + title",
}

export const TextAreaTitleRequired = () => {
  return <TextArea {...defaultProps} title="Note" required />
}

TextAreaTitleRequired.story = {
  name: "TextArea + title + required",
}

export const TextAreaError = () => {
  return <TextArea {...defaultProps} error="Something went wrong." />
}

TextAreaError.story = {
  name: "TextArea + error",
}

export const TextAreaCharacterLimit = () => {
  return <TextArea {...defaultProps} characterLimit={10} />
}

TextAreaCharacterLimit.story = {
  name: "TextArea + character limit",
}

export const TextAreaName = () => {
  return <TextArea {...defaultProps} name="my-text-area" />
}

TextAreaName.story = {
  name: "TextArea + name",
}

export const TextAreaTitleDesc = () => {
  return (
    <TextArea
      {...defaultProps}
      name="my-text-area"
      title="Note"
      description="This is my description"
    />
  )
}

TextAreaTitleDesc.story = {
  name: "TextArea + title + desc",
}
