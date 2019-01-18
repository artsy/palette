import { Flex } from "@artsy/palette"
import { ContentArea } from "components/ContentArea"
import { Sidebar } from "components/Sidebar"
import React from "react"

const Layout = ({ children }) => {
  return (
    <Flex p={2}>
      <Sidebar />
      <ContentArea />
      {children}
    </Flex>
  )
}

export default Layout
