import React from "react"
import { Theme, injectGlobalStyles } from "@artsy/palette"

const { GlobalStyles } = injectGlobalStyles()

export const decorators = [
  (Story) => {
    return (
      <Theme>
        <GlobalStyles />
        <Story />
      </Theme>
    )
  },
]
