import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import {
  useHover,
  useClick,
  useDismiss,
  useInteractions,
  safePolygon,
} from "@floating-ui/react"
import { calculateMaxHeight, Position, usePosition } from "../../utils"
import { useDidMount } from "../../utils/useDidMount"
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
  /** Delay in milliseconds before showing the dropdown on hover (ignored when openDropdownByClick is true) */
  delay?: number
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
  delay = 0,
  ...rest
}: DropdownProps) => {
  const [visible, setVisible] = useState(false)

  // Sync with controlled `visible` prop
  useEffect(() => {
    setVisible(_visible)
  }, [_visible])

  // Track whether the current open was triggered by pointer (hover) so we know
  // whether to enable keyboard focus-trapping via FocusOn.
  const pointerRef = useRef(false)

  // onOpenChange is called by Floating UI interaction hooks (useHover, useClick,
  // useDismiss). The `reason` arg lets us detect pointer vs keyboard opens.
  const onOpenChange = useCallback(
    (open: boolean, _event?: Event, reason?: string) => {
      pointerRef.current =
        open && (reason === "hover" || reason === "safe-polygon")
      setVisible(open)
    },
    []
  )

  const {
    anchorRef,
    tooltipRef: panelRef,
    floatingStyles,
    resolvedPlacement,
    context,
  } = usePosition({
    position: placement,
    offset: 0,
    active: visible,
    flip,
    padding: offset,
    onOpenChange,
  })

  // useHover: opens/closes on pointer enter/leave. safePolygon keeps the panel
  // open while the cursor traverses the gap between anchor and panel.
  const hover = useHover(context, {
    enabled: !openDropdownByClick,
    delay: {
      open: delay ?? (_transition ? 50 : 1),
      close: _transition ? 150 : 50,
    },
    // Menus should remain open while traversing toward the panel, even with
    // slower cursor movement. The default `requireIntent: true` can close too
    // aggressively for this UX.
    handleClose: safePolygon({
      requireIntent: false,
      buffer: 1,
      blockPointerEvents: true,
    }),
  })

  // useClick: toggles for click-mode; open-only (toggle:false) for hover-mode
  // so keyboard users can press Enter/Space on a focused anchor to open it.
  const click = useClick(context, {
    toggle: !!openDropdownByClick,
  })

  // useDismiss: closes on Escape key and click outside (replaces manual listeners).
  const dismiss = useDismiss(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    dismiss,
  ])

  // Tab-key close for hover-mode: FocusOn is disabled so focus can leave the
  // panel freely; we watch for that and close when it does.
  useEffect(() => {
    if (!visible || openDropdownByClick) return

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!panelRef.current) return
      if (
        event.key === "Tab" &&
        !panelRef.current.contains(document.activeElement)
      ) {
        setVisible(false)
      }
    }

    document.addEventListener("keyup", handleKeyUp)
    return () => document.removeEventListener("keyup", handleKeyUp)
  }, [visible, openDropdownByClick, panelRef])

  // Close when a link inside the panel is clicked (click-mode only).
  useEffect(() => {
    if (!openDropdownByClick) return

    const handleClick = (event: MouseEvent) => {
      if (!panelRef.current) return
      const target = event.target as Element
      const link =
        target.tagName.toLowerCase() === "a" ? target : target.closest("a")
      if (link && panelRef.current.contains(link)) setVisible(false)
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [openDropdownByClick, panelRef])

  const onVisible = useCallback(() => setVisible(true), [])
  const onHide = useCallback(() => setVisible(false), [])

  // Drive CSS transition: wait one animation frame so the element is in the
  // DOM before the opacity/transform transition kicks in.
  const [transition, setTransition] = useState(false)
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

  // Padding on the panel that fills the gap between anchor and panel so the
  // safePolygon cursor path isn't interrupted.
  const padding = useMemo(() => {
    switch (resolvedPlacement) {
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
  }, [resolvedPlacement, offset])

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

  const { createPortal } = usePortal()
  const isClient = useDidMount()

  const dropdownPanel = useMemo(() => {
    if (!(visible || keepInDOM)) return null

    return (
      <Container
        aria-label="Press escape to close"
        tabIndex={0}
        ref={panelRef as any}
        zIndex={dropdownZIndex}
        display="inline-block"
        placement={placement}
        style={{
          ...floatingStyles,
          ...(keepInDOM ? { visibility: visible ? "visible" : "hidden" } : {}),
        }}
        maxHeight={maxHeight + offset}
        {...padding}
        {...getFloatingProps()}
        {...rest}
      >
        <Panel
          transition={_transition}
          maxHeight={maxHeight}
          style={
            transition
              ? { opacity: 1, transform: "translate(0)" }
              : { opacity: 0, transform: translation }
          }
        >
          <FocusOn noIsolation enabled={focusEnabled} returnFocus={returnFocus}>
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
    )
  }, [
    visible,
    keepInDOM,
    dropdownZIndex,
    placement,
    maxHeight,
    offset,
    _transition,
    transition,
    translation,
    focusEnabled,
    returnFocus,
    dropdown,
    padding,
    floatingStyles,
    getFloatingProps,
    rest,
  ])

  const anchorProps: React.HTMLAttributes<HTMLElement> = getReferenceProps({
    "aria-expanded": visible,
    "aria-haspopup": true as const,
  })

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

      {dropdownPanel &&
        (!isClient && keepInDOM ? dropdownPanel : createPortal(dropdownPanel))}
    </>
  )
}

const Container = styled(Box)<{ placement: Position } & BoxProps>`
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
