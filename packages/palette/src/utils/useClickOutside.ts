import { useEffect, useRef } from "react"

export interface UseClickOutside {
  ref: React.RefObject<HTMLElement>
  when: boolean
  type?: keyof DocumentEventMap
  onClickOutside: (event: Event) => void
}

/**
 * Use click outside is a hook that will listen for clicks outside of a ref,
 * and when true, execute a callback.
 */
export const useClickOutside = ({
  ref,
  type = "click",
  when = true,
  onClickOutside,
}: UseClickOutside) => {
  const savedHandler = useRef(onClickOutside)

  useEffect(() => {
    savedHandler.current = onClickOutside
  }, [onClickOutside])

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Element)) {
        savedHandler.current(event)
      }
    }

    if (when) {
      setTimeout(() => {
        document.addEventListener(type, handleClick)
      }, 0)

      return () => {
        document.removeEventListener(type, handleClick)
      }
    }
  }, [ref, type, when])
}
