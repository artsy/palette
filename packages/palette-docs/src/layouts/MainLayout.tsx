import { Box, Clickable, EditIcon, Flex, Text, useTheme } from "@artsy/palette"
import { MetaTags } from "components/MetaTags"
import { Sidebar } from "components/Sidebar"
import { NavState } from "components/Sidebar/NavState"
import { StatusBadge } from "components/StatusBadge"
import { TableOfContents } from "components/TableOfContents"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React, { useRef } from "react"
import { FaGithub } from "react-icons/fa"
import { Provider as StateProvider } from "unstated"
import { getEditUrl } from "utils/getEditUrl"
import { useScrollToHash } from "utils/useScrollToSection"

export default function MainLayout(props) {
  const {
    location: { pathname },
  } = props

  /**
   * NOTE:
   *
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
        <Layout {...props} />
      </StateProvider>
    )

    // Once mounted on the client defer to StateProvider mounted within Boot.
  } else {
    return <Layout {...props} />
  }
}

const Layout = (props) => {
  const contentRef = useRef<HTMLDivElement>()
  const {
    data: {
      mdx: {
        body,
        fileAbsolutePath,
        headings,
        frontmatter: { name, source, status, type },
      },
    },
    location: { hash },
  } = props

  // Listen for url bar updates and if a hash is seen, scroll to it
  useScrollToHash({
    contentRef,
    hash,
  })

  const { theme } = useTheme()
  const editUrl = getEditUrl(fileAbsolutePath)
  const showTitle = type !== "page"

  return (
    <Box ref={contentRef as any}>
      <MetaTags title={name} />

      <Flex maxWidth={theme.breakpoints.md} margin="0 auto">
        <SidebarArea />

        <Box
          className="DocSearch-content"
          width={["100%", "80%", "60%"]}
          px={6}
          pt={4}
          mb={4}
        >
          {showTitle && (
            <TitleArea
              name={name}
              source={source}
              status={status}
              editUrl={editUrl}
            />
          )}

          <MDXRenderer>{body}</MDXRenderer>
        </Box>

        <TableOfContentsArea headings={headings} />
      </Flex>
    </Box>
  )
}

const SidebarArea = () => {
  return (
    <Box
      position="sticky"
      top={0}
      height="100vh"
      overflowY="auto"
      pl={2}
      pt={4}
      borderRight={`1px solid lightgray`}
      width={[0, "21%"]}
      display={["none", "block"]}
    >
      <Sidebar />
    </Box>
  )
}

const TitleArea = ({ name, source, status, editUrl, ...rest }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      mb={4}
    >
      <Text
        as="h1"
        variant="xl"
        color="black100"
        className="DocSearch-lvl1"
        width="100%"
        {...rest}
      >
        {name} {status && <StatusBadge status={status} />}
      </Text>
      <Flex alignItems="center" position="relative" mt={1}>
        {source && <ViewSourceButton source={source} />}
        <EditButton editUrl={editUrl} />
      </Flex>
    </Flex>
  )
}

const EditButton = ({ editUrl }) => {
  return (
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
  )
}

export const ViewSourceButton = ({ source }) => {
  const BASE_URL =
    "https://github.com/artsy/palette/tree/master/packages/palette/src"

  return (
    <a
      href={`${BASE_URL}/${source}`}
      target="_blank"
      style={{ textDecoration: "none" }}
    >
      <Flex position="relative" top="3px" pr={1}>
        <Box pr={0.5}>
          <FaGithub />
        </Box>
        <Text variant="xs">Source</Text>
      </Flex>
    </a>
  )
}

const TableOfContentsArea = ({ headings }) => {
  return (
    <Box
      display={["none", "none", "block"]}
      width="20%"
      mt={0.5}
      pt={12}
      px={2}
      position="fixed"
      right={100}
      top="-1px"
    >
      <TableOfContents headings={headings} />
    </Box>
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
        source
        status
        type
        lastPointOfContact
      }
      body
    }
  }
`
