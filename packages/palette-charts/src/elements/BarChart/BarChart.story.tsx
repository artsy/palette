import React from "react"
import { BarChart } from "./BarChart"

export default {
  title: "Components/BarChart",
}

export const Default = () => {
  return <BarChart minLabel="$0" maxLabel="$30,000" bars={BARS} />
}

const BARS = [
  {
    value: 1,
    label: {
      title: "$0–$1,500",
      description: "1 work",
    },
  },
  {
    value: 1,
    label: {
      title: "$1,500–$3,000",
      description: "1 work",
    },
  },
  {
    value: 1,
    label: {
      title: "$3,000–$4,500",
      description: "1 work",
    },
  },
  {
    value: 1,
    label: {
      title: "$4,500–$6,000",
      description: "1 work",
    },
  },
  {
    value: 4,
    label: {
      title: "$6,000–$7,500",
      description: "4 works",
    },
  },
  {
    value: 10,
    label: {
      title: "$7,500–$9,000",
      description: "10 works",
    },
  },
  {
    value: 42,
    label: {
      title: "$9,000–$10,500",
      description: "42 works",
    },
  },
  {
    value: 0,
    label: {
      title: "$10,500–$12,000",
      description: "0 works",
    },
  },
  {
    value: 216,
    label: {
      title: "$12,000–$13,500",
      description: "216 works",
    },
  },
  {
    value: 1,
    label: {
      title: "$13,500–$15,000",
      description: "1 work",
    },
  },
  {
    value: 201,
    label: {
      title: "$15,000–$16,500",
      description: "201 works",
    },
    highlightLabel: {
      title: "$15,000–$16,500",
      description: "This work",
    },
  },
  {
    value: 0,
    label: {
      title: "$16,500–$18,000",
      description: "0 works",
    },
  },
  {
    value: 113,
    label: {
      title: "$18,000–$19,500",
      description: "113 works",
    },
  },
  {
    value: 4,
    label: {
      title: "$19,500–$21,000",
      description: "4 works",
    },
  },
  {
    value: 2,
    label: {
      title: "$21,000–$22,500",
      description: "2 works",
    },
  },
  {
    value: 6,
    label: {
      title: "$22,500–$24,000",
      description: "6 works",
    },
  },
  {
    value: 37,
    label: {
      title: "$24,000–$25,500",
      description: "37 works",
    },
  },
  {
    value: 1,
    label: {
      title: "$25,500–$27,000",
      description: "1 work",
    },
  },
  {
    value: 3,
    label: {
      title: "$27,000–$28,500",
      description: "3 works",
    },
  },
  {
    value: 0,
    label: {
      title: "$28,500–$30,000",
      description: "0 works",
    },
  },
  {
    value: 0,
    label: {
      title: "$30,000+",
      description: "0 works",
    },
  },
]
