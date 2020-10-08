import React, { useMemo } from "react"
import styled from "styled-components"
import { gridColumn, GridColumnProps } from "styled-system"
import { Box, BoxProps } from "../Box"
import { CSSGrid, CSSGridProps } from "../CSSGrid"
import {
  calculateGridColumn,
  ColumnCell,
  GRID_COLUMN_FULL_WIDTHS,
} from "./calculateGridColumn"

/** GridColumns implements `Box` and the common grid properties */
export type GridColumnsProps = CSSGridProps

/**
 * A 12-column fluid grid
 */
export const GridColumns = styled(CSSGrid).attrs({})`
  grid-template-columns: repeat(12, 1fr);
`

GridColumns.defaultProps = {
  gridColumnGap: 2,
  gridRowGap: 2,
}

type CellProps = ColumnCell & GridColumnProps & BoxProps

const Cell = styled(Box)<CellProps>`
  ${gridColumn}
`

/** Column implements `Box` and `gridColumn` */
export type ColumnProps = CellProps & {
  /** denotes whether or not to break to a new row after column */
  wrap?: boolean
}

/**
 * A column sits within the GridColumns and spans the columns,
 * sitting between gutters.
 */
export const Column: React.FC<ColumnProps> = ({
  span,
  start,
  wrap,
  ...rest
}) => {
  const gridColumnValue = useMemo(() => {
    return calculateGridColumn({ span, start })
  }, [span, start])

  return (
    <>
      <Cell gridColumn={gridColumnValue} {...rest} />
      {wrap && <ColumnWrap gridColumnValue={gridColumnValue} />}
    </>
  )
}

const ColumnWrap: React.FC<{ gridColumnValue: string[] }> = ({
  gridColumnValue,
}) => {
  return (
    <Cell
      // Spans the remainder of the columns until the end
      gridColumn={["auto / -1"]}
      // Hides the break if the value presented is going to span the full
      // width of the column anyway. Prevents duplicated row gaps.
      display={gridColumnValue.map(value => {
        return GRID_COLUMN_FULL_WIDTHS.includes(value) ? "none" : "block"
      })}
    />
  )
}
