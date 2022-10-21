import { useEffect, useState } from "react"

export const useDidMount = (
  {
    defaultMounted,
    clearCallStack,
  }: {
    defaultMounted?: boolean
    clearCallStack?: boolean
  } = {
    defaultMounted: false,
    clearCallStack: false,
  }
) => {
  const [isMounted, toggleMounted] = useState(defaultMounted)

  useEffect(() => {
    if (!clearCallStack) {
      toggleMounted(true)
      return
    }

    const timeout = setTimeout(() => {
      toggleMounted(true)
    }, 0)

    return () => {
      clearTimeout(timeout)
    }
  }, [clearCallStack])

  return isMounted
}
