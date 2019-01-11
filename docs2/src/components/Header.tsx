import { Link } from "gatsby"
import React from "react"

export const Header = ({ siteTitle }) => (
  <div>
    <h1>
      <Link to="/">{siteTitle}</Link>
    </h1>
  </div>
)
