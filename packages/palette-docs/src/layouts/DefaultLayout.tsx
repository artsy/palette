import { Box, color, Flex, Sans, Serif, Tab, Tabs } from "@artsy/palette"
import { MDXProvider } from "@mdx-js/tag"
import { MobilePreview } from "components/MobilePreview"
import { Sidebar } from "components/Sidebar"
import { NavState } from "components/Sidebar/NavState"
import { StatusBadge } from "components/StatusBadge"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import React from "react"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import { Provider as StateProvider } from "unstated"

export default function DocsLayout(props) {
  const {
    data: {
      mdx: {
        code,
        frontmatter: { name, status, type, lastPointOfContact, platforms },
      },
    },
    location: { pathname },
  } = props

  const hasMultiplePlatforms = platforms && platforms.length > 1

  // components={{
  //   Button: require("@artsy/palette/dist/elements/Button/Button.ios"),
  // }}

  const content = hasMultiplePlatforms ? (
    <Tabs>
      <Tab name="Web">
        <MDXRenderer>{code.body}</MDXRenderer>
      </Tab>
      <Tab name="Mobile">
        <MDXProvider>
          <MobilePreview>
            <MDXRenderer>{code.body}</MDXRenderer>
          </MobilePreview>
        </MDXProvider>
      </Tab>
    </Tabs>
  ) : (
    <MDXRenderer>{code.body}</MDXRenderer>
  )

  const Contents = () => {
    return (
      <Flex maxWidth="1200px" style={{ margin: "0 auto" }}>
        <Helmet defaultTitle="Palette" titleTemplate="Palette | %s">
          <title>{name}</title>
          <link
            href="https://webfonts.artsy.net/all-webfonts.css"
            rel="stylesheet"
            type="text/css"
          />
        </Helmet>
        <Sidebar />
        <ContentArea flexDirection="column" pt={4} px={6}>
          {type !== "page" && (
            <Box mb={0.5}>
              <Serif size="8" color="black100" mb={2}>
                {name} {status && <StatusBadge status={status} />}
              </Serif>
            </Box>
          )}
          {content}
          {lastPointOfContact && (
            <Box mt={3}>
              <Sans color="black60" size="2">
                Last points of contact: {lastPointOfContact}
              </Sans>
            </Box>
          )}
        </ContentArea>
      </Flex>
    )
  }

  /**
   * In order to render an expanded nav when deep-linking into a url during
   * the SSR pass we need to initialize it with the current url path.
   *
   * This is to get around the inability to access `pathname` from within the
   * `wrapRootElement` gatsby-ssr lifecycle, which is where StateProvider is
   * typically initialized.
   *
   * TODO: Open up issue in Gatsby repo inquiring about access.
   */
  if (typeof window === "undefined") {
    return (
      <StateProvider inject={[new NavState(pathname)]}>
        <Contents />
      </StateProvider>
    )

    // Once mounted on the client defer to StateProvider mounted within Boot.
  } else {
    return <Contents />
  }
}

export const ContentArea = styled(Flex)`
  width: 80%;
  max-width: 980px;
  margin: 0 auto;
  overflow-x: scroll;
  border-left: 1px solid ${color("black10")};
`

/**
 * Query for data for the page. Note that $id is injected in via context from
 * actions.createPage. See gatsby-node.js for more info.
 */
export const pageQuery = graphql`
  query DocsLayoutQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        name
        status
        type
        lastPointOfContact
        platforms
      }
      code {
        body
      }
    }
  }
`
