import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

const DEFAULT_LATERAL_OPEN_DELAY = 120
const LEAVE_GROUP_RESET_DELAY = 75

interface DropdownGroupContextValue {
  activeDropdownId: string | null
  hoveredDropdownId: string | null
  groupId: string
  lateralOpenDelay: number
  onAnchorEnter(id: string): void
  onAnchorLeave(event: React.MouseEvent<HTMLElement>): void
  onHoverOpen(id: string): void
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

export const DropdownGroupProvider: React.FC<DropdownGroupProviderProps> = ({
  children,
  lateralOpenDelay = DEFAULT_LATERAL_OPEN_DELAY,
}) => {
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null)
  const [hoveredDropdownId, setHoveredDropdownId] = useState<string | null>(
    null
  )

  const groupIdRef = useRef(generateGroupId())
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearResetTimeout = useCallback(() => {
    if (resetTimeoutRef.current === null) return

    clearTimeout(resetTimeoutRef.current)
    resetTimeoutRef.current = null
  }, [])

  const resetGroupState = useCallback(() => {
    setHoveredDropdownId(null)
    setActiveDropdownId(null)
  }, [])

  const scheduleResetGroupState = useCallback(() => {
    clearResetTimeout()

    resetTimeoutRef.current = setTimeout(() => {
      resetGroupState()
      resetTimeoutRef.current = null
    }, LEAVE_GROUP_RESET_DELAY)
  }, [clearResetTimeout, resetGroupState])

  const onAnchorEnter = useCallback(
    (id: string) => {
      clearResetTimeout()
      setHoveredDropdownId(id)
    },
    [clearResetTimeout]
  )

  const onAnchorLeave = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const nextTarget = event.relatedTarget

      if (
        nextTarget instanceof Element &&
        nextTarget.closest(`[data-dropdown-group="${groupIdRef.current}"]`)
      ) {
        return
      }

      scheduleResetGroupState()
    },
    [scheduleResetGroupState]
  )

  const onHoverOpen = useCallback(
    (id: string) => {
      clearResetTimeout()
      setActiveDropdownId(id)
    },
    [clearResetTimeout]
  )

  useEffect(() => {
    return () => clearResetTimeout()
  }, [clearResetTimeout])

  const contextValue = useMemo<DropdownGroupContextValue>(() => {
    return {
      activeDropdownId,
      hoveredDropdownId,
      groupId: groupIdRef.current,
      lateralOpenDelay,
      onAnchorEnter,
      onAnchorLeave,
      onHoverOpen,
    }
  }, [
    activeDropdownId,
    hoveredDropdownId,
    lateralOpenDelay,
    onAnchorEnter,
    onAnchorLeave,
    onHoverOpen,
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

const generateGroupId = () => Math.random().toString(36).slice(2)
