import React from "react"
import { States } from "storybook-states"
import styled from "styled-components"
import { Input, InputProps } from "./Input"

export default {
  title: "Components/Input",
}

export const Default = () => {
  return (
    <States<InputProps>
      states={[
        {},
        { focus: true },
        { hover: true },
        { error: "Something went wrong." },
        { disabled: true },
        { title: "Your offer", name: "offer" },
        { title: "Your offer", required: true },
        { title: "Your offer", description: "This is my description" },
        { width: "50%" },
      ]}
    >
      <Input placeholder="Start typing…" />
    </States>
  )
}

const StyledInput = styled(Input)`
  border: 1px solid red;

  > input {
    border: 2px solid green;
  }
`

export const Styled = () => {
  return <StyledInput placeholder="style should target container div" />
}
