import React from "react"
import { Helmet } from "react-helmet"

export const MetaTags = ({ title }) => {
  return (
    <Helmet defaultTitle="Palette" titleTemplate="%s | Palette">
      <title>{title}</title>
      <link
        href="https://webfonts.artsy.net/all-webfonts.css"
        rel="stylesheet"
        type="text/css"
      />
      <meta name="docsearch:language" content="en" />
      <meta name="docsearch:version" content="1.0.0" />
    </Helmet>
  )
}
