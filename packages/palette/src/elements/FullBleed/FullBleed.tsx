import styled from "styled-components"
import { Box } from "../Box"

/**
 * Breaks out of horizontal padding
 */
export const FullBleed = styled(Box)`
  position: relative;
  left: 50%;
  right: 50%;
  width: 100vw;
  max-width: 100vw;
  margin-left: -50vw;
  margin-right: -50vw;
`
