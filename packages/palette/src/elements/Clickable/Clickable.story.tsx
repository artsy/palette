import { action } from "@storybook/addon-actions"
import React, { useState } from "react"
import { States } from "storybook-states"
import { Box } from "../Box"
import { Clickable, ClickableProps } from "./Clickable"

export default {
  title: "Components/Clickable",
}

export const Default = () => {
  return (
    <States<ClickableProps>
      states={[
        {},
        { textDecoration: "underline" },
        { cursor: "default" },
        {
          children: (
            <>
              Inherits the page’s
              <br />
              text alignment.
            </>
          ),
        },
        {
          bg: "red100",
          color: "white100",
          m: 2,
          p: 1,
        },
      ]}
    >
      <Clickable onClick={action("onClick")}>Clickable</Clickable>
    </States>
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
      <pre>submitted? {isSubmitted ? "yes" : "no"}</pre>

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
