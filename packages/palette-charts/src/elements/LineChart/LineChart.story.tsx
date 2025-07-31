import React from "react"
import { LineChart } from "./LineChart"

export default {
  title: "Components/LineChart",
}

/** Default LineChart with standard colors */
export const Default = () => {
  return <LineChart points={POINTS} />
}

/** LineChart with custom primary and hover colors */
export const WithCustomColors = () => {
  return (
    <LineChart 
      points={POINTS}
      primaryColor="#3498db"
      hoverColor="#e74c3c"
    />
  )
}

const POINTS = [
  {
    value: 10,
    tooltip: {
      title: "January",
      description: "10 sales",
    },
    axisLabelX: "Jan",
  },
  {
    value: 25,
    tooltip: {
      title: "February", 
      description: "25 sales",
    },
    axisLabelX: "Feb",
  },
  {
    value: 15,
    tooltip: {
      title: "March",
      description: "15 sales", 
    },
    axisLabelX: "Mar",
  },
  {
    value: 30,
    tooltip: {
      title: "April",
      description: "30 sales",
    },
    axisLabelX: "Apr",
  },
  {
    value: 20,
    tooltip: {
      title: "May", 
      description: "20 sales",
    },
    axisLabelX: "May",
  },
  {
    value: 35,
    tooltip: {
      title: "June",
      description: "35 sales",
    },
    axisLabelX: "Jun",
  },
]