/**
 * Adapted from https://github.com/jaredLunde/react-hook/blob/3c813dab5b21e26f2c85e733314ca5c063c6bfce/packages/resize-observer/src/index.tsx
 */
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect"
import { useLatest } from "./useLatest"

type UseResizeObserver<T extends HTMLElement> = {
  target: React.RefObject<T> | T | null
  onResize: UseResizeObserverCallback
}

export const useResizeObserver = <T extends HTMLElement>({
  target,
  onResize,
}: UseResizeObserver<T>) => {
  const resizeObserver = getResizeObserver()
  const storedCallback = useLatest(onResize)

  useIsomorphicLayoutEffect(() => {
    if (!resizeObserver) return

    let didUnsubscribe = false

    const targetEl = target && "current" in target ? target.current : target

    if (!targetEl) return

    const cb = (entry: ResizeObserverEntry, observer: ResizeObserver) => {
      if (didUnsubscribe) return

      storedCallback.current(entry, observer)
    }

    resizeObserver.subscribe(targetEl as HTMLElement, cb)

    return () => {
      didUnsubscribe = true
      resizeObserver.unsubscribe(targetEl as HTMLElement, cb)
    }
  }, [target, resizeObserver, storedCallback])
}

const createResizeObserver = () => {
  if (typeof ResizeObserver === "undefined") return null

  let ticking = false
  let allEntries: ResizeObserverEntry[] = []

  const callbacks: Map<unknown, Array<UseResizeObserverCallback>> = new Map()

  const observer = new ResizeObserver(
    (entries: ResizeObserverEntry[], obs: ResizeObserver) => {
      allEntries = allEntries.concat(entries)

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const triggered = new Set<Element>()

          for (let i = 0; i < allEntries.length; i++) {
            if (triggered.has(allEntries[i].target)) continue

            triggered.add(allEntries[i].target)

            const cbs = callbacks.get(allEntries[i].target)
            cbs?.forEach((cb) => cb(allEntries[i], obs))
          }

          allEntries = []
          ticking = false
        })
      }

      ticking = true
    }
  )

  return {
    observer,
    subscribe(target: HTMLElement, callback: UseResizeObserverCallback) {
      observer.observe(target)

      const cbs = callbacks.get(target) ?? []

      cbs.push(callback)
      callbacks.set(target, cbs)
    },
    unsubscribe(target: HTMLElement, callback: UseResizeObserverCallback) {
      const cbs = callbacks.get(target) ?? []

      if (cbs.length === 1) {
        observer.unobserve(target)
        callbacks.delete(target)
        return
      }

      const cbIndex = cbs.indexOf(callback)

      if (cbIndex !== -1) cbs.splice(cbIndex, 1)

      callbacks.set(target, cbs)
    },
  }
}

let _resizeObserver: ReturnType<typeof createResizeObserver>

const getResizeObserver = () =>
  !_resizeObserver
    ? (_resizeObserver = createResizeObserver())
    : _resizeObserver

type UseResizeObserverCallback = (
  entry: ResizeObserverEntry,
  observer: ResizeObserver
) => unknown
