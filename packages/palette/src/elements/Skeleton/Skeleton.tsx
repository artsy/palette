import styled, { css, keyframes } from "styled-components"
import { color } from "../../helpers"
import { Box, BoxProps } from "../Box"

const PULSE = keyframes`
  0% { background-color: ${color("black10")}; }
  50% { background-color: ${color("black5")}; }
  100% { background-color: ${color("black10")}; }
`

/** SkeletonProps */
export type SkeletonProps = BoxProps & {
  done?: boolean
}

/** Skeleton */
export const Skeleton = styled(Box)<{ done?: boolean }>`
  ${({ done }) =>
    done
      ? css`
          background-color: ${color("black10")};
        `
      : css`
          animation: ${PULSE} 2s ease-in-out infinite;
        `}
`
