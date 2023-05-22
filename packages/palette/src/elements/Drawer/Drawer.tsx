import React, { FC } from "react"
import { Box, Flex } from "@artsy/palette"
import styled, { css } from "styled-components"
import { zIndex } from "styled-system"
import { FocusOn } from "react-focus-on"

export interface DrawerProps {
  open: boolean
  anchor?: "left" | "right"
  zIndex?: number
  onClose?(): void
}

export const Drawer: FC<DrawerProps> = ({
  children,
  anchor = "right",
  zIndex = DEFAULT_DRAWER_Z_INDEX,
  open,
  onClose,
}) => {
  const openClass = open ? "open" : ""

  return (
    <Container zIndex={zIndex} anchor={anchor} className={openClass}>
      <Focus onClickOutside={onClose} enabled={open} onEscapeKey={onClose}>
        <Content
          backgroundColor="white100"
          height="100%"
          width={["100%", "auto"]}
          overflowX="hidden"
          overflowY="scroll"
          anchor={anchor}
          zIndex={zIndex}
          className={openClass}
        >
          {children}
        </Content>
      </Focus>

      <Overlay
        backgroundColor="black100"
        height="100%"
        display={["none", "flex"]}
        onClick={onClose}
        data-testid="drawer-overlay"
        width="inherit"
        className={openClass}
      />
    </Container>
  )
}

const DEFAULT_DRAWER_Z_INDEX = 1

const Container = styled(Flex)<Pick<DrawerProps, "anchor">>`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${zIndex}
  position: fixed;
  pointer-events: none;

  ${(props) => {
    return css`
      flex-direction: ${props.anchor === "left" ? "row" : "row-reverse"};
    `
  }}

  &.open {
    pointer-events: auto;
  }
`

const Content = styled(Box)<Pick<DrawerProps, "anchor">>`
  position: absolute;
  top: 0;
  transition: transform 200ms cubic-bezier(0.075, 0.82, 0.165, 1);
  -webkit-overflow-scrolling: touch;

  ${(props) => css`
    ${props.anchor === "left" ? "left: 0;" : "right: 0;"}
    transform: translateX(${props.anchor === "left" ? "-100%" : "100%"});
  `};

  &.open {
    transform: translateX(0);
  }
`

const Overlay = styled(Box)`
  opacity: 0;
  transition: opacity 150ms linear 50ms;

  &.open {
    opacity: 0.5;
  }
`

const Focus = styled(FocusOn)`
  height: 100%;
  align-items: center;
  justify-content: center;
`
