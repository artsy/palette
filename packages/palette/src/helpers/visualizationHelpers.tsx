import { useEffect, useState } from "react"

/**
 * Given an array of numbers or objects returns the max value
 * @param values array of numbers or objects
 * @param accessor (optional) when passing an array of objects this function
 * specifies which attribute of object to be used for comparison. default is a unity function
 */
export const max = (
  values: any[],
  accessor: (item: any) => number = item => item
): number =>
  values.reduce((currentMax: number, item: any): number => {
    const value: number = accessor(item)
    return value > currentMax ? value : currentMax
  }, -Infinity) as number

/**
 * Returns true when component enters viewport
 * @param ref reference to component
 */
export const useHasEnteredViewport = (ref: React.RefObject<HTMLElement>) => {
  const [hasEntered, setHasEntered] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const rect = ref.current.getBoundingClientRect()
      if (rect.top <= window.innerHeight - rect.height) {
        setHasEntered(true)
        window.removeEventListener("scroll", handleScroll)
      }
    }
    window.addEventListener("scroll", handleScroll)
    window.dispatchEvent(new Event("scroll"))
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })
  return hasEntered
}
