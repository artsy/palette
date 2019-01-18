import { Flex } from "@artsy/palette"
import { ContentArea } from "components/ContentArea"
import { Header } from "components/Header"
import { Sidebar } from "components/Sidebar"
import { graphql, Link, StaticQuery } from "gatsby"
import React from "react"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => {
      return (
        <>
          <Header title={data.site.siteMetadata.title} />
          <Link to="/">Go back to the homepage</Link>
          <Flex p={2}>
            <Sidebar />
            <ContentArea />
            {children}
          </Flex>
        </>
      )
    }}
  />
)

export default Layout
