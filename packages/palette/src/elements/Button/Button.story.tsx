import React, { useState } from "react"
import { States } from "storybook-states"
import { Box } from "../Box"
import { ButtonProps } from "./Button"
import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from "./index"

export default { title: "Components/Button" }

export const _States = () => {
  return (
    <States<ButtonProps>
      states={[
        {},
        { loading: true },
        { disabled: true },
        { loading: true, disabled: true },
        // TODO: { hover: true },
        // TODO: { focus: true },
      ]}
    >
      <Button>Label</Button>
    </States>
  )
}

_States.story = {
  name: "States",
}

export const Sizes = () => {
  return (
    <States<ButtonProps>
      states={(Object.keys(BUTTON_SIZES.block) as Array<
        keyof typeof BUTTON_SIZES.block
      >).map((size) => ({ size }))}
    >
      <Button>Label</Button>
    </States>
  )
}

export const Variants = () => {
  return (
    <States<ButtonProps>
      states={(Object.keys(BUTTON_VARIANTS) as Array<
        keyof typeof BUTTON_VARIANTS
      >).map((variant) => ({ variant }))}
    >
      <Button>Label</Button>
    </States>
  )
}

export const NativeButtonProps = () => {
  return (
    <States<ButtonProps>
      states={[
        { autoFocus: true, children: "autofocused" },
        { tabIndex: -1, children: "not focusable with keyboard" },
        {
          onClick: (event) => {
            event.preventDefault()
          },
          children: "correctly typed click event",
        },
      ]}
    >
      <Button>Label</Button>
    </States>
  )
}

NativeButtonProps.story = {
  name: "Native button tag props",
}

export const WithBoxProps = () => {
  return (
    <States>
      <Box border="1px dotted" borderColor="black100">
        <Button display="block" width="100%" my={2}>
          full width
        </Button>

        <Button display="block" width="100%" my={2}>
          with collapsing
        </Button>

        <Button display="block" width="100%" my={2}>
          margins
        </Button>
      </Box>
    </States>
  )
}

WithBoxProps.story = {
  name: "with BoxProps",
}

export const Loading = () => {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  return (
    <States>
      <Button loading={loading} onClick={handleClick}>
        click to load
      </Button>
    </States>
  )
}
