import React, { forwardRef, ForwardRefExoticComponent } from "react"
import styled from "styled-components"
import { variant } from "styled-system"
import { DROP_SHADOW } from "../../helpers"
import { Box, BoxProps } from "../Box"

const POINTER_VARIANTS = {
  defaultLight: {
    backgroundColor: "white100",
  },
  defaultDark: {
    backgroundColor: "black100",
  },
}

type PointerVariant = keyof typeof POINTER_VARIANTS

export interface PointerProps extends BoxProps {
  variant?: PointerVariant
}

/**
 * Internal-use component for displaying a triangular pointer to an anchor node
 */
export const Pointer: ForwardRefExoticComponent<
  PointerProps & { ref?: React.Ref<HTMLDivElement> }
> = forwardRef(({ variant = "defaultLight", ...rest }, forwardedRef) => {
  return <Container ref={forwardedRef as any} variant={variant} {...rest} />
})

Pointer.displayName = "Pointer"

export const POINTER_HEIGHT = 8 // px
export const POINTER_SIZE = Math.sqrt(2 * Math.pow(POINTER_HEIGHT, 2)) // px

const Container = styled(Box)<{ variant: PointerVariant }>`
  z-index: -1;
  position: absolute;
  width: ${POINTER_SIZE}px;
  height: ${POINTER_SIZE}px;
  transform: rotate(45deg);
  box-shadow: ${DROP_SHADOW};
  ${variant({ variants: POINTER_VARIANTS })}
`
