import { Theme } from "@artsy/palette"
import CMS, { init } from "netlify-cms"
import { MdxControl, MdxPreview } from "netlify-cms-widget-mdx"
import React, { Component } from "react"
import { StyleSheetManager } from "styled-components"
import { MarkdownComponents, PaletteComponents } from '../components/GlobalComponents' // prettier-ignore

const isClient = typeof window !== "undefined"
const isDevelopment = process.env.NODE_ENV === "development"

if (isClient) {
  window.CMS_MANUAL_INIT = true
}

if (isDevelopment) {
  CMS.registerBackend(
    "file-system",
    require("netlify-cms-backend-fs").FileSystemBackend
  )
}

/**
 * Custom components need refs for validation and thus must be a class
 *
 * See https://github.com/netlify/netlify-cms/issues/1346
 */
class MDXWidget extends Component {
  render() {
    return (
      <Theme>
        <MdxControl {...this.props} />
      </Theme>
    )
  }
}

/**
 * The preview window which renders MDX content.
 *
 * Docs: https://www.netlifycms.org/docs/customization/
 */
const PreviewWindow = props => {
  const iframe = document.getElementsByTagName("iframe")[0]
  const iframeHeadElem = iframe.contentDocument.head

  const mdxProps = {
    components: MarkdownComponents,
    scope: {
      ...PaletteComponents,
    },
    mdPlugins: [],
  }

  return (
    <StyleSheetManager target={iframeHeadElem}>
      <MdxPreview mdx={mdxProps} {...props} />
    </StyleSheetManager>
  )
}

// Netlify collections that set `widget: mdx` will be able to use this custom
// widget. NOTE: The StyleSheet manager can *only* be injected into the Preview.
// Docs: https://www.netlifycms.org/docs/widgets/
CMS.registerWidget("mdx", MDXWidget, PreviewWindow)

// Start the CMS
init()
