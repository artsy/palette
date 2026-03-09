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
  groupId: string
  lateralOpenDelay: number
  onAnchorEnter(id: string): void
  onGroupLeave(): void
  onHoverOpen(id: string): void
  onHoverClose(id: string): void
  clearEnterTransitionDisable(id: string): void
  clearLeaveTransitionDisable(id: string): void
}

interface DropdownGroupState {
  activeDropdownId: string | null
  hoveredDropdownId: string | null
  disableEnterTransitionForId: string | null
  disableLeaveTransitionForId: string | null
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
  | { type: "CLEAR_DISABLE_ENTER"; payload: { id: string } }
  | { type: "CLEAR_DISABLE_LEAVE"; payload: { id: string } }
  | { type: "RESET_GROUP" }

const INITIAL_DROPDOWN_GROUP_STATE: DropdownGroupState = {
  activeDropdownId: null,
  hoveredDropdownId: null,
  disableEnterTransitionForId: null,
  disableLeaveTransitionForId: null,
  shouldReset: false,
}

const dropdownGroupReducer = (
  state: DropdownGroupState,
  action: DropdownGroupAction
): DropdownGroupState => {
  switch (action.type) {
    case "ANCHOR_ENTER": {
      const { id } = action.payload
      const isLateralEntry =
        state.activeDropdownId !== null && state.activeDropdownId !== id

      return {
        ...state,
        hoveredDropdownId: id,
        shouldReset: false,
        disableEnterTransitionForId: isLateralEntry
          ? id
          : state.disableEnterTransitionForId === id
            ? null
            : state.disableEnterTransitionForId,
        disableLeaveTransitionForId: isLateralEntry
          ? state.activeDropdownId
          : state.disableLeaveTransitionForId,
      }
    }

    case "ANCHOR_LEAVE_GROUP":
      return {
        ...state,
        hoveredDropdownId: null,
        shouldReset: true,
        disableEnterTransitionForId: null,
        disableLeaveTransitionForId: null,
      }

    case "HOVER_OPEN": {
      const { id } = action.payload

      return {
        ...state,
        activeDropdownId: id,
        hoveredDropdownId: id,
        shouldReset: false,
      }
    }

    case "HOVER_CLOSE": {
      const { id } = action.payload
      const shouldKeepActiveForLateralSwap =
        state.hoveredDropdownId !== null && state.hoveredDropdownId !== id

      return {
        ...state,
        activeDropdownId:
          state.activeDropdownId === id && !shouldKeepActiveForLateralSwap
            ? null
            : state.activeDropdownId,
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
      groupId: groupIdRef.current,
      lateralOpenDelay,
      onAnchorEnter,
      onGroupLeave,
      onHoverOpen,
      onHoverClose,
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
  enterTransitionDisabled: boolean
  leaveTransitionDisabled: boolean
  onHoverOpen(): void
  onHoverClose(): void
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

  const isLateralEntry =
    enabled &&
    !!group &&
    group.state.activeDropdownId !== null &&
    group.state.activeDropdownId !== id

  const openDelay =
    isLateralEntry && group ? group.lateralOpenDelay : baseOpenDelay

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
    enterTransitionDisabled,
    leaveTransitionDisabled,
    onHoverOpen,
    onHoverClose,
    clearEnterTransitionDisable,
    clearLeaveTransitionDisable,
  }
}

const generateGroupId = () => Math.random().toString(36).slice(2)
