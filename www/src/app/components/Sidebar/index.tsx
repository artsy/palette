import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { NavTree } from "./NavTree"

import { ArtsyMarkIcon, Box, color, Sans, Serif } from "@artsy/palette"

export const Sidebar = _props => {
  return (
    <Container pl={2} pt={2}>
      <Link to="/">
        <Serif size="4">Palette</Serif>
      </Link>

      <Box mt={2} mb={4}>
        <NavTree />
      </Box>

      <Box>
        <ArtsyMarkIcon width="30px" height="30px" mr={2} />
        <Sans size="1" color="black60">
          Updated: Sept 3, 2018
        </Sans>
      </Box>
    </Container>
  )
}

const Container = styled(Box)`
  border-right: 1px solid ${color("black10")};
  flex: 0 0 200px;
`
