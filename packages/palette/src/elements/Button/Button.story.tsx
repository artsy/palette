import React, { useState } from "react"
import { States } from "storybook-states"
import styled from "styled-components"
import { Join } from "../.."
import { BellIcon } from "../../svgs/BellIcon"
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
        { active: true },
        { loading: true },
        { disabled: true },
        { success: true },
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

const variants = BUTTON_VARIANT_NAMES.map((variant) => ({ variant }))

const Display = styled(Box)``
Display.displayName = "Button"

export const Variants = () => {
  return (
    <States<ButtonProps>
      states={([{ size: "large" }, { size: "small" }] as const)
        .map((size) => {
          return variants.map((variant) => ({ ...size, ...variant }))
        })
        .reduce((a, b) => {
          return a.concat(b)
        }, [])}
    >
      {(props) => (
        <Display
          p={1}
          overflowX="auto"
          {...(["primaryWhite", "secondaryWhite"].includes(`${props.variant}`)
            ? { bg: "black100", color: "white100" }
            : { bg: "white100", color: "black100" })}
        >
          <Flex>
            <Join separator={<Spacer ml={2} />}>
              <Button {...props}>Default</Button>

              <Button {...props} focus>
                Focus
              </Button>

              <Button {...props} hover>
                Hover
              </Button>

              <Button {...props} active>
                Active
              </Button>

              <Button {...props} loading>
                Loading
              </Button>

              <Button {...props} disabled>
                Disabled
              </Button>

              <Button {...props} success>
                Success
              </Button>
            </Join>
          </Flex>
        </Display>
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

export const As = () => {
  return (
    <States states={[{}, { as: "div", children: "This is a div" }]}>
      {/* @ts-ignore */}
      <Button as="a" href="#example">
        This is an anchor tag with an href
      </Button>
    </States>
  )
}

export const WithIcon = () => {
  return (
    <States<ButtonProps>
      states={[
        {},
        { focus: true },
        { hover: true },
        { loading: true },
        { disabled: true },
        { loading: true, disabled: true },
        { success: true },
        { size: "large" },
        { size: "large", focus: true },
        { size: "large", hover: true },
        { size: "large", loading: true },
        { size: "large", disabled: true },
        { size: "large", loading: true, disabled: true },
        { size: "large", success: true },
      ]}
    >
      <Button variant="secondaryBlack" size="small" Icon={BellIcon}>
        Create an Alert
      </Button>
    </States>
  )
}
