import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { NavTree } from "./NavTree"

import { ArtsyMarkBlackIcon, Box, Flex, Text } from "@artsy/palette"
import { SearchBox } from "./SearchBox"

export const Sidebar = (_props) => {
  return (
    <Container pl={2} pt={4}>
      <Link to="/" className="noUnderline">
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

      <Box>
        <Box mr={2}>
          <ArtsyMarkBlackIcon width="30px" height="30px" />
        </Box>
        <Text variant="xs" color="black60">
          2020 Artsy
        </Text>
      </Box>
    </Container>
  )
}

const Container = styled(Box)`
  flex: 0 0 200px;
  height: 100vh;
`
