import { themeGet } from "@styled-system/theme-get"
import React, { FC } from "react"
import { FocusOn } from "react-focus-on"
import styled, { css } from "styled-components"
import { zIndex } from "styled-system"
import { usePortal } from "../../utils/usePortal"
import { Box } from "../Box"
import { Flex } from "../Flex"

export interface DrawerProps {
  open: boolean
  anchor?: "left" | "right"
  zIndex?: number
  onClose?(): void
}

export const Drawer: FC<React.PropsWithChildren<DrawerProps>> = ({
  children,
  anchor = "right",
  zIndex = DEFAULT_DRAWER_Z_INDEX,
  open,
  onClose,
}) => {
  const { createPortal } = usePortal()

  return createPortal(
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
          backgroundColor="mono0"
          height="100%"
          width={["100%", "auto"]}
          overflowX="hidden"
          overflowY="scroll"
          anchor={anchor}
          zIndex={zIndex}
          transition={
            open
              ? "transform .6s cubic-bezier(0.190, 1.000, 0.220, 1.000)" // easeOutExpo
              : "transform 1s cubic-bezier(0.075, 0.820, 0.165, 1.000)" // easeOutCirc
          }
          style={{
            transform: open
              ? "none"
              : `translateX(${anchor === "left" ? "-110%" : "110%"})`,
          }}
        >
          {children}
        </Content>
      </Focus>

      <Overlay
        display={["none", "flex"]}
        onClick={onClose}
        data-testid="drawer-overlay"
        width="inherit"
        style={{
          opacity: open ? 1 : 0,
        }}
      />
    </Container>
  )
}

const DEFAULT_DRAWER_Z_INDEX = 1

const Content = styled(Box)<
  Pick<DrawerProps, "anchor"> & { transition: string }
>`
  position: absolute;
  top: 0;
  -webkit-overflow-scrolling: touch;

  ${(props) => css`
    transition: ${props.transition};
  `}

  ${(props) => css`
    ${props.anchor === "left" ? "left: 0;" : "right: 0;"}
  `};
`

const Overlay = styled(Box)`
  height: 100%;
  background: ${themeGet("effects.backdrop")};
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
