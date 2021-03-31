import React, { useState } from "react"
import { States } from "storybook-states"
import styled from "styled-components"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { ButtonProps } from "./Button"
import { Button, BUTTON_SIZE_NAMES, BUTTON_VARIANT_NAMES } from "./index"

export default { title: "Components/Button" }

export const _States = () => {
  return (
    <States<ButtonProps>
      states={[
        {},
        { focus: true },
        { hover: true },
        { loading: true },
        { disabled: true },
        { loading: true, disabled: true },
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
    <States<ButtonProps> states={BUTTON_SIZE_NAMES.map((size) => ({ size }))}>
      <Button>Label</Button>
    </States>
  )
}

const _Demo = styled(Flex)``
_Demo.displayName = "Button"

export const Variants = () => {
  return (
    <States<ButtonProps>
      states={BUTTON_VARIANT_NAMES.map((variant) => ({ variant }))}
    >
      {(props) => (
        <_Demo>
          <Button {...props}>Label</Button>

          <Spacer mx={0.5} />

          <Button {...props} focus>
            Label
          </Button>

          <Spacer mx={0.5} />

          <Button {...props} hover>
            Label
          </Button>

          <Spacer mx={0.5} />

          <Button {...props} loading>
            Label
          </Button>

          <Spacer mx={0.5} />

          <Button {...props} disabled>
            Label
          </Button>
        </_Demo>
      )}
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
