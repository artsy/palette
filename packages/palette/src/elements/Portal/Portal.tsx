import React, { FC, ReactNode } from "react"
import { createPortal } from "react-dom"

export interface PortalProps {
  children: ReactNode
}

export const Portal: FC<PortalProps> = ({ children }) => {
  const container = globalThis?.document?.body
  return container ? createPortal(<>{children}</>, container) : null
}
