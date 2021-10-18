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
  close(): void
}

type Payload = Omit<Toast, "id" | "ttl" | "close"> & { ttl?: number }

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
  sendToast(toast: Payload): void
}>({
  state: { toasts: [] },
  sendToast: () => {
    // noop
  },
})

export const ToastsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { toasts: [] })

  const timeouts = useRef<Map<string, number>>(new Map())

  const sendToast = useCallback(({ ttl = 6000, ...rest }: Payload) => {
    const id = generateId()

    const close = () => {
      clearTimeout(timeouts.current.get(id))
      timeouts.current.delete(id)
      dispatch({ type: "RETRACT", payload: { id } })
    }

    dispatch({ type: "SEND", payload: { id, ...rest, ttl, close } })

    timeouts.current.set(
      id,
      window.setTimeout(() => {
        timeouts.current.delete(id)
        dispatch({ type: "RETRACT", payload: { id } })
      }, ttl)
    )
  }, [])

  useEffect(() => {
    const handles = timeouts.current

    return () => {
      handles.forEach(clearTimeout)
    }
  }, [])

  return (
    <ToastsContext.Provider value={{ state, sendToast }}>
      {children}
    </ToastsContext.Provider>
  )
}

export const useToasts = () => {
  const {
    state: { toasts },
    sendToast,
  } = useContext(ToastsContext)

  return { toasts, sendToast }
}

const generateId = () => Math.random().toString(26).slice(2)
