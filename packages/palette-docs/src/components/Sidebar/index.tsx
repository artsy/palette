import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { NavTree } from "./NavTree"

import { ArtsyMarkBlackIcon, Box, Sans, Serif } from "@artsy/palette"
import { SearchBox } from "./SearchBox"

export const Sidebar = _props => {
  return (
    <Container pl={2} pt={4}>
      <Link to="/" className="noUnderline">
        <Serif size="4">Palette</Serif>
      </Link>

      <SearchBox />
      <Box mt={2} mb={4}>
        <NavTree />
      </Box>

      <Box>
        <ArtsyMarkBlackIcon width="30px" height="30px" mr={2} />
        <Sans size="1" color="black60">
          2020 Artsy
        </Sans>
      </Box>
    </Container>
  )
}

const Container = styled(Box)`
  flex: 0 0 200px;
  height: 100vh;
`
