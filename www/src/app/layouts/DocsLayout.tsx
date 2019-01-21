import { Flex, Serif } from "@artsy/palette"
import { Sidebar } from "app/components/Sidebar"
import { StatusBadge } from "app/components/StatusBadge"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import React from "react"
import styled from "styled-components"

export default function DocsLayout(props) {
  const {
    data: {
      mdx: {
        code,
        frontmatter: { name, wip },
      },
    },
  } = props

  return (
    <Container>
      <Sidebar />
      <ContentArea>
        <ComponentName name={name} wip={wip} />
        <MDXRenderer>{code.body}</MDXRenderer>
      </ContentArea>
      {/*
      <Layout>
        <MDXRenderer>{code.body}</MDXRenderer>
      </Layout>
      */}
    </Container>
  )
}

const Container = styled(Flex)``

const ContentArea = styled(Flex).attrs({
  flexDirection: "column",
  pt: 4,
  px: 6,
})`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: scroll;
`

const ComponentName = ({ name, wip }) => {
  return (
    <Serif size="8" color="black100">
      {name} {wip && <StatusBadge status="WIP" />}
    </Serif>
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
      frontmatter {
        name
        wip
      }
      code {
        body
      }
    }
  }
`
