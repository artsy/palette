import { Flex } from "@artsy/palette"
import { ContentArea } from "components/ContentArea"
import { Sidebar } from "components/Sidebar"
import React from "react"

const Layout = _props => {
  return (
    <Flex p={2}>
      <Sidebar />
      <ContentArea />
    </Flex>
  )
}

export default Layout
