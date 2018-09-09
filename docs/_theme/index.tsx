import { DocPreview, theme } from "docz"
import React from "react"

import { Sans, Serif, Spinner, Theme as PaletteTheme } from "../../src"
import { Sidebar } from "./Sidebar"

const Theme = () => (
  <PaletteTheme>
    <>
      <Sidebar />
      <DocPreview
        components={{
          // page: components.Page,
          // notFound: components.NotFound,
          // render: components.Render,
          h1: props => <Serif size="12" {...props} />,
          h2: props => <Serif size="10" {...props} />,
          h3: props => <Serif size="8" {...props} />,
          h4: props => <Serif size="6" {...props} />,
          // h5: components.H5,
          // h6: components.H6,
          // ul: components.List,
          loading: props => <Spinner {...props} />,
          // table: components.Table,
          // pre: components.Pre,
          // inlineCode: components.Code,
        }}
      />
    </>
  </PaletteTheme>
)

export default theme({})(Theme)
