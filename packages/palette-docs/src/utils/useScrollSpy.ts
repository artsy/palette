import * as React from "react"
import { useEffect } from "react"

export function useScrollSpy(
  selectors: string[],
  options?: IntersectionObserverInit
) {
  const [activeId, setActiveId] = React.useState<string>()
  const observer = React.useRef<IntersectionObserver>()

  useEffect(() => {
    const elements = selectors.map(
      (selector) => document.querySelectorAll(selector)[0]
    )
    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.getAttribute("href"))
        }
      })
    }, options)

    elements.forEach((el) => observer.current.observe(el))

    return () => observer.current.disconnect()
  }, [selectors])

  return activeId
}
