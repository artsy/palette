import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { NavTree } from "./NavTree"

import { ArtsyMarkIcon, Box, Sans, Serif } from "@artsy/palette"

export const Sidebar = _props => {
  return (
    <Container pl={2} pt={4}>
      <Link to="/" className="noUnderline">
        <Serif size="4">Palette</Serif>
      </Link>

      <Box mt={2} mb={4}>
        <NavTree />
      </Box>

      <Box>
        <ArtsyMarkIcon width="30px" height="30px" mr={2} />
        <Sans size="1" color="black60">
          Updated: Feb 1st, 2019
        </Sans>
      </Box>
    </Container>
  )
}

const Container = styled(Box)`
  flex: 0 0 200px;
  height: 100vh;
`
