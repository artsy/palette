import { useEffect, useState } from "react"

export const useDidMount = (defaultMounted = false) => {
  const [isMounted, toggleMounted] = useState(defaultMounted)

  useEffect(() => {
    toggleMounted(true)
  }, [])

  return isMounted
}
