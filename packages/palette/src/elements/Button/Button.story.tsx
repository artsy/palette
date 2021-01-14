import { storiesOf } from "@storybook/react"
import React from "react"
import { Box } from "../Box"
import { Join } from "../Join"
import { Spacer } from "../Spacer"
import { Button, ButtonSize } from "./Button"

storiesOf("Components/Button", module)
  .add("sizes", () => {
    return (
      <>
        {(["small", "medium", "large"] as ButtonSize[]).map(size => {
          return (
            <Box
              key={size}
              m={2}
              p={2}
              border="1px solid"
              borderColor="black10"
            >
              <Join separator={<Spacer my={1} />}>
                <Button size={size} variant="primaryBlack">
                  primaryBlack
                </Button>

                <Button size={size} variant="primaryWhite">
                  primaryWhite
                </Button>

                <Button size={size} variant="secondaryGray">
                  secondaryGray
                </Button>

                <Button size={size} variant="secondaryOutline">
                  secondaryOutline
                </Button>

                <Button size={size} variant="noOutline">
                  noOutline
                </Button>
              </Join>
            </Box>
          )
        })}
      </>
    )
  })
  .add("states", () => {
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
  })
  .add("native button props", () => {
    return (
      <Box m={2} p={2} border="1px solid" borderColor="black10">
        <Join separator={<Spacer my={1} />}>
          <Button autoFocus>autofocused</Button>

          <Button tabIndex={-1}>not focusable with keyboard</Button>

          <Button
            onClick={event => {
              event.preventDefault()
            }}
          >
            correctly typed click event
          </Button>
        </Join>
      </Box>
    )
  })
