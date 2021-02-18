import { action } from "@storybook/addon-actions"
import React, { useState } from "react"
import { Box } from "../Box"
import { Text } from "../Text"
import { Clickable } from "./Clickable"

export default {
  title: "Components/Clickable",
}

export const Default = () => {
  return (
    <Clickable onClick={action("onClick")} p={3}>
      <Text>Click</Text>
      <Text variant="small">or click</Text>
    </Clickable>
  )
}

export const Submit = () => {
  const [isSubmitted, setSubmitted] = useState(false)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)

        setTimeout(() => {
          setSubmitted(false)
        }, 1000)
      }}
    >
      <Text>submitted? {isSubmitted ? "yes" : "no"}</Text>

      <Box mt={1}>
        <Clickable border="1px solid" p={2} type="button" mr={1}>
          type="button"
        </Clickable>

        <Clickable border="1px solid" p={2} type="submit">
          type="submit"
        </Clickable>
      </Box>
    </form>
  )
}

Submit.story = {
  name: "Does not submit forms by default",
}
