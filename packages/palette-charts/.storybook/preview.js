import React from "react"
import { Theme, injectGlobalStyles } from "@artsy/palette"

const { GlobalStyles } = injectGlobalStyles()

export const decorators = [
  (Story) => {
    return (
      <Theme theme="v3">
        <>
          <GlobalStyles />
          <Story />
        </>
      </Theme>
    )
  },
]
