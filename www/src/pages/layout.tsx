import React from "react"
import styled from "styled-components"

import {
  ArtsyMarkIcon,
  Box,
  color,
  Flex,
  Sans,
  Serif,
  space,
  Spacer,
  Tab,
  Tabs,
  Toggle,
} from "@artsy/palette"

import { StatusBadge } from "components/StatusBadge"

const Layout = _props => {
  return (
    <Container p={2}>
      <Sidebar>
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
      </Sidebar>
      <ContentArea>
        <InnerContent>
          <Serif size="8" color="black100">
            Textfields <StatusBadge status="WIP" />
          </Serif>

          <Spacer mb={3} />

          <Tabs>
            <Tab name="Code">
              <Sans size="4" weight="medium">
                Usage
              </Sans>
              <Sans size="3">
                Lorem ipsum copy here. Lorem ipsum copy here. Lorem ipsum copy
                here. Lorem ipsum copy here. Lorem ipsum copy here. Lorem ipsum
                copy here. Lorem ipsum copy here.
              </Sans>
              <PropsTable>
                <thead>
                  <tr>
                    <THead>Prop</THead>
                    <THead>Type</THead>
                    <THead>Description</THead>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Base</td>
                    <td>Bool</td>
                    <td>Select open state</td>
                  </tr>
                  <tr>
                    <td>Base</td>
                    <td>Bool</td>
                    <td>Select open state</td>
                  </tr>
                  <tr>
                    <td>Base</td>
                    <td>Bool</td>
                    <td>Select open state</td>
                  </tr>
                </tbody>
              </PropsTable>

              <Box mt={4} mb={2}>
                <Sans size="4" weight="medium">
                  Usage
                </Sans>
              </Box>

              <Toggle label="Without label" expanded>
                <Sans size="3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Sans>
              </Toggle>
              <Toggle label="With label" expanded>
                <Sans size="3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Sans>
              </Toggle>
            </Tab>
            <Tab name="Guidelines">Guidelines</Tab>
            <Tab name="Notes">Notes</Tab>
          </Tabs>
        </InnerContent>
      </ContentArea>
    </Container>
  )
}

const Container = Flex

const Sidebar = styled(Box).attrs({
  pl: 2,
})`
  border-right: 1px solid ${color("black10")};
  flex: 0 0 180px;
`

const ContentArea = styled(Box).attrs({
  pt: 4,
  px: 6,
})`
  margin: 0 auto;
  flex-grow: 1;
`

const InnerContent = styled(Box).attrs({
  width: "100%",
  maxWidth: 1192,
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

const PropsTable = styled.table`
  margin-top: ${space(2)}px;
  width: 100%;
  border-collapse: collapse;
  border-bottom: 1px solid ${color("black30")};

  th {
    text-align: left;
    padding: ${space(0.5)}px 0 ${space(0.5)}px 0;
  }

  tr {
    border: 1px solid ${color("black30")};
    border-width: 1px 0;

    &:last-child {
      border: 0;
    }
  }

  td {
    font-family: Menlo;
    font-size: 12px;
    color: ${color("black60")};
    padding: ${space(0.5)}px 0 ${space(0.5)}px 0;
  }
`

const THead = ({ children }) => {
  return (
    <th>
      <Sans size="2" weight="medium">
        {children}
      </Sans>
    </th>
  )
}

export default Layout
