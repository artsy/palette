import { ArtsyMarkIcon, Box, color, Sans, Serif, Spacer } from "@artsy/palette"
import { StatusBadge } from "components/StatusBadge"
import React from "react"
import styled from "styled-components"

export const Sidebar = _props => {
  return (
    <Container>
      <Serif size="4">Palette</Serif>

      <Spacer mb={2} />

      <Box>
        <NavItem>Home</NavItem>
        <NavItem>Changelog</NavItem>
      </Box>

      <Box>
        <NavItem>Tokens</NavItem>
        <NavItem>Elements</NavItem>
      </Box>

      <Box>
        <NavItem>Forms</NavItem>
        <NavItem>Navigation</NavItem>
        <NavItem>Dialogs</NavItem>

        <SubNavItems>
          <SubNavItem>Modal</SubNavItem>
          <SubNavItem>
            Tooltip <StatusBadge status="WIP" />
          </SubNavItem>
          <SubNavItem>
            Popover <StatusBadge status="WIP" />
          </SubNavItem>
          <SubNavItem>Alert Banner</SubNavItem>
        </SubNavItems>
      </Box>

      <Box>
        <NavItem>Content</NavItem>
        <NavItem>Functions</NavItem>
        <NavItem>Dialogs</NavItem>
      </Box>

      <Spacer my={4} />

      <Box>
        <ArtsyMarkIcon width="30px" height="30px" mr={2} />
        <Sans size="1" color="black60">
          Updated: Sept 3, 2018
        </Sans>
      </Box>
    </Container>
  )
}

const Container = styled(Box).attrs({
  pl: 2,
})`
  border-right: 1px solid ${color("black10")};
  flex: 0 0 180px;
`

const NavItem = styled(Sans).attrs({
  size: "3",
  py: 0.2,
})``

const SubNavItems = styled(Box).attrs({
  ml: 2,
})``

const SubNavItem = styled(Sans).attrs({
  size: "2",
  py: 0.3,
})``
