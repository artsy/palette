import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { Position, usePosition } from "../../utils"
import { usePortal } from "../../utils/usePortal"
import { Box, BoxProps } from "../Box"
import { FocusOn } from "react-focus-on"
import { themeGet } from "@styled-system/theme-get"

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

export interface DropdownProps extends BoxProps {
  placement?: Position
  /** Intially visible by default? */
  visible?: boolean
  /** Whether or not we should animate the dropdown transition */
  transition?: boolean
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
  openDropdownByClick?: boolean
  children: (dropdownActions: DropdownActions) => JSX.Element
}

/**
 * A `Dropdown` is a small modal-type element which is anchored, and can be
 * positioned relative to, another element and designed to be transitioned in on hover or on click.
 */
export const Dropdown: React.FC<React.PropsWithChildren<DropdownProps>> = ({
  placement = "top",
  visible: _visible = false,
  keepInDOM,
  children,
  offset = 10,
  dropdown,
  openDropdownByClick,
  transition: _transition = true,
  ...rest
}) => {
  const [visible, setVisible] = useState(false)

  // If prop updates/set initial visibility.
  useEffect(() => {
    setVisible(_visible)
  }, [_visible])

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // We need to keep the pointer state in sync with the visibility state, else we
  // wind up with focus isolation out of sync.
  const setVisibility = useCallback(
    ({
      visible,
      isPointer = false,
    }: {
      visible: boolean
      isPointer?: boolean
    }) => {
      const delay = _transition ? (visible ? 50 : 150) : visible ? 1 : 50

      timeoutRef.current && clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        if (!visible && activeRef.current) return
        pointerRef.current = isPointer
        setVisible(visible)
      }, delay)
    },
    [_transition]
  )

  const onVisible = () => {
    setVisibility({ visible: true })
  }

  const onHide = useCallback(() => {
    setVisibility({ visible: false })
  }, [setVisibility])

  const onToggleVisibility = () => {
    if (visible) {
      return onHide()
    }

    onVisible()
  }

  const {
    anchorRef,
    tooltipRef: panelRef,
    state: { isFlipped },
  } = usePosition({
    position: placement,
    offset: 0,
    active: visible,
  })

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

    const handleClick = (event: MouseEvent) => {
      if (!panelRef.current || !openDropdownByClick) return
      const target = event.target as Element
      const tagName = target.tagName.toLowerCase()
      let isClosableElement = tagName === "a"
      let element: Element | null = target

      // Find parent link element
      if (!isClosableElement) {
        element = target.closest("a")
        isClosableElement = !!element
      }

      if (isClosableElement && element && panelRef.current.contains(element)) {
        onHide()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
      document.removeEventListener("click", handleClick)
    }
  }, [panelRef, openDropdownByClick, onHide])

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
        return { [isFlipped ? "pt" : "pb"]: offset }
      case "bottom-start":
      case "bottom":
      case "bottom-end":
        return { [isFlipped ? "pb" : "pt"]: offset }
      case "left-start":
      case "left":
      case "left-end":
        return { [isFlipped ? "pl" : "pr"]: offset }
      case "right-start":
      case "right":
      case "right-end":
        return { [isFlipped ? "pr" : "pl"]: offset }
    }
  }, [placement, isFlipped, offset])

  const pointerRef = useRef(false)

  const handlePointerVisible = () => {
    setVisibility({ visible: true, isPointer: true })
  }

  const handlePointerHide = () => {
    setVisibility({ visible: false, isPointer: false })
  }

  const anchorProps: React.HTMLAttributes<HTMLElement> = {
    "aria-expanded": visible,
    "aria-haspopup": true,
    ...(openDropdownByClick
      ? {
          onClick: onToggleVisibility,
        }
      : {
          onMouseEnter: handlePointerVisible,
          onMouseLeave: handlePointerHide,
          onClick: onVisible,
        }),
  }

  const { createPortal } = usePortal()

  const isPointer = !openDropdownByClick && pointerRef.current
  const focusEnabled = visible && !isPointer

  return (
    <>
      {children({
        anchorRef: anchorRef as any,
        anchorProps,
        onVisible,
        onHide,
        setVisible,
        visible,
      })}

      {(visible || keepInDOM) &&
        createPortal(
          <Container
            aria-label="Press escape to close"
            tabIndex={0}
            ref={panelRef as any}
            zIndex={1}
            display="inline-block"
            placement={placement}
            style={{
              ...(keepInDOM
                ? { visibility: visible ? "visible" : "hidden" }
                : {}),
            }}
            {...(openDropdownByClick
              ? {}
              : {
                  onMouseEnter: handleMouseEnter,
                  onMouseLeave: handleMouseLeave,
                })}
            {...padding}
            {...rest}
          >
            <Panel
              bg="white100"
              border="1px solid"
              borderColor="black10"
              transition={_transition}
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
              <FocusOn
                noIsolation
                enabled={focusEnabled}
                onClickOutside={onHide}
              >
                {typeof dropdown === "function"
                  ? dropdown({ onVisible, onHide, setVisible, visible })
                  : dropdown}
              </FocusOn>
            </Panel>
          </Container>
        )}
    </>
  )
}

const Container = styled(Box)<{ placement: Position } & BoxProps>`
  position: fixed;
  text-align: left;
  outline: 0;
`

const Panel = styled(Box)<{ transition: boolean }>`
  transition: ${({ transition }) =>
    transition ? "opacity 250ms ease-out, transform 250ms ease-out" : "none"};
  box-shadow: ${themeGet("effects.flatShadow")};
  > div {
    max-height: 100vh;
    overflow-y: auto;
  }
`
