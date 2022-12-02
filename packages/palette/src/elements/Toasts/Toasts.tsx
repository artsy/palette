import React from "react"
import { VisuallyHidden } from "../VisuallyHidden"
import { Box, BoxProps } from "../Box"
import { Join } from "../Join"
import { Spacer } from "../Spacer"
import { Toast } from "./Toast"
import { useToasts } from "./useToasts"

export interface ToastsProps extends BoxProps {
  limit?: number
}

export const Toasts: React.FC<ToastsProps> = ({ limit = 5, ...rest }) => {
  const { toasts } = useToasts()

  return (
    <>
      <Box {...rest}>
        <Join separator={<Spacer y={1} />}>
          {takeRight(toasts, limit).map(({ id, ...rest }) => (
            <Toast key={id} id={id} {...rest} />
          ))}
        </Join>
      </Box>

      <VisuallyHidden
        aria-live="assertive"
        aria-atomic="true"
        aria-relevant="additions"
      >
        {toasts.map((toast, i) => {
          return (
            <div key={i}>
              {toast.message} - {toast.description}
            </div>
          )
        })}
      </VisuallyHidden>
    </>
  )
}

const takeRight = <T,>(xs: T[], limit = 1) => {
  if (xs.length < limit) {
    return xs
  }

  return xs.slice(xs.length - limit, xs.length)
}
