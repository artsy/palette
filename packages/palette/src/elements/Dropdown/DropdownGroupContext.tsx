import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react"

const DEFAULT_LATERAL_OPEN_DELAY = 120
const LEAVE_GROUP_RESET_DELAY = 75

interface DropdownGroupContextValue {
  state: DropdownGroupState
  activeDropdownId: string | null
  hoveredDropdownId: string | null
  pendingDropdownId: string | null
  groupId: string
  lateralOpenDelay: number
  onAnchorEnter(id: string): void
  onGroupLeave(): void
  onHoverOpen(id: string): void
  onHoverClose(id: string): void
  acknowledgeForceClose(id: string): void
  clearEnterTransitionDisable(id: string): void
  clearLeaveTransitionDisable(id: string): void
}

interface DropdownGroupState {
  // Persistent group state.
  activeDropdownId: string | null
  hoveredDropdownId: string | null
  pendingDropdownId: string | null

  // One-shot signals consumed by Dropdown instances.
  forceCloseDropdownId: string | null
  disableEnterTransitionForId: string | null
  disableLeaveTransitionForId: string | null

  // Triggers delayed reset after fully leaving the navbar group.
  shouldReset: boolean
}

export interface DropdownGroupProviderProps
  extends React.PropsWithChildren<unknown> {
  /**
   * Delay (ms) applied when moving laterally from one grouped dropdown to
   * another. This helps avoid accidental opens while moving toward a panel.
   */
  lateralOpenDelay?: number
}

const DropdownGroupContext = createContext<DropdownGroupContextValue | null>(
  null
)

type DropdownGroupAction =
  | { type: "ANCHOR_ENTER"; payload: { id: string } }
  | { type: "ANCHOR_LEAVE_GROUP" }
  | { type: "HOVER_OPEN"; payload: { id: string } }
  | { type: "HOVER_CLOSE"; payload: { id: string } }
  | { type: "ACK_FORCE_CLOSE"; payload: { id: string } }
  | { type: "CLEAR_DISABLE_ENTER"; payload: { id: string } }
  | { type: "CLEAR_DISABLE_LEAVE"; payload: { id: string } }
  | { type: "RESET_GROUP" }

const INITIAL_DROPDOWN_GROUP_STATE: DropdownGroupState = {
  activeDropdownId: null,
  hoveredDropdownId: null,
  pendingDropdownId: null,
  forceCloseDropdownId: null,
  disableEnterTransitionForId: null,
  disableLeaveTransitionForId: null,
  shouldReset: false,
}

const isActive = (state: DropdownGroupState, id: string) =>
  state.activeDropdownId === id

const isLateralEntry = (state: DropdownGroupState, id: string) =>
  state.activeDropdownId !== null && state.activeDropdownId !== id

const hasPendingSibling = (state: DropdownGroupState, id: string) =>
  state.pendingDropdownId !== null && state.pendingDropdownId !== id

const isPendingTarget = (state: DropdownGroupState, id: string) =>
  state.pendingDropdownId === id

const dropdownGroupReducer = (
  state: DropdownGroupState,
  action: DropdownGroupAction
): DropdownGroupState => {
  switch (action.type) {
    case "ANCHOR_ENTER": {
      const { id } = action.payload
      const enteringLateralSibling = isLateralEntry(state, id)

      return {
        ...state,
        hoveredDropdownId: id,
        // Keep active open while a sibling is pending delayed-open.
        pendingDropdownId: enteringLateralSibling ? id : null,
        shouldReset: false,
      }
    }

    case "ANCHOR_LEAVE_GROUP":
      return {
        ...state,
        hoveredDropdownId: null,
        pendingDropdownId: null,
        shouldReset: true,
        disableEnterTransitionForId: null,
        disableLeaveTransitionForId: null,
      }

    case "HOVER_OPEN": {
      const { id } = action.payload
      const lateralSwap = isLateralEntry(state, id)

      return {
        ...state,
        // This one-shot signal is consumed by the previously active dropdown.
        forceCloseDropdownId: lateralSwap ? state.activeDropdownId : null,
        activeDropdownId: id,
        hoveredDropdownId: id,
        pendingDropdownId: null,
        disableEnterTransitionForId: lateralSwap ? id : null,
        disableLeaveTransitionForId: lateralSwap ? state.activeDropdownId : null,
        shouldReset: false,
      }
    }

    case "HOVER_CLOSE": {
      const { id } = action.payload
      const closingActive = isActive(state, id)
      const pendingSibling = hasPendingSibling(state, id)

      if (isPendingTarget(state, id) && isLateralEntry(state, id)) {
        return {
          ...state,
          pendingDropdownId: null,
        }
      }

      if (closingActive && pendingSibling) {
        // Ignore close from the currently active dropdown while a sibling is
        // still pending delayed-open.
        return state
      }

      return {
        ...state,
        activeDropdownId: closingActive ? null : state.activeDropdownId,
        forceCloseDropdownId:
          state.forceCloseDropdownId === id ? null : state.forceCloseDropdownId,
      }
    }

    case "ACK_FORCE_CLOSE": {
      const { id } = action.payload

      return {
        ...state,
        forceCloseDropdownId:
          state.forceCloseDropdownId === id ? null : state.forceCloseDropdownId,
      }
    }

    case "CLEAR_DISABLE_ENTER": {
      const { id } = action.payload

      return {
        ...state,
        disableEnterTransitionForId:
          state.disableEnterTransitionForId === id
            ? null
            : state.disableEnterTransitionForId,
      }
    }

    case "CLEAR_DISABLE_LEAVE": {
      const { id } = action.payload

      return {
        ...state,
        disableLeaveTransitionForId:
          state.disableLeaveTransitionForId === id
            ? null
            : state.disableLeaveTransitionForId,
      }
    }

    case "RESET_GROUP":
      return INITIAL_DROPDOWN_GROUP_STATE

    default:
      return state
  }
}

export const DropdownGroupProvider: React.FC<DropdownGroupProviderProps> = ({
  children,
  lateralOpenDelay = DEFAULT_LATERAL_OPEN_DELAY,
}) => {
  const [state, dispatch] = useReducer(
    dropdownGroupReducer,
    INITIAL_DROPDOWN_GROUP_STATE
  )

  const groupIdRef = useRef(generateGroupId())

  const onAnchorEnter = useCallback(
    (id: string) => {
      dispatch({ type: "ANCHOR_ENTER", payload: { id } })
    },
    []
  )

  const onGroupLeave = useCallback(() => {
    dispatch({ type: "ANCHOR_LEAVE_GROUP" })
  }, [])

  const onHoverOpen = useCallback(
    (id: string) => {
      dispatch({ type: "HOVER_OPEN", payload: { id } })
    },
    []
  )

  const onHoverClose = useCallback(
    (id: string) => {
      dispatch({ type: "HOVER_CLOSE", payload: { id } })
    },
    []
  )

  const acknowledgeForceClose = useCallback((id: string) => {
    // Consumes the one-shot force-close signal emitted during lateral swap
    // commit once the previous active dropdown has actually closed.
    dispatch({ type: "ACK_FORCE_CLOSE", payload: { id } })
  }, [])

  const clearEnterTransitionDisable = useCallback((id: string) => {
    dispatch({ type: "CLEAR_DISABLE_ENTER", payload: { id } })
  }, [])

  const clearLeaveTransitionDisable = useCallback((id: string) => {
    dispatch({ type: "CLEAR_DISABLE_LEAVE", payload: { id } })
  }, [])

  useEffect(() => {
    if (!state.shouldReset) return

    const timeout = setTimeout(() => {
      dispatch({ type: "RESET_GROUP" })
    }, LEAVE_GROUP_RESET_DELAY)

    return () => clearTimeout(timeout)
  }, [state.shouldReset])

  const contextValue = useMemo<DropdownGroupContextValue>(() => {
    return {
      state,
      activeDropdownId: state.activeDropdownId,
      hoveredDropdownId: state.hoveredDropdownId,
      pendingDropdownId: state.pendingDropdownId,
      groupId: groupIdRef.current,
      lateralOpenDelay,
      onAnchorEnter,
      onGroupLeave,
      onHoverOpen,
      onHoverClose,
      acknowledgeForceClose,
      clearEnterTransitionDisable,
      clearLeaveTransitionDisable,
    }
  }, [
    state,
    lateralOpenDelay,
    onAnchorEnter,
    onGroupLeave,
    onHoverOpen,
    onHoverClose,
    acknowledgeForceClose,
    clearEnterTransitionDisable,
    clearLeaveTransitionDisable,
  ])

  return (
    <DropdownGroupContext.Provider value={contextValue}>
      {children}
    </DropdownGroupContext.Provider>
  )
}

export const useDropdownGroupContext = () => {
  return useContext(DropdownGroupContext)
}

interface UseDropdownGroupItemOptions {
  id: string
  enabled: boolean
  delay?: number
  transition: boolean
}

interface DropdownGroupItemBehavior {
  anchorGroupProps: React.HTMLAttributes<HTMLElement>
  openDelay: number
  transitionEnabled: boolean
  shouldKeepOpenDuringPendingSwap: boolean
  shouldForceCloseForCommittedSwap: boolean
  enterTransitionDisabled: boolean
  leaveTransitionDisabled: boolean
  onHoverOpen(): void
  onHoverClose(): void
  acknowledgeCommittedForceClose(): void
  clearEnterTransitionDisable(): void
  clearLeaveTransitionDisable(): void
}

export const useDropdownGroupItem = ({
  id,
  enabled,
  delay,
  transition,
}: UseDropdownGroupItemOptions): DropdownGroupItemBehavior => {
  const group = useDropdownGroupContext()
  const baseOpenDelay = delay ?? (transition ? 50 : 1)

  const lateralEntry = enabled && !!group && isLateralEntry(group.state, id)

  const openDelay =
    lateralEntry && group ? group.lateralOpenDelay : baseOpenDelay

  const shouldKeepOpenDuringPendingSwap =
    enabled &&
    !!group &&
    isActive(group.state, id) &&
    hasPendingSibling(group.state, id)

  const shouldForceCloseForCommittedSwap =
    enabled && !!group && group.state.forceCloseDropdownId === id

  const transitionEnabled =
    transition &&
    (!group ||
      !enabled ||
      (group.state.disableEnterTransitionForId !== id &&
        group.state.disableLeaveTransitionForId !== id))

  const enterTransitionDisabled =
    enabled && !!group && group.state.disableEnterTransitionForId === id

  const leaveTransitionDisabled =
    enabled && !!group && group.state.disableLeaveTransitionForId === id

  const onMouseEnter = useCallback(() => {
    if (!enabled || !group) return

    group.onAnchorEnter(id)
  }, [enabled, group, id])

  const onMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!enabled || !group) return

      const nextTarget = event.relatedTarget
      const movingWithinGroup =
        nextTarget instanceof Element &&
        nextTarget.closest(`[data-dropdown-group="${group.groupId}"]`)

      if (!movingWithinGroup) {
        group.onGroupLeave()
      }
    },
    [enabled, group]
  )

  const onHoverOpen = useCallback(() => {
    if (!enabled || !group) return

    group.onHoverOpen(id)
  }, [enabled, group, id])

  const onHoverClose = useCallback(() => {
    if (!enabled || !group) return

    group.onHoverClose(id)
  }, [enabled, group, id])

  const acknowledgeCommittedForceClose = useCallback(() => {
    if (!enabled || !group) return

    group.acknowledgeForceClose(id)
  }, [enabled, group, id])

  const clearEnterTransitionDisable = useCallback(() => {
    if (!enabled || !group) return

    group.clearEnterTransitionDisable(id)
  }, [enabled, group, id])

  const clearLeaveTransitionDisable = useCallback(() => {
    if (!enabled || !group) return

    group.clearLeaveTransitionDisable(id)
  }, [enabled, group, id])

  const anchorGroupProps = useMemo<React.HTMLAttributes<HTMLElement>>(
    () =>
      enabled && group
        ? {
            "data-dropdown-group": group.groupId,
            onMouseEnter,
            onMouseLeave,
          }
        : {},
    [enabled, group, onMouseEnter, onMouseLeave]
  )

  return {
    anchorGroupProps,
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
  }
}

const generateGroupId = () => Math.random().toString(36).slice(2)
