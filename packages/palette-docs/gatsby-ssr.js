// @ts-check
import React from "react"

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import { Boot } from "./src/Boot"

export const wrapRootElement = Boot

export function onRenderBody(
  { setHeadComponents, setPostBodyComponents },
  { apiKey, indexName, inputSelector, debug = false }
) {
  setPostBodyComponents([
    <script
      key="plugin-docsearch-initiate"
      type="text/javascript"
      dangerouslySetInnerHTML={{
        // I figure I can pull these values from gatsby-config.js somehow.
        __html: `window.docsearchSettings = {apiKey: "e4ea4437446d07b0549e0db7928d92d1", indexName: "artsy_palette"}`,
      }}
    />,
  ])
}
