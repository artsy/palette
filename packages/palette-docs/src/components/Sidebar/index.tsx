import { ArtsyMarkBlackIcon, Box, Flex, Text } from "@artsy/palette"
import { Link } from "gatsby"
import React from "react"
import { NavTree } from "./NavTree"
import { SearchBox } from "./SearchBox"

export const Sidebar = (_props) => {
  return (
    <Box pl={2} pt={4} height="100vh" width="100%" overflowY="scroll">
      <Link to="/" className="noUnderline" style={{ textDecoration: "none" }}>
        <Flex alignItems="center">
          <Box mr={1}>
            <ArtsyMarkBlackIcon width="40px" height="40px" />
          </Box>
          <Text variant="lg" top="-3px" position="relative">
            Palette
          </Text>
        </Flex>
      </Link>

      <Box my={2}>
        <SearchBox />
      </Box>

      <Box mt={2} mb={4}>
        <NavTree />
      </Box>
    </Box>
  )
}
