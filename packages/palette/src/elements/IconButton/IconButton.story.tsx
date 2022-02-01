import React from "react"
import { States } from "storybook-states"
import { Box } from "../Box"
import { EnvelopeIcon } from "../../svgs/EnvelopeIcon"
import { BellIcon } from "../../svgs/BellIcon"
import { FacebookIcon } from "../../svgs/FacebookIcon"
import { IconButton, IconButtonProps } from "./index"
import { Spacer } from "../Spacer"
import { Join } from "../Join"

export default { title: "Components/IconButton" }

export const Default = () => {
  return (
    <States<Partial<IconButtonProps>>
      states={[
        {},
        { focus: true },
        { hover: true },
        { loading: true },
        { disabled: true },
        { loading: true, disabled: true },
      ]}
    >
      <IconButton
        size="small"
        variant="secondaryOutline"
        icon={<BellIcon fill="currentColor" />}
      >
        Create an Alert
      </IconButton>
    </States>
  )
}

export const Example = () => {
  return (
    <Box width={600}>
      <Join separator={<Spacer mt={1} />}>
        <IconButton
          variant="secondaryOutline"
          width="100%"
          icon={<EnvelopeIcon fill="currentColor" />}
        >
          Continue with Email
        </IconButton>

        <IconButton
          width="100%"
          icon={
            // TODO: Add Apple logo to svgs
            <div></div>
          }
        >
          Continue with Apple
        </IconButton>

        <IconButton
          variant="secondaryOutline"
          width="100%"
          icon={<FacebookIcon fill="currentColor" />}
        >
          Continue with Facebook
        </IconButton>
      </Join>
    </Box>
  )
}
