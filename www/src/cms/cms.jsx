import React, { Component } from "react"
import CMS, { init } from "netlify-cms"
import { Theme } from "@artsy/palette"
import { StyleSheetManager } from "styled-components"
import { MdxControl, MdxPreview } from "netlify-cms-widget-mdx"
import { MarkdownComponents, PaletteComponents } from '../components/GlobalComponents' // prettier-ignore
import { config } from "../../static/admin/config"
import { Box, Toggle } from "@artsy/palette"

const isClient = typeof window !== "undefined"
const isDevelopment = process.env.NODE_ENV === "development"

if (isDevelopment) {
  if (isClient) {
    // Allows for local development overrides in cms.yaml
    window.CMS_ENV = "localhost_development"
  }

  CMS.registerBackend(
    "file-system",
    require("netlify-cms-backend-fs").FileSystemBackend
  )
}

// @ts-check

/**
 * Custom components need refs for validation and thus must be a class.
 * Additionally, after <Theme>, only one child is allowed.
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
      Playground: ({ children, title }) => {
        return (
          <Box mt={4}>
            <Toggle label={title} textSize="4" expanded={true}>
              <Box pt={2}>{children}</Box>
            </Toggle>
          </Box>
        )
      },
    },
    mdPlugins: [],
  }

  return (
    <StyleSheetManager target={iframeHeadElem}>
      <Theme>
        <MdxPreview mdx={mdxProps} {...props} />
      </Theme>
    </StyleSheetManager>
  )
}

// Netlify collections that set `widget: mdx` will be able to use this custom
// widget. NOTE: The StyleSheet manager can *only* be injected into the Preview.
// Docs: https://www.netlifycms.org/docs/widgets/
CMS.registerWidget("mdx", MDXWidget, PreviewWindow)

// Start the CMS
init({ config })
