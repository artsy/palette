import { ArtsyMarkBlackIcon, Box, Flex, Text } from "@artsy/palette"
import { Link } from "gatsby"
import React from "react"
import { NavTree } from "./NavTree"
import { SearchBox } from "./SearchBox"

export const Sidebar = () => {
  return (
    <>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Flex alignItems="center">
          <ArtsyMarkBlackIcon width={40} height={40} mr={2} />

          <Text variant="xl">Palette</Text>
        </Flex>
      </Link>

      <Box my={2}>
        <SearchBox />
      </Box>

      <Box mt={2}>
        <NavTree />
      </Box>
    </>
  )
}
