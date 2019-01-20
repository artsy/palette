import { withMDXScope } from "gatsby-mdx/context"
import React from "react"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"

// require("prismjs/themes/prism-coy.css")
// require("prismjs/themes/prism-dark.css")
require("prismjs/themes/prism-funky.css")
// require("prismjs/themes/prism-okaidia.css")
// require("prismjs/themes/prism-solarizedlight.css")
// require("prismjs/themes/prism-tomorrow.css")
// require("prismjs/themes/prism-twilight.css")

interface PlaygroundProps {
  code: string
  scope: object

  // TODO: Currently props cannot be passed to Playground from .mdx files
  editable?: boolean
}

export const Playground: React.SFC<PlaygroundProps> = withMDXScope(
  ({ code, scope, editable = true }) => {
    return (
      <LiveProvider
        code={code}
        scope={scope}
        mountStylesheet={false}
        style={{
          pointerEvents: editable ? "inherit" : "none",
        }}
      >
        <LivePreview />
        <LiveError />
        <LiveEditor />
      </LiveProvider>
    )
  }
)

// Just a wrapper for now
export const CodeEditor = ({ children }) => children
