import { useEffect, useState } from "react"

/**
 * Returns width of container element
 * @param ref reference to wrapper component
 */
export const useGetWrapperWidth = (ref: React.RefObject<HTMLElement>) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const setContainerWidth = () => {
      if (ref.current) {
        setWidth(ref.current.getBoundingClientRect().width - 5)
      }
    }

    setContainerWidth()

    window.addEventListener("resize", setContainerWidth)
    ref.current.addEventListener("resize", setContainerWidth)

    return function cleanup() {
      window.removeEventListener("resize", setContainerWidth)
      ref.current.removeEventListener("resize", setContainerWidth)
    }
  }, [])

  return width
}
