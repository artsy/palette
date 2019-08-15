import styled from "styled-components"
import {
  gridAutoColumns,
  GridAutoColumnsProps,
  gridAutoFlow,
  GridAutoFlowProps,
  gridAutoRows,
  GridAutoRowsProps,
  gridColumnGap,
  GridColumnGapProps,
  gridGap,
  GridGapProps,
  gridRowGap,
  GridRowGapProps,
  gridTemplateAreas,
  gridTemplateColumns,
  gridTemplateRows,
  GridTemplatesAreasProps,
  GridTemplatesColumnsProps,
  GridTemplatesRowsProps,
} from "styled-system"
import { Box } from "../Box"

/**
 * All props available to the CSSGrid component
 */
export interface CSSGridProps
  extends GridAutoColumnsProps,
    GridAutoFlowProps,
    GridAutoRowsProps,
    GridColumnGapProps,
    GridRowGapProps,
    GridTemplatesAreasProps,
    GridTemplatesColumnsProps,
    GridTemplatesRowsProps,
    GridGapProps {}

/**
 * A utility component that encapsulates CSS grid behavior
 */
export const CSSGrid = styled(Box)<CSSGridProps>`
  display: grid;
  ${gridAutoColumns}
  ${gridAutoFlow}
  ${gridAutoRows}
  ${gridColumnGap}
  ${gridRowGap}
  ${gridGap}
  ${gridTemplateAreas}
  ${gridTemplateColumns}
  ${gridTemplateRows}
`
