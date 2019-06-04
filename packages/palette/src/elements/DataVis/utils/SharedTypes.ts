import { ChartTooltipProps } from "../DataVis/ChartTooltip"

export interface PointDescriptor {
  value: number
  axisLabelX?: React.ReactNode
  tooltip?: React.ReactNode | ChartTooltipProps
}

export interface ChartProps {
  points: PointDescriptor[]
  height?: number
}
