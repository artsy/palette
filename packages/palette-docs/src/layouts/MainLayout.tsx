import { Box, EditIcon, Flex, Text, useTheme } from "@artsy/palette"
import { Sidebar } from "components/Sidebar"
import { NavState } from "components/Sidebar/NavState"
import { StatusBadge } from "components/StatusBadge"
import { TOC } from "components/TOC"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React, { useRef } from "react"
import { Helmet } from "react-helmet"
import { Provider as StateProvider } from "unstated"
import { getEditUrl } from "utils/getEditUrl"
import { useScrollToHash } from "utils/useScrollToSection"

export default function MainLayout(props) {
  const {
    location: { pathname },
  } = props

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
        <Contents {...props} />
      </StateProvider>
    )

    // Once mounted on the client defer to StateProvider mounted within Boot.
  } else {
    return <Contents {...props} />
  }
}

const Contents = (props) => {
  const contentRef = useRef<HTMLDivElement>()
  const {
    data: {
      mdx: {
        body,
        fileAbsolutePath,
        headings,
        frontmatter: { name, status, type },
      },
    },
    location: { hash },
  } = props

  useScrollToHash({
    contentRef,
    hash,
  })

  const { theme } = useTheme()
  const editUrl = getEditUrl(fileAbsolutePath)

  return (
    <Flex maxWidth={theme.breakpoints.md} margin="0 auto" position="relative">
      <Helmet defaultTitle="Palette" titleTemplate="%s | Palette">
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

        <Box
          width="75%"
          height="100vh"
          overflowY="scroll"
          ref={contentRef as any}
        >
          <Flex
            className="DocSearch-content"
            flexDirection="column"
            overflowX="scroll"
            minHeight="100%"
            pt={4}
            px={6}
          >
            {type !== "page" && (
              <Flex mb={2} justifyContent="space-between" alignItems="center">
                <Text
                  as="h1"
                  variant="xl"
                  color="black100"
                  className="DocSearch-lvl1"
                >
                  {name} {status && <StatusBadge status={status} />}
                </Text>
                <Flex alignItems="center" position="relative">
                  <a
                    href={editUrl}
                    style={{ display: "flex", textDecoration: "none" }}
                    target="_blank"
                  >
                    <EditIcon top="-1px" />
                    <Text variant="xs" ml={0.5}>
                      Edit
                    </Text>
                  </a>
                </Flex>
              </Flex>
            )}

            <MDXRenderer>{body}</MDXRenderer>

            <Box width="25%" pt={12} pl={2} position="fixed" right={-100}>
              <TOC headings={headings} />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}

/**
 * Query for data for the page. Note that $id is injected in via context from
 * actions.createPage. See gatsby-node.js for more info.
 */
export const pageQuery = graphql`
  query DocsLayoutQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      fileAbsolutePath
      headings {
        value
      }
      frontmatter {
        name
        status
        type
        lastPointOfContact
      }
      body
    }
  }
`
