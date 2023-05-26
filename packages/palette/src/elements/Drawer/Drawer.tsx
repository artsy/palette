import React, { FC } from "react"
import { Box } from "../Box"
import { Flex } from "../Flex"
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
  return (
    <Container
      zIndex={zIndex}
      anchor={anchor}
      style={{
        pointerEvents: open ? "auto" : "none",
        transform: open ? "translateX(0)" : "none",
      }}
    >
      <Focus onClickOutside={onClose} enabled={open} onEscapeKey={onClose}>
        <Content
          backgroundColor="white100"
          height="100%"
          width={["100%", "auto"]}
          overflowX="hidden"
          overflowY="scroll"
          anchor={anchor}
          zIndex={zIndex}
          style={{
            transform: open
              ? "translateX(0)"
              : `translateX(${anchor === "left" ? "-100%" : "100%"})`,
          }}
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
        style={{
          opacity: open ? "0.5" : "0",
        }}
      />
    </Container>
  )
}

const DEFAULT_DRAWER_Z_INDEX = 1

const Content = styled(Box)<Pick<DrawerProps, "anchor">>`
  position: absolute;
  top: 0;
  transition: transform 200ms cubic-bezier(0.075, 0.82, 0.165, 1);
  -webkit-overflow-scrolling: touch;

  ${(props) => css`
    ${props.anchor === "left" ? "left: 0;" : "right: 0;"}
  `};
`

const Overlay = styled(Box)`
  transition: opacity 150ms linear 50ms;
`

const Container = styled(Flex)<Pick<DrawerProps, "anchor">>`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${zIndex}
  position: fixed;

  ${(props) => {
    return css`
      flex-direction: ${props.anchor === "left" ? "row" : "row-reverse"};
    `
  }}
`

const Focus = styled(FocusOn)`
  height: 100%;
  align-items: center;
  justify-content: center;
`
