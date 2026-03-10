import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import styled, { css } from "styled-components"
import {
  useHover,
  useClick,
  useDismiss,
  useInteractions,
  safePolygon,
  useTransitionStatus,
  type SafePolygonOptions,
} from "@floating-ui/react"
import {
  calculateMaxHeight,
  Position,
  PositionAutoPlacement,
  PositionFlip,
  usePosition,
} from "../../utils"
import { useDidMount } from "../../utils/useDidMount"
import { usePortal } from "../../utils/usePortal"
import { Box, BoxProps } from "../Box"
import { FocusOn } from "react-focus-on"
import { themeGet } from "@styled-system/theme-get"
import { debounce } from "es-toolkit"
import { useDropdownGroupItem } from "./DropdownGroupContext"

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
  flip?: PositionFlip
  /**
   * Use Floating UI's autoPlacement middleware. Accepts a boolean or full
   * AutoPlacement options object.
   *
   * When enabled, it takes precedence over `flip`.
   */
  autoPlacement?: PositionAutoPlacement
  /** Whether to return focus to the previous element when the dropdown closes (default: `true`) */
  returnFocus?: boolean
  /** Delay in milliseconds before showing the dropdown on hover (ignored when openDropdownByClick is true) */
  delay?: number
  /**
   * Optional overrides for Floating UI's safePolygon (used when openDropdownByClick is false).
   * When omitted, the default hover close behavior is used (no custom safe polygon).
   * Pass an object to customize, e.g. `{ requireIntent: false, buffer: 1, blockPointerEvents: true }`.
   */
  safePolygonOptions?: SafePolygonOptions | null
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
  autoPlacement = false,
  returnFocus = true,
  delay = 0,
  safePolygonOptions,
  ...rest
}: DropdownProps) => {
  const dropdownIdRef = useRef<string>(generateDropdownId())
  const dropdownId = dropdownIdRef.current

  const {
    anchorGroupProps,
    floatingGroupProps,
    openDelay,
    transitionEnabled,
    shouldKeepOpenDuringPendingSwap,
    shouldForceCloseForCommittedSwap,
    enterTransitionDisabled,
    leaveTransitionDisabled,
    onHoverOpen,
    onHoverClose,
    acknowledgeCommittedForceClose,
    clearEnterTransitionDisable,
    clearLeaveTransitionDisable,
  } = useDropdownGroupItem({
    id: dropdownId,
    enabled: !openDropdownByClick,
    delay,
    transition: _transition,
  })

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

      if (open && !openDropdownByClick) {
        onHoverOpen()
      } else if (!open && !openDropdownByClick) {
        // During a pending lateral swap, keep the currently active panel open
        // until the delayed sibling actually commits.
        if (shouldKeepOpenDuringPendingSwap) return
        onHoverClose()
      }

      setVisible(open)
    },
    [
      shouldKeepOpenDuringPendingSwap,
      onHoverOpen,
      onHoverClose,
      openDropdownByClick,
    ]
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
    // Avoid running both middleware: autoPlacement supersedes flip.
    flip: autoPlacement ? false : flip,
    autoPlacement,
    padding: offset,
    onOpenChange,
  })

  // useHover: opens/closes on pointer enter/leave. Optionally use safePolygon
  // to keep the panel open while the cursor traverses the gap (when safePolygonOptions is set).
  const hover = useHover(context, {
    enabled: !openDropdownByClick,
    delay: {
      open: openDelay,
      close: _transition ? 150 : 50,
    },
    handleClose:
      safePolygonOptions !== undefined && safePolygonOptions !== null
        ? safePolygon(safePolygonOptions)
        : null,
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

  // Placement-aware transitions via CSS data attributes (per Floating UI docs).
  // CSS reads the current data-placement on every frame, so there's no stale
  // capture when flip changes placement after mount.
  const { isMounted, status } = useTransitionStatus(context, {
    duration: transitionEnabled ? 250 : 0,
  })

  useEffect(() => {
    if (!enterTransitionDisabled || !visible) return

    clearEnterTransitionDisable()
  }, [enterTransitionDisabled, visible, clearEnterTransitionDisable])

  useEffect(() => {
    if (!leaveTransitionDisabled || visible || isMounted) return

    clearLeaveTransitionDisable()
  }, [
    leaveTransitionDisabled,
    visible,
    isMounted,
    clearLeaveTransitionDisable,
  ])

  useEffect(() => {
    if (!shouldForceCloseForCommittedSwap || !visible) return

    setVisible(false)
    onHoverClose()
    acknowledgeCommittedForceClose()
  }, [
    acknowledgeCommittedForceClose,
    shouldForceCloseForCommittedSwap,
    onHoverClose,
    visible,
  ])

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
    const calculate = () => {
      if (!anchorRef.current) return

      const nextMaxHeight = calculateMaxHeight({
        anchorRect: anchorRef.current.getBoundingClientRect(),
        position: resolvedPlacement,
        offset,
      })

      setMaxHeight(nextMaxHeight)
    }

    const calculateOnViewportChange = debounce(calculate, 100)

    window.addEventListener("resize", calculateOnViewportChange, {
      passive: true,
    })
    window.addEventListener("scroll", calculateOnViewportChange, {
      passive: true,
    })

    calculate()

    return () => {
      window.removeEventListener("resize", calculateOnViewportChange)
      window.removeEventListener("scroll", calculateOnViewportChange)
    }
  }, [anchorRef, offset, resolvedPlacement, visible])

  const { createPortal } = usePortal()
  const isClient = useDidMount()

  const dropdownPanel = useMemo(() => {
    if (!(visible || isMounted || keepInDOM)) return null

    const panelVisible = transitionEnabled ? isMounted : visible
    const renderPanel = panelVisible || keepInDOM

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
        {...getFloatingProps(floatingGroupProps)}
        {...rest}
      >
        {renderPanel && (
          <Panel
            data-status={panelVisible ? status : "initial"}
            data-placement={resolvedPlacement}
            $animate={transitionEnabled}
            maxHeight={maxHeight}
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
        )}
      </Container>
    )
  }, [
    visible,
    isMounted,
    keepInDOM,
    dropdownZIndex,
    placement,
    resolvedPlacement,
    maxHeight,
    offset,
    transitionEnabled,
    shouldForceCloseForCommittedSwap,
    status,
    focusEnabled,
    returnFocus,
    dropdown,
    padding,
    floatingStyles,
    floatingGroupProps,
    getFloatingProps,
    rest,
  ])

  const anchorProps: React.HTMLAttributes<HTMLElement> = getReferenceProps({
    "aria-expanded": visible,
    "aria-haspopup": true as const,
    ...anchorGroupProps,
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

/**
 * Placement-aware transitions driven by data attributes, following the pattern
 * from https://floating-ui.com/docs/useTransition#placement-aware-transitions
 *
 * CSS reads data-placement (which is always the *resolved* placement from
 * Floating UI, including flips) on every frame, so there is never a stale
 * slide direction — even when flip changes the placement after mount.
 */
const Panel = styled(Box)<{ $animate: boolean; maxHeight: number }>`
  ${({ $animate }) =>
    $animate
      ? css`
          transition-property: opacity, transform;

          &[data-status="open"],
          &[data-status="close"] {
            transition-duration: 250ms;
            transition-timing-function: ease-out;
          }

          &[data-status="initial"],
          &[data-status="close"] {
            opacity: 0;
          }

          &[data-status="initial"][data-placement^="top"],
          &[data-status="close"][data-placement^="top"] {
            transform: translateY(10px);
          }

          &[data-status="initial"][data-placement^="bottom"],
          &[data-status="close"][data-placement^="bottom"] {
            transform: translateY(-10px);
          }

          &[data-status="initial"][data-placement^="left"],
          &[data-status="close"][data-placement^="left"] {
            transform: translateX(10px);
          }

          &[data-status="initial"][data-placement^="right"],
          &[data-status="close"][data-placement^="right"] {
            transform: translateX(-10px);
          }
        `
      : css`
          transition: none;
        `}
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

let dropdownIdCounter = 0

const generateDropdownId = () => {
  dropdownIdCounter += 1
  return `dropdown-${dropdownIdCounter}`
}
