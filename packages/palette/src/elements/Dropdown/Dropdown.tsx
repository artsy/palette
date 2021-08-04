import React, { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { FLAT_SHADOW } from "../../helpers"
import { Position, useClickOutside, usePosition } from "../../utils"
import { useUpdateEffect } from "../../utils/useUpdateEffect"
import { Box } from "../Box"

export interface DropdownActions {
  /** Call to show dropdown */
  onVisible(): void
  /** Call to hide dropdown */
  onHide(): void
  /** Manipulate visible directly */
  setVisible(value: boolean): void
  /** Pass ref to element you want the dropdown to be anchored to */
  anchorRef: React.MutableRefObject<HTMLElement>
  /** Spread props on element you want the dropdown to be anchored to */
  anchorProps: React.HTMLAttributes<HTMLElement>
  /** Whether or not the dropdown is visible */
  visible: boolean
}

export interface DropdownProps {
  title?: React.ReactNode
  placement?: Position
  /** Intially visible by default? */
  visible?: boolean
  dropdown:
    | React.ReactNode
    | ((
        dropdownActions: Pick<
          DropdownActions,
          "onHide" | "onVisible" | "setVisible" | "visible"
        >
      ) => void)
  /** Distance in pixels from anchor */
  offset?: number
  /** Should the dropdown panel always be present in the DOM (vs removed when invisible) */
  keepInDOM?: boolean
  children: (dropdownActions: DropdownActions) => JSX.Element
}

/**
 * A `Dropdown` is a small modal-type element which is anchored, and can be
 * positioned relative to, another element and designed to be transitioned in on hover.
 */
export const Dropdown: React.FC<DropdownProps> = ({
  placement = "top",
  visible: _visible = false,
  keepInDOM,
  children,
  offset = 10,
  dropdown,
}) => {
  const [visible, setVisible] = useState(false)

  // If prop updates/set initial visibility.
  useEffect(() => {
    setVisible(_visible)
  }, [_visible])

  // Yields focus back and forth between dropdown and anchor
  useUpdateEffect(() => {
    if (visible && panelRef.current) {
      panelRef.current.focus()
      return
    }

    if (!anchorRef.current) return
    anchorRef.current.focus()
  }, [visible])

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onVisible = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setVisible(true)
    }, 50)
  }

  const onHide = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      if (activeRef.current) return
      setVisible(false)
    }, 150)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onHide()
      }
    }

    // Close dropdown when focus leaves element
    const handleKeyUp = (event: KeyboardEvent) => {
      if (!panelRef.current) return

      if (
        event.key === "Tab" &&
        !(
          panelRef.current === document.activeElement ||
          panelRef.current.contains(document.activeElement)
        )
      ) {
        onHide()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  const { anchorRef, tooltipRef: panelRef } = usePosition({
    position: placement,
    offset: 0,
    active: visible,
  })

  useClickOutside({
    ref: panelRef,
    onClickOutside: onHide,
    when: visible,
    type: "click",
  })

  const activeRef = useRef(false)

  const handleMouseEnter = () => {
    activeRef.current = true
  }

  const handleMouseLeave = () => {
    activeRef.current = false
    onHide()
  }

  const [transition, setTransition] = useState(false)

  // Wait for next tick so that animation runs
  useEffect(() => {
    setTimeout(() => {
      setTransition(visible)
    }, 0)
  }, [visible])

  const translation = useMemo(() => {
    switch (placement) {
      case "top-start":
      case "top":
      case "top-end":
        return `translateY(10px)`
      case "bottom-start":
      case "bottom":
      case "bottom-end":
        return `translateY(-10px)`
      case "left-start":
      case "left":
      case "left-end":
        return `translateX(10px)`
      case "right-start":
      case "right":
      case "right-end":
        return `translateX(-10px)`
    }
  }, [placement])

  // Fills offset gap between anchor and panel to prevent mouseout
  const padding = useMemo(() => {
    switch (placement) {
      case "top-start":
      case "top":
      case "top-end":
        return { pb: offset }
      case "bottom-start":
      case "bottom":
      case "bottom-end":
        return { pt: offset }
      case "left-start":
      case "left":
      case "left-end":
        return { pr: offset }
      case "right-start":
      case "right":
      case "right-end":
        return { pl: offset }
    }
  }, [placement, offset])

  const anchorProps: React.HTMLAttributes<HTMLElement> = {
    "aria-expanded": visible,
    "aria-haspopup": true,
    onMouseEnter: onVisible,
    onMouseLeave: onHide,
    onClick: onVisible,
  }

  return (
    <>
      {children({
        anchorRef,
        anchorProps,
        onVisible,
        onHide,
        setVisible,
        visible,
      })}

      {(visible || keepInDOM) && (
        <Container
          tabIndex={0}
          ref={panelRef as any}
          zIndex={1}
          display="inline-block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          placement={placement}
          style={{
            ...(keepInDOM
              ? { visibility: visible ? "visible" : "hidden" }
              : {}),
          }}
          {...padding}
        >
          <Panel
            bg="white100"
            border="1px solid"
            borderColor="black10"
            style={
              transition
                ? // In
                  { opacity: 1, transform: "translate(0)" }
                : // Out
                  {
                    opacity: 0,
                    transform: translation,
                  }
            }
          >
            {typeof dropdown === "function"
              ? dropdown({ onVisible, onHide, setVisible, visible })
              : dropdown}
          </Panel>
        </Container>
      )}
    </>
  )
}

const Container = styled(Box)<{ placement: Position }>`
  position: fixed;
  z-index: 1;
  text-align: left;
  outline: 0;
`

const Panel = styled(Box)`
  transition: opacity 250ms ease-out, transform 250ms ease-out;
  box-shadow: ${FLAT_SHADOW};
`
