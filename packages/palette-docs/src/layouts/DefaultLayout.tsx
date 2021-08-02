import { Box, color, Flex, Text, useTheme } from "@artsy/palette"
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
        frontmatter: { name, status, type },
      },
    },
    location: { pathname },
  } = props

  const Contents = () => {
    const { theme } = useTheme()

    return (
      <Flex maxWidth={theme.breakpoints.md} margin="0 auto" position="relative">
        <Helmet defaultTitle="Palette" titleTemplate="Palette | %s">
          <title>{name}</title>
          <link
            href="https://webfonts.artsy.net/all-webfonts.css"
            rel="stylesheet"
            type="text/css"
          />
          <meta name="docsearch:language" content="en" />
          <meta name="docsearch:version" content="1.0.0" />
        </Helmet>

        <Flex width="100%" margin="auto">
          <Box
            width="25%"
            pr={2}
            borderRight="1px solid"
            borderRightColor="black10"
          >
            <Sidebar />
          </Box>

          <Box width="75%" height="100vh" overflowY="scroll">
            <ContentArea
              className="DocSearch-content"
              flexDirection="column"
              pt={4}
              px={6}
            >
              {type !== "page" && (
                <Box mb={0.5}>
                  <Text
                    as="h1"
                    variant="xl"
                    color="black100"
                    mb={2}
                    className="DocSearch-lvl1"
                  >
                    {name} {status && <StatusBadge status={status} />}
                  </Text>
                </Box>
              )}

              <MDXRenderer>{code.body}</MDXRenderer>
            </ContentArea>
          </Box>
        </Flex>
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
  overflow-x: scroll;
  min-height: "100%";
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
