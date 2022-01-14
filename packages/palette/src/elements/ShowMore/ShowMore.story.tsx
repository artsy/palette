import React from "react"
import { States } from "storybook-states"
import { ShowMore } from "./ShowMore"
import { ShowMoreProps } from "./ShowMore"

export default {
  title: "Components/ShowMore",
}

export const Default = () => {
  return (
    <States<ShowMoreProps>
      states={[
        {
          initial: 3,
          children: Array.from(Array(5)).map((_, index) => (
            <div key={index}>hi</div>
          )),
        },
        {
          expanded: true,
          children: Array.from(Array(5)).map((_, index) => (
            <div key={index}>hi</div>
          )),
        },
      ]}
    >
      {(props) => <ShowMore {...props} />}
    </States>
  )
}
