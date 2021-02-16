import React, { useState } from "react"
import { Box } from "../Box"
import { Join } from "../Join"
import { Spacer } from "../Spacer"
import { Button, BUTTON_VARIANTS, ButtonSize } from "./index"
import { ButtonVariant } from "./tokens"

const LoadingDemo = () => {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  return (
    <Button loading={loading} onClick={handleClick}>
      click to load
    </Button>
  )
}

export default { title: "Components/Button" }

export const Sizes = () => {
  return (
    <>
      {(["small", "medium", "large"] as ButtonSize[]).map((size) => {
        return (
          <Box key={size} m={2} p={2} border="1px solid" borderColor="black10">
            <Join separator={<Spacer my={1} />}>
              {(Object.keys(BUTTON_VARIANTS) as ButtonVariant[]).map(
                (variant) => {
                  return (
                    <Button key={variant} size={size} variant={variant}>
                      {variant}
                    </Button>
                  )
                }
              )}
            </Join>
          </Box>
        )
      })}
    </>
  )
}

Sizes.story = {
  name: "sizes",
}

export const Modes = () => {
  return (
    <>
      {(["small", "medium", "large"] as ButtonSize[]).map((size) => {
        return (
          <Box key={size} m={2} p={2} border="1px solid" borderColor="black10">
            {(Object.keys(BUTTON_VARIANTS) as ButtonVariant[]).map(
              (variant) => {
                return (
                  <Box my={1} key={variant}>
                    <Button variant={variant} size={size}>
                      block (default)
                    </Button>{" "}
                    <Button variant={variant} size={size} inline>
                      inline
                    </Button>
                  </Box>
                )
              }
            )}
          </Box>
        )
      })}
    </>
  )
}

Modes.story = {
  name: "modes",
}

export const States = () => {
  return (
    <Box m={2} p={2} border="1px solid" borderColor="black10">
      <Join separator={<Spacer my={1} />}>
        <Button variant="secondaryOutline">resting</Button>

        <Button variant="secondaryOutline" loading>
          loading
        </Button>

        <Button variant="secondaryOutline" disabled>
          disabled
        </Button>

        {/* TODO: hover, focus, active */}
      </Join>
    </Box>
  )
}

States.story = {
  name: "states",
}

export const NativeButtonProps = () => {
  return (
    <Box m={2} p={2} border="1px solid" borderColor="black10">
      <Join separator={<Spacer my={1} />}>
        <Button autoFocus>autofocused</Button>

        <Button tabIndex={-1}>not focusable with keyboard</Button>

        <Button
          onClick={(event) => {
            event.preventDefault()
          }}
        >
          correctly typed click event
        </Button>
      </Join>
    </Box>
  )
}

NativeButtonProps.story = {
  name: "native button props",
}

export const WithBoxProps = () => {
  return (
    <Box m={2} p={2} border="1px solid" borderColor="black10">
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
  )
}

WithBoxProps.story = {
  name: "with BoxProps",
}

export const Loading = () => {
  return (
    <Box m={2} p={2} border="1px solid" borderColor="black10">
      <LoadingDemo />
    </Box>
  )
}

Loading.story = {
  name: "loading",
}
