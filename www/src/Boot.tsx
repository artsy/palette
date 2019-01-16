import { injectGlobalStyles } from "@artsy/palette"
import React from "react"
import { HeadProvider } from "react-head"

const { GlobalStyles } = injectGlobalStyles()

export const Boot = ({ element }) => {
  return (
    <HeadProvider>
      <GlobalStyles>{element}</GlobalStyles>
    </HeadProvider>
  )
}
