import { Box, Theme } from "@artsy/palette"
import { MDXProvider } from "@mdx-js/tag"
import { Location } from "@reach/router"
import { NavState } from "components/Sidebar/NavState"
import React from "react"
import { Provider as StateProvider } from "unstated"
import { GlobalStyles, MarkdownComponents } from "./components/GlobalComponents"

export const Boot = ({ element }) => {
  return (
    <Location>
      {({ location }) => {
        return (
          <StateProvider inject={[new NavState(location.pathname)]}>
            <MDXProvider components={MarkdownComponents}>
              <Theme theme="v3">
                <Box>
                  <GlobalStyles />
                  {element}
                </Box>
              </Theme>
            </MDXProvider>
          </StateProvider>
        )
      }}
    </Location>
  )
}
