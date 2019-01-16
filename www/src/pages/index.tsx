import { Link } from "gatsby"
import React from "react"

import { Layout } from "layout/components/Layout"

const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1>
    <Link to="/PageTwo/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
