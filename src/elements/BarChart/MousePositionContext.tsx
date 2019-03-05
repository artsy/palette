import React, { useEffect, useState } from "react"

export const MousePositionContext = React.createContext({ x: 0, y: 0 })

export const ProvideMousePosition: React.SFC = ({ children }) => {
  const [state, setState] = useState({ x: 0, y: 0 })

  useEffect(
    () => {
      const setMousePosition = (ev: MouseEvent) => {
        setState({
          x: ev.clientX,
          y: ev.clientY,
        })
      }
      window.addEventListener("mousemove", setMousePosition)
      return () => {
        window.removeEventListener("mousemove", setMousePosition)
      }
    },
    [false]
  )

  return (
    <MousePositionContext.Provider value={state}>
      {children}
    </MousePositionContext.Provider>
  )
}
