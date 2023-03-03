import React from "react"
import { States } from "storybook-states"
import styled from "styled-components"
import { Button } from "../Button"
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
        { active: true },
        { error: "Something went wrong." },
        { disabled: true },
        { disabled: true, value: "Example value" },
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

export const Required = () => {
  return (
    <form>
      <Input
        title="Example"
        required
        placeholder="Submission should be blocked unless this has a value"
      />

      <Input
        mt={1}
        title="Email"
        required
        placeholder="Requires a valid email"
        type="email"
      />

      <Button mt={1}>Submit</Button>
    </form>
  )
}

export const CustomHeight = () => {
  return <Input height={40} placeholder="Input is 40px in height" />
}
