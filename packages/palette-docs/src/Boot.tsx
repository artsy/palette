import { Box, Theme } from "@artsy/palette"
import { MDXProvider } from "@mdx-js/react"
import { Location } from "@reach/router"
import { GlobalStyles } from "components/GlobalStyles"
import { NavState } from "components/Sidebar/NavState"
import React from "react"
import { Provider as StateProvider } from "unstated"
import { MDXComponents } from "./components/MDXComponents"

export const Boot = ({ element }) => {
  return (
    <Location>
      {({ location }) => {
        return (
          <StateProvider inject={[new NavState(location.pathname)]}>
            <MDXProvider components={MDXComponents}>
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
