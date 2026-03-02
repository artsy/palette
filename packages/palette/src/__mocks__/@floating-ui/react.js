/* eslint-disable */

/**
 * Jest mock for @floating-ui/react
 *
 * The real library uses `flushSync` from react-dom, which crashes in the React
 * 17 test environment when async computePosition promises resolve after jsdom
 * tears down the `document` global.
 *
 * This mock provides the same API shape without flushSync, allowing components
 * that use usePosition/useFloating to mount in tests without crashing.
 */
const React = require("react")

const useFloating = ({
  placement = "bottom",
  strategy = "absolute",
  open = false,
  onOpenChange = () => {},
} = {}) => {
  const referenceRef = React.useRef(null)
  const floatingRef = React.useRef(null)

  const refs = React.useMemo(
    () => ({
      reference: referenceRef,
      floating: floatingRef,
      setReference: (node) => {
        referenceRef.current = node
      },
      setFloating: (node) => {
        floatingRef.current = node
      },
    }),
    []
  )

  const floatingStyles = {
    position: strategy,
    top: 0,
    left: 0,
  }

  const middlewareData = {}

  // Use a ref so interaction hook stubs can always call the latest onOpenChange
  // without capturing a stale closure.
  const onOpenChangeRef = React.useRef(onOpenChange)
  onOpenChangeRef.current = onOpenChange

  const context = {
    x: 0,
    y: 0,
    placement,
    strategy,
    middlewareData,
    isPositioned: true,
    open,
    onOpenChange: (...args) => onOpenChangeRef.current(...args),
    refs,
    elements: { reference: null, floating: null },
    events: { emit: () => {}, on: () => {}, off: () => {} },
    dataRef: { current: {} },
    nodeId: undefined,
    floatingId: "mock-floating-id",
    update: () => {},
  }

  return {
    x: 0,
    y: 0,
    placement,
    strategy,
    refs,
    floatingStyles,
    update: () => {},
    middlewareData,
    context,
    isPositioned: true,
  }
}

const offset = () => ({ name: "offset", fn: (state) => state })
const flip = () => ({ name: "flip", fn: (state) => state })
const shift = () => ({ name: "shift", fn: (state) => state })
const hide = () => ({ name: "hide", fn: (state) => state })
const arrow = () => ({ name: "arrow", fn: (state) => state })
const autoPlacement = () => ({ name: "autoPlacement", fn: (state) => state })
const autoUpdate = (_reference, _floating, update) => {
  update()
  return () => {}
}

// Minimal FloatingArrow stub — renders a plain SVG element for tests.
const FloatingArrow = React.forwardRef(function FloatingArrow(
  { context, fill, style, width = 14, height = 7, ...props },
  ref
) {
  return React.createElement("svg", {
    ref,
    "data-floating-arrow": true,
    style: { position: "absolute", ...style },
    ...props,
  })
})

// ── Interaction hook stubs ───────────────────────────────────────────────────
// Provide realistic event handler stubs so tests that simulate mouse/keyboard
// events still drive the visible state via context.onOpenChange.

const useHover = (context, { enabled = true } = {}) => {
  if (!enabled) return { reference: {}, floating: {} }
  return {
    reference: {
      onMouseEnter: (event) => context.onOpenChange(true, event, "hover"),
      onMouseLeave: (event) => context.onOpenChange(false, event, "hover"),
    },
    floating: {},
  }
}

const useClick = (context, { enabled = true, toggle = true } = {}) => {
  if (!enabled) return { reference: {}, floating: {} }
  return {
    reference: {
      onClick: (event) => {
        if (toggle) {
          context.onOpenChange(!context.open, event, "click")
        } else {
          context.onOpenChange(true, event, "click")
        }
      },
    },
    floating: {},
  }
}

const useDismiss = (context, _options) => ({
  reference: {},
  floating: {},
})

const useFocus = (_context, _options) => ({
  reference: {},
  floating: {},
})

const useInteractions = (interactions = []) => ({
  getReferenceProps: (userProps = {}) => {
    const merged = { ...userProps }
    interactions.forEach(({ reference = {} }) => {
      Object.assign(merged, reference)
    })
    return merged
  },
  getFloatingProps: (userProps = {}) => {
    const merged = { ...userProps }
    interactions.forEach(({ floating = {} }) => {
      Object.assign(merged, floating)
    })
    return merged
  },
  getItemProps: (userProps = {}) => userProps,
})

// safePolygon returns a handleClose function stub
const safePolygon = (_options) => (_state) => null

module.exports = {
  useFloating,
  offset,
  flip,
  shift,
  hide,
  arrow,
  autoPlacement,
  autoUpdate,
  FloatingArrow,
  useHover,
  useClick,
  useDismiss,
  useFocus,
  useInteractions,
  safePolygon,
}
