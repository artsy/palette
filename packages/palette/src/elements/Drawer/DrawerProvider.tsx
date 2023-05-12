import React, { FC, useCallback, useState, createContext } from "react"

export const DrawerContext = createContext<{
  isOpen: boolean
  toggle: () => void
  close: () => void
}>({
  isOpen: false,
  toggle: () => {
    // NOOP
  },
  close: () => {
    // NOOP
  },
})

export const DrawerProvider: FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  const close = useCallback(() => setIsOpen(false), [])

  return (
    <DrawerContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </DrawerContext.Provider>
  )
}
