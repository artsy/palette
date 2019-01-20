import Layout from "app/components/Layout"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import React from "react"

export default function DocsTemplate(props) {
  const {
    data: { mdx },
  } = props

  return (
    <Layout>
      <MDXRenderer>{mdx.code.body}</MDXRenderer>
    </Layout>
  )
}

/**
 * Query for data for the page. Note that $id is injected in via context from
 * actions.createPage. See gatsby-node.js for more info.
 */
export const pageQuery = graphql`
  query DocsTemplateQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`
