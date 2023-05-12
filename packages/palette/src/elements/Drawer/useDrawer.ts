import { useContext } from "react"
import { DrawerContext } from "./DrawerProvider"

export const useDrawer = () => {
  const { isOpen, toggle } = useContext(DrawerContext)

  return { isOpen, toggle }
}
