import { Box, color, Flex, Sans, Serif } from "@artsy/palette"
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
        frontmatter: { name, status, type, lastPointOfContact },
      },
    },
    location: { pathname },
  } = props

  const Contents = () => {
    return (
      <Flex maxWidth="1200px" style={{ margin: "0 auto" }}>
        <Helmet defaultTitle="Palette" titleTemplate="Palette | %s">
          <title>{name}</title>
          <link
            href="https://production-webfonts.artsy.net/all-webfonts.css"
            rel="stylesheet"
            type="text/css"
          />
          <meta name="docsearch:language" content="en" />
          <meta name="docsearch:version" content="1.0.0" />
        </Helmet>
        <Sidebar />
        <ContentArea
          className="DocSearch-content"
          flexDirection="column"
          pt={4}
          px={6}
        >
          {type !== "page" && (
            <Box mb={0.5}>
              <Serif
                element="h1"
                size="8"
                color="black100"
                mb={2}
                className="DocSearch-lvl1"
              >
                {name} {status && <StatusBadge status={status} />}
              </Serif>
            </Box>
          )}
          <MDXRenderer>{code.body}</MDXRenderer>
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
      }
      code {
        body
      }
    }
  }
`
