import {
  Box,
  BoxProps,
  Column,
  EditIcon,
  Flex,
  GridColumns,
  IconButton,
  Spacer,
  Text,
  useTheme,
} from "@artsy/palette"
import { GlobalStyles } from "components/GlobalStyles"
import { MetaTags } from "components/MetaTags"
import { Sidebar } from "components/Sidebar"
import { NavState } from "components/Sidebar/NavState"
import { StatusBadge } from "components/StatusBadge"
import { TableOfContents } from "components/TableOfContents"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React, { useRef } from "react"
import { FC } from "react"
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
    <>
      <GlobalStyles />
      <Box ref={contentRef as any}>
        <MetaTags title={name} />

        <Box maxWidth={theme.breakpoints.md} margin="0 auto" px={[2, 4]}>
          <GridColumns>
            <Column
              span={3}
              position="sticky"
              top={0}
              height="100vh"
              overflowY="auto"
              borderRight="1px solid"
              borderColor="black10"
              pr={2}
              py={4}
              display={["none", "block"]}
            >
              <Sidebar />
            </Column>

            <Column span={7} py={4}>
              <Box className="DocSearch-content">
                {showTitle && (
                  <TitleArea
                    name={name}
                    source={source}
                    status={status}
                    editUrl={editUrl}
                    mb={4}
                  />
                )}

                <MDXRenderer>{body}</MDXRenderer>
              </Box>
            </Column>

            <Column
              span={2}
              position="sticky"
              top={0}
              height="100vh"
              overflowY="auto"
              py={4}
              display={["none", "block"]}
              borderLeft="1px solid"
              borderColor="black10"
              pl={2}
            >
              <TableOfContents headings={headings} />
            </Column>
          </GridColumns>
        </Box>
      </Box>
    </>
  )
}

const TitleArea: FC<
  BoxProps & { name: string; source: string; status: any; editUrl: string }
> = ({ name, source, status, editUrl, ...rest }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      {...rest}
    >
      <Text as="h1" variant="xl" className="DocSearch-lvl1">
        {name} {status && <StatusBadge status={status} />}
      </Text>

      <Flex alignItems="center">
        {source && (
          <>
            <ViewSourceButton source={source} />
            <Spacer ml={1} />
          </>
        )}

        <EditButton editUrl={editUrl} />
      </Flex>
    </Flex>
  )
}

const EditButton = ({ editUrl }) => {
  return (
    <IconButton
      variant="secondaryOutline"
      size="small"
      icon={<EditIcon fill="currentColor" />}
      // @ts-ignore
      as="a"
      target="_blank"
      href={editUrl}
    >
      Edit
    </IconButton>
  )
}

const VIEW_SOURCE_BASE_URL =
  "https://github.com/artsy/palette/tree/main/packages/palette/src"

export const ViewSourceButton = ({ source }) => {
  return (
    <IconButton
      variant="secondaryOutline"
      size="small"
      icon={<FaGithub fill="currentColor" />}
      // @ts-ignore
      as="a"
      target="_blank"
      href={`${VIEW_SOURCE_BASE_URL}/${source}`}
    >
      Source
    </IconButton>
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
