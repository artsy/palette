import { graphql, StaticQuery } from "gatsby"
import React from "react"

import { Header } from "layout/components/Header"

export const Layout = ({ children }) => (
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
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div>
          {children}
          <footer>Add footer</footer>
        </div>
      </>
    )}
  />
)
