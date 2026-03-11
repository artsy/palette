import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react"

type DropdownVisibilityOptions = {
  source?: "hover" | "click" | "manual"
  transition?: boolean
}

type DropdownGroupMember = {
  id: string
  anchorRef: React.MutableRefObject<HTMLElement | null>
  panelRef: React.MutableRefObject<HTMLElement | null>
  openDelay: number
  closeDelay: number
  show: (options?: DropdownVisibilityOptions) => void
  hide: (options?: DropdownVisibilityOptions) => void
}

type ScheduledAction =
  | { type: "open"; id: string }
  | { type: "swap"; fromId: string; toId: string }
  | { type: "close"; id: string }

export interface DropdownGroupController {
  registerMember(member: DropdownGroupMember): () => void
  getInteractionProps(id: string): {
    anchorProps: React.HTMLAttributes<HTMLElement>
    floatingProps: React.HTMLAttributes<HTMLElement>
  }
}

export interface DropdownGroupHookProps {
  dropdownGroup?: DropdownGroupController
}

export interface DropdownGroupProviderProps {
  children: React.ReactNode
  /** Delay in milliseconds before swapping to a neighboring dropdown */
  delay?: number
}

const DropdownGroupContext = createContext<DropdownGroupController | null>(null)

const containsNode = (
  ref: React.MutableRefObject<HTMLElement | null>,
  node: Node | null
) => {
  return !!node && !!ref.current?.contains(node)
}

export const DropdownGroupProvider: React.FC<DropdownGroupProviderProps> = ({
  children,
  delay = 120,
}) => {
  const membersRef = useRef(new Map<string, DropdownGroupMember>())
  const activeIdRef = useRef<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scheduledActionRef = useRef<ScheduledAction | null>(null)

  const clearScheduledAction = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    scheduledActionRef.current = null
  }, [])

  const getMember = useCallback((id: string) => {
    return membersRef.current.get(id)
  }, [])

  const resolveMemberId = useCallback((target: EventTarget | null) => {
    if (!(target instanceof Node)) return null

    for (const [id, member] of membersRef.current.entries()) {
      if (
        containsNode(member.anchorRef, target) ||
        containsNode(member.panelRef, target)
      ) {
        return id
      }
    }

    return null
  }, [])

  const scheduleAction = useCallback(
    (action: ScheduledAction, wait: number, callback: () => void) => {
      clearScheduledAction()

      if (wait <= 0) {
        callback()
        return
      }

      scheduledActionRef.current = action
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null
        scheduledActionRef.current = null
        callback()
      }, wait)
    },
    [clearScheduledAction]
  )

  const showMember = useCallback(
    (id: string, options?: DropdownVisibilityOptions) => {
      getMember(id)?.show(options)
    },
    [getMember]
  )

  const hideMember = useCallback(
    (id: string, options?: DropdownVisibilityOptions) => {
      getMember(id)?.hide(options)
    },
    [getMember]
  )

  const scheduleClose = useCallback(
    (id: string) => {
      const member = getMember(id)

      if (!member) return

      scheduleAction({ type: "close", id }, member.closeDelay, () => {
        if (activeIdRef.current !== id) return

        hideMember(id, { source: "hover", transition: true })
        activeIdRef.current = null
      })
    },
    [getMember, hideMember, scheduleAction]
  )

  const handleEnter = useCallback(
    (id: string) => {
      const member = getMember(id)

      if (!member) return

      const activeId = activeIdRef.current
      const scheduledAction = scheduledActionRef.current

      if (activeId === id) {
        clearScheduledAction()
        return
      }

      if (!activeId) {
        if (scheduledAction?.type === "open" && scheduledAction.id === id) {
          return
        }

        scheduleAction({ type: "open", id }, member.openDelay, () => {
          showMember(id, { source: "hover", transition: true })
          activeIdRef.current = id
        })

        return
      }

      if (
        scheduledAction?.type === "swap" &&
        scheduledAction.fromId === activeId &&
        scheduledAction.toId === id
      ) {
        return
      }

      scheduleAction({ type: "swap", fromId: activeId, toId: id }, delay, () => {
        const fromId = activeIdRef.current

        if (!fromId || fromId === id) return

        hideMember(fromId, { source: "hover", transition: false })
        showMember(id, { source: "hover", transition: false })
        activeIdRef.current = id
      })
    },
    [clearScheduledAction, delay, getMember, hideMember, scheduleAction, showMember]
  )

  const handleLeave = useCallback(
    (id: string, event: React.MouseEvent<HTMLElement>) => {
      const nextId = resolveMemberId(event.relatedTarget)

      if (nextId === id) {
        return
      }

      if (nextId) {
        handleEnter(nextId)
        return
      }

      const scheduledAction = scheduledActionRef.current

      if (scheduledAction?.type === "open" && scheduledAction.id === id) {
        clearScheduledAction()
        return
      }

      if (scheduledAction?.type === "swap" && scheduledAction.toId === id) {
        clearScheduledAction()

        if (activeIdRef.current && activeIdRef.current !== id) {
          scheduleClose(activeIdRef.current)
        }

        return
      }

      if (activeIdRef.current === id) {
        scheduleClose(id)
      }
    },
    [clearScheduledAction, handleEnter, resolveMemberId, scheduleClose]
  )

  useEffect(() => {
    return () => clearScheduledAction()
  }, [clearScheduledAction])

  const contextValue = useMemo<DropdownGroupController>(() => {
    return {
      registerMember(member) {
        membersRef.current.set(member.id, member)

        return () => {
          membersRef.current.delete(member.id)

          if (activeIdRef.current === member.id) {
            activeIdRef.current = null
          }

          const scheduledAction = scheduledActionRef.current

          if (
            (scheduledAction?.type === "open" &&
              scheduledAction.id === member.id) ||
            (scheduledAction?.type === "close" &&
              scheduledAction.id === member.id) ||
            (scheduledAction?.type === "swap" &&
              (scheduledAction.fromId === member.id ||
                scheduledAction.toId === member.id))
          ) {
            clearScheduledAction()
          }
        }
      },
      getInteractionProps(id) {
        return {
          anchorProps: {
            onMouseEnter: () => handleEnter(id),
            onMouseLeave: event => handleLeave(id, event),
          },
          floatingProps: {
            onMouseEnter: () => handleEnter(id),
            onMouseLeave: event => handleLeave(id, event),
          },
        }
      },
    }
  }, [clearScheduledAction, handleEnter, handleLeave])

  return (
    <DropdownGroupContext.Provider value={contextValue}>
      {children}
    </DropdownGroupContext.Provider>
  )
}

export const useDropdownGroup = (): DropdownGroupHookProps => {
  const dropdownGroup = useContext(DropdownGroupContext)

  return useMemo(() => {
    return dropdownGroup ? { dropdownGroup } : {}
  }, [dropdownGroup])
}
