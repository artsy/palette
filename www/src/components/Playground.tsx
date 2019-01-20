import { Spacer } from "@artsy/palette"
import { withMDXScope } from "gatsby-mdx/context"
import React from "react"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"

export const Playground = withMDXScope(({ code, scope }) => {
  return (
    <LiveProvider code={code} scope={scope}>
      <LivePreview />
      <Spacer my={1} />
      <LiveEditor />
      <LiveError />
    </LiveProvider>
  )
})
