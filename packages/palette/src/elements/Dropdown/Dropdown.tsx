import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { calculateMaxHeight, Position, usePosition } from "../../utils"
import { usePortal } from "../../utils/usePortal"
import { Box, BoxProps } from "../Box"
import { FocusOn } from "react-focus-on"
import { themeGet } from "@styled-system/theme-get"
import { debounce } from "es-toolkit"

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

type Children =
  | React.ReactNode
  | ((dropdownActions: DropdownActions) => React.ReactNode)

export interface DropdownProps extends Omit<BoxProps, "children"> {
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
  /** Custom zIndex to assign to the dropdown panel */
  dropdownZIndex?: number
  /** Distance in pixels from anchor */
  offset?: number
  /** Should the dropdown panel always be present in the DOM (vs removed when invisible) */
  keepInDOM?: boolean
  openDropdownByClick?: boolean
  children: Children
  /** Optionally disable flipping (default: `true`) */
  flip?: boolean
  /** Whether to return focus to the previous element when the dropdown closes (default: `true`) */
  returnFocus?: boolean
}

/**
 * A `Dropdown` is a small modal-type element which is anchored, and can be
 * positioned relative to, another element and designed to be transitioned in on hover or on click.
 */
export const Dropdown = ({
  placement = "bottom",
  visible: _visible = false,
  keepInDOM,
  children,
  offset = 10,
  dropdown,
  dropdownZIndex = 1,
  openDropdownByClick,
  transition: _transition = true,
  flip = true,
  returnFocus = true,
  ...rest
}: DropdownProps) => {
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
    flip,
    padding: offset,
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
    requestAnimationFrame(() => {
      setTransition(visible)
    })
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

  const [maxHeight, setMaxHeight] = useState(0)

  useEffect(() => {
    const calculate = debounce(() => {
      if (!anchorRef.current) return

      const nextMaxHeight = calculateMaxHeight({
        anchorRect: anchorRef.current.getBoundingClientRect(),
        position: placement,
        offset,
      })

      setMaxHeight(nextMaxHeight)
    }, 500)

    window.addEventListener("resize", calculate, { passive: true })
    window.addEventListener("scroll", calculate, { passive: true })
    calculate()

    return () => {
      window.removeEventListener("resize", calculate)
      window.removeEventListener("scroll", calculate)
    }
  }, [anchorRef, offset, placement, visible])

  return (
    <>
      {(children as any)?.({
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
            zIndex={dropdownZIndex}
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
            maxHeight={maxHeight + offset}
            {...padding}
            {...rest}
          >
            <Panel
              transition={_transition}
              maxHeight={maxHeight}
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
                returnFocus={returnFocus}
              >
                <Pane maxHeight={maxHeight}>
                  {typeof dropdown === "function"
                    ? (dropdown as any)({
                        onVisible,
                        onHide,
                        setVisible,
                        visible,
                      })
                    : dropdown}
                </Pane>
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

const Panel = styled(Box)<{ transition: boolean; maxHeight: number }>`
  transition: ${({ transition }) =>
    transition ? "opacity 250ms ease-out, transform 250ms ease-out" : "none"};
`

const Pane = styled(Box)`
  > div {
    max-height: ${({ maxHeight }) => (maxHeight ? `${maxHeight}px` : "100vh")};
    box-shadow: ${themeGet("effects.flatShadow")};
    background-color: ${themeGet("colors.mono0")};
    border: 1px solid ${themeGet("colors.mono10")};
    overflow-y: auto;
  }
`
