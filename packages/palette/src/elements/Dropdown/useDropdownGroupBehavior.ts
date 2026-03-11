import { useEffect, useMemo, useRef, type MutableRefObject } from "react"
import { DropdownGroupHookProps } from "./DropdownGroupContext"

export type DropdownVisibilityOptions = {
  source?: "hover" | "click" | "manual"
  transition?: boolean
}

let dropdownGroupMemberCount = 0

export const useDropdownGroupBehavior = ({
  dropdownGroup,
  openDropdownByClick,
  delay,
  transition,
  anchorRef,
  panelRef,
  setVisibleWithOptions,
}: DropdownGroupHookProps & {
  openDropdownByClick?: boolean
  delay: number
  transition: boolean
  anchorRef: MutableRefObject<HTMLElement | null>
  panelRef: MutableRefObject<HTMLElement | null>
  setVisibleWithOptions: (
    nextVisible: boolean,
    options?: DropdownVisibilityOptions
  ) => void
}) => {
  const memberIdRef = useRef<string | null>(null)

  if (memberIdRef.current === null) {
    memberIdRef.current = `dropdown-group-${dropdownGroupMemberCount++}`
  }

  const groupedHoverEnabled = !!dropdownGroup && !openDropdownByClick

  useEffect(() => {
    if (!groupedHoverEnabled) return

    const unregister = dropdownGroup!.registerMember({
      id: memberIdRef.current!,
      anchorRef,
      panelRef,
      openDelay: delay ?? (transition ? 50 : 1),
      closeDelay: transition ? 150 : 50,
      show: options => setVisibleWithOptions(true, options),
      hide: options => setVisibleWithOptions(false, options),
    })

    return unregister
  }, [
    anchorRef,
    delay,
    dropdownGroup,
    groupedHoverEnabled,
    panelRef,
    setVisibleWithOptions,
    transition,
  ])

  const groupedInteractionProps = useMemo(() => {
    if (!groupedHoverEnabled) return null

    return dropdownGroup!.getInteractionProps(memberIdRef.current!)
  }, [dropdownGroup, groupedHoverEnabled])

  return {
    groupedHoverEnabled,
    groupedInteractionProps,
  }
}
