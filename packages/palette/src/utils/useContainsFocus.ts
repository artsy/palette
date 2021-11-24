import { useEffect, useRef } from "react"

export const useContainsFocus = ({
  onChange,
}: {
  onChange(focused: boolean): void
}) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleFocus = debounce(() => {
      if (!ref.current) return

      onChange(
        ref.current === document.activeElement ||
          ref.current.contains(document.activeElement)
      )
    })

    document.addEventListener("focus", handleFocus, true)
    document.addEventListener("blur", handleFocus, true)

    return () => {
      document.removeEventListener("focus", handleFocus, true)
      document.removeEventListener("blur", handleFocus, true)
    }
  }, [onChange])

  return { ref }
}

/**
 * A simplified debounce that just executes the last function if multiple
 * functions are called within the same tick. Since frequently a blur and a focus
 * will happen concurrently: the last function (the focus) will be executed.
 * If travelling from two elements within the same focus group, `focused` will remain `true`.
 */
const debounce = (callback: () => void) => {
  let timer: ReturnType<typeof setTimeout>

  return () => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      callback()
    }, 0)
  }
}
