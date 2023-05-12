import React, { FC } from "react"
import { Box, Flex, breakpoints } from "@artsy/palette"
import styled, { css } from "styled-components"
import { zIndex } from "styled-system"
import { useDrawer } from "./useDrawer"

export interface DrawerProps {
  anchor?: "left" | "right"
  flexContent?: number
  flexOverlay?: number
}

export const Drawer: FC<DrawerProps> = ({
  children,
  anchor = "right",
  flexContent = 1,
  flexOverlay = 3,
}) => {
  const { isOpen, toggle } = useDrawer()
  const activeClass = isOpen ? "active" : ""

  return (
    <Container
      position="fixed"
      zIndex={9999}
      className={activeClass}
      anchor={anchor}
      isOpen={isOpen}
    >
      <Box
        flex={[1, flexContent]}
        height="100%"
        backgroundColor="white100"
        overflowY="scroll"
        className={activeClass}
      >
        {children}
      </Box>

      <Overlay
        backgroundColor="black100"
        height="100%"
        display={["none", "flex"]}
        flex={flexOverlay}
        onClick={toggle}
        className={activeClass}
        data-testid="drawer-overlay"
      />
    </Container>
  )
}

const Container = styled(Flex)<DrawerProps & { isOpen: boolean }>`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition-property: transform;
  transition-timing-function: cubic-bezier(
    0.075,
    0.82,
    0.165,
    1
  ); /* easeOutCirc */
  align-items: center;
  justify-content: center;
  ${zIndex}

  ${(props) => {
    return css`
      transform: translateX(${props.anchor === "left" ? -100 : 100}%);
      flex-direction: ${props.anchor === "left" ? "row" : "row-reverse"};
      transition-duration: ${props.isOpen ? "300ms" : "6000ms"};
      transition-delay: ${props.isOpen ? 0 : 100}ms;

      /* If the screen width is not too big a shorter delay is better */
      @media (max-width: ${breakpoints.sm}) {
        transition-duration: ${props.isOpen ? "300ms" : "600ms"};
      }
    `
  }}

  &.active {
    transform: translateX(0);
  }
`

const Overlay = styled(Box)`
  opacity: 0;
  transition: opacity 50ms ease;
  pointer-events: none;

  &.active {
    opacity: 0.5;
    pointer-events: auto;
    transition: opacity 300ms ease 200ms;
  }
`
