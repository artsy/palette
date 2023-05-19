import React, { FC } from "react"
import { Box, Flex } from "@artsy/palette"
import styled, { css, keyframes } from "styled-components"
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
  if (!open) {
    return null
  }

  return (
    <Container zIndex={zIndex} anchor={anchor}>
      <Focus onClickOutside={onClose}>
        <Content
          backgroundColor="white100"
          height="100%"
          width={["100%", "auto"]}
          overflowX="hidden"
          overflowY="scroll"
          anchor={anchor}
          zIndex={zIndex}
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
      />
    </Container>
  )
}

const DEFAULT_DRAWER_Z_INDEX = 9999

const slideLeftToRight = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`

const slideRightToLeft = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.5;
  }
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

const Content = styled(Box)<Pick<DrawerProps, "anchor">>`
  position: absolute;
  top: 0;

  animation-duration: 200ms;
  animation-name: ${(props) =>
    props.anchor === "left" ? slideLeftToRight : slideRightToLeft};
  animation-timing-function: cubic-bezier(
    0.075,
    0.82,
    0.165,
    1
  ); /* easeOutCirc */

  ${(props) => {
    return css`
      ${props.anchor === "left" ? "left: 0;" : "right: 0;"};
    `
  }}
`

const Overlay = styled(Box)`
  opacity: 0.5;
  pointer-events: auto;

  animation-duration: 150ms;
  animation-name: ${fadeIn};
  animation-timing-function: ease-in-out;
`

const Focus = styled(FocusOn)`
  height: 100%;
  align-items: center;
  justify-content: center;
`
