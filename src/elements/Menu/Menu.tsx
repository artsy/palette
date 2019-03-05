import React from "react"
import styled from "styled-components"

import { color } from "../../helpers/color"
import { BorderBox } from "../BorderBox"
import { Box, BoxProps } from "../Box"
import { Flex } from "../Flex"
import { Separator } from "../Separator"
import { Spacer } from "../Spacer"
import { Sans } from "../Typography"

interface MenuProps {
  title?: string
  children?: React.ReactNode
}

export const Menu: React.FC<MenuProps> = ({ title, children, ...props }) => {
  return (
    <MenuContainer width={230} m="2px" {...props}>
      <BorderBox p={0} pb={1}>
        <Flex flexDirection="column" width="100%">
          {title && (
            <Box px={2} pt={2} pb={1}>
              <Sans size="3" weight="medium">
                {title}
              </Sans>
              <Spacer py={0.5} />
              <Separator />
            </Box>
          )}

          <Box pt={title ? 0 : 1}>{children}</Box>
        </Flex>
      </BorderBox>
    </MenuContainer>
  )
}

const MenuContainer = styled(Box)`
  background-color: white;
  box-shadow: 2px 2px 4px 2px ${color("black5")};
`

// Menu Item

interface MenuItemProps extends BoxProps {
  children: React.ReactNode
  href: string
  color?: string // TODO:  Look into type conflict with styled-system
}

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  href,
  ...props
}) => {
  return (
    <MenuLink href={href} {...props}>
      <Box px={2} py={1}>
        <Sans size="2" weight="medium">
          {children}
        </Sans>
      </Box>
    </MenuLink>
  )
}

const MenuLink = styled.a`
  cursor: pointer;
  display: flex;
  text-decoration: none;
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    background-color: ${color("black5")};
  }

  ${Sans} {
    display: flex;
    align-items: center;
  }
`
