import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useRef,
  useEffect,
} from "react"
import { ToastProps } from "./Toast"

interface Toast extends ToastProps {
  id: string
  ttl: number
  onClose(id: string): void
}

type Payload = Omit<Toast, "id" | "ttl" | "onClose"> & {
  ttl?: number
  onClose?(id: string): void
}

type State = { toasts: Toast[] }

type Action =
  | { type: "SEND"; payload: Toast }
  | { type: "RETRACT"; payload: { id: string } }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SEND":
      return { ...state, toasts: [...state.toasts, action.payload] }

    case "RETRACT":
      return {
        ...state,
        toasts: state.toasts.filter(({ id }) => {
          return id !== action.payload.id
        }),
      }
  }
}

export const ToastsContext = createContext<{
  state: State
  sendToast(toast: Payload): { id: string; handleClose: () => void }
  retractToast(id: string): void
}>({
  state: { toasts: [] },
  sendToast: () => {
    return {
      id: "",
      handleClose: () => {
        // NOOP
      },
    }
  },
  retractToast: () => {
    // NOOP
  },
})

export const ToastsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { toasts: [] })

  const activeToasts = useRef<
    Map<
      string,
      {
        timeout: number
        onClose?: (id: string) => void
      }
    >
  >(new Map())

  const retractToast = useCallback((id: string) => {
    const toast = activeToasts.current.get(id)

    if (!toast) return

    clearTimeout(toast.timeout)

    activeToasts.current.delete(id)

    dispatch({ type: "RETRACT", payload: { id } })

    toast.onClose?.(id)
  }, [])

  const sendToast = useCallback(
    ({ ttl = 6000, onClose, ...rest }: Payload) => {
      const id = generateId()

      const handleClose = () => {
        retractToast(id)
      }

      dispatch({
        type: "SEND",
        payload: { ...rest, id, ttl, onClose: handleClose },
      })

      activeToasts.current.set(id, {
        timeout: ttl !== Infinity ? window.setTimeout(handleClose, ttl) : -1,
        onClose,
      })

      return { id, handleClose }
    },
    [retractToast]
  )

  useEffect(() => {
    const toasts = activeToasts.current

    return () => {
      toasts.forEach((toast) => clearTimeout(toast.timeout))
    }
  }, [])

  return (
    <ToastsContext.Provider value={{ state, sendToast, retractToast }}>
      {children}
    </ToastsContext.Provider>
  )
}

export const useToasts = () => {
  const {
    state: { toasts },
    sendToast,
    retractToast,
  } = useContext(ToastsContext)

  return { toasts, sendToast, retractToast }
}

const generateId = () => Math.random().toString(26).slice(2)
