import { Flex } from "@artsy/palette"
import { ContentArea } from "app/components/ContentArea"
import { Sidebar } from "app/components/Sidebar"
import React from "react"

export default function Layout({ children }) {
  return (
    <Flex p={2}>
      <Sidebar />
      <Flex flexDirection="column" pt={4} mx={6} width="100%">
        <ContentArea>
          {children}
          <br />
          <br />
        </ContentArea>
      </Flex>
    </Flex>
  )
}
