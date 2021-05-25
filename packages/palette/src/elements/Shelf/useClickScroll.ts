import { useEffect } from "react"

interface UseClickScroll {
  trackRef?: React.MutableRefObject<HTMLElement>
  thumbRef?: React.MutableRefObject<HTMLElement>
  viewport?: HTMLElement
  scrollWidth: number
  trackWidth: number
}

export const useClickScroll = ({
  trackRef,
  thumbRef,
  viewport,
  scrollWidth,
  trackWidth,
}: UseClickScroll) => {
  useEffect(() => {
    if (!trackRef.current || !thumbRef.current) return

    const { current: thumb } = thumbRef
    const { current: track } = trackRef

    const handleMouseDown = (event: MouseEvent) => {
      const x =
        // Where you clicked
        event.pageX -
        // Offset by where the track sits on the page
        track.getBoundingClientRect().left -
        // Then center the thumb
        thumb.clientWidth / 2

      viewport.scrollLeft = (x * scrollWidth) / trackWidth
    }

    track.addEventListener("mousedown", handleMouseDown)

    return () => {
      track.removeEventListener("mousedown", handleMouseDown)
    }
  }, [viewport, scrollWidth, trackWidth])
}
