import React from "react"
import styled from "styled-components"

import {
  ArtsyMarkIcon,
  Box,
  color,
  Flex,
  Sans,
  Serif,
  Spacer,
} from "@artsy/palette"

const Layout = props => {
  return (
    <Container p={2}>
      <Sidebar width={180} pl={2}>
        <Box mb={2}>
          <Serif size="4">Palette</Serif>
        </Box>

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
            <SubNavItem>Tooltip</SubNavItem>
            <SubNavItem>Popover</SubNavItem>
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
      </Sidebar>
      <ContentArea>
        <Serif size="8" color="black100">
          Textfields
        </Serif>
      </ContentArea>
    </Container>
  )
}

const Container = Flex

const Sidebar = styled(Box)`
  border-right: 1px solid ${color("black60")};
`

const ContentArea = styled(Box).attrs({
  pt: 6,
  pl: 6,
})``

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

export default Layout
