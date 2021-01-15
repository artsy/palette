import { storiesOf } from "@storybook/react"
import React from "react"
import { Box } from "../Box"
import { Join } from "../Join"
import { Spacer } from "../Spacer"
import { Button, BUTTON_VARIANTS, ButtonSize } from "./index"
import { ButtonVariant } from "./tokens"

storiesOf("Components/Button", module)
  // TODO: Remove these once it's validated that nothing has shifted around
  .add("small", () => {
    return (
      <>
        <Button size="small" variant="primaryBlack" mr={1}>
          primaryBlack
        </Button>
        <Button size="small" variant="primaryWhite" mr={1}>
          primaryWhite
        </Button>
        <Button size="small" variant="secondaryGray" mr={1}>
          secondaryGray
        </Button>
        <Button size="small" variant="secondaryOutline" mr={1}>
          secondaryOutline
        </Button>
        <Button size="small" variant="noOutline">
          noOutline
        </Button>
      </>
    )
  })
  .add("medium", () => {
    return (
      <>
        <Button size="medium" variant="primaryBlack" mr={1}>
          primaryBlack
        </Button>
        <Button size="medium" variant="primaryWhite" mr={1}>
          primaryWhite
        </Button>
        <Button size="medium" variant="secondaryGray" mr={1}>
          secondaryGray
        </Button>
        <Button size="medium" variant="secondaryOutline" mr={1}>
          secondaryOutline
        </Button>
        <Button size="medium" variant="noOutline">
          noOutline
        </Button>
      </>
    )
  })
  .add("large", () => {
    return (
      <>
        <Button size="large" variant="primaryBlack" mr={1}>
          primaryBlack
        </Button>
        <Button size="large" variant="primaryWhite" mr={1}>
          primaryWhite
        </Button>
        <Button size="large" variant="secondaryGray" mr={1}>
          secondaryGray
        </Button>
        <Button size="large" variant="secondaryOutline" mr={1}>
          secondaryOutline
        </Button>
        <Button size="large" variant="noOutline">
          noOutline
        </Button>
      </>
    )
  })
  // END TODO
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
                {(Object.keys(BUTTON_VARIANTS) as ButtonVariant[]).map(
                  variant => {
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
  })
  .add("modes", () => {
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
              {(Object.keys(BUTTON_VARIANTS) as ButtonVariant[]).map(
                variant => {
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
  .add("with BoxProps", () => {
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
  })
// TODO:
// .add('as="a"', () => {
//   return (
//     <Box m={2} p={2} border="1px solid" borderColor="black10">
//       <Button
//         as="a"
//         href="https://google.com"
//         target="_blank"
//       >
//         an anchor tag
//       </Button>
//     </Box>
//   )
// })
