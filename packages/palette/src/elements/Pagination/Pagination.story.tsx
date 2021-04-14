import { action } from "@storybook/addon-actions"
import React from "react"
import { Pagination } from "./Pagination"

export default {
  title: "Components/Pagination",
}

export const Default = () => {
  return (
    <Pagination
      hasNextPage
      pageCursors={{
        first: { page: 1, cursor: "Y3Vyc29yMg==", isCurrent: false },
        last: { page: 20, cursor: "Y3Vyc29yMw==", isCurrent: false },
        around: [
          { page: 6, cursor: "Y3Vyc29yMw==", isCurrent: true },
          { page: 7, cursor: "Y3Vyc29yMg==", isCurrent: false },
          { page: 8, cursor: "Y3Vyc29yMw==", isCurrent: false },
          { page: 9, cursor: "Y3Vyc29yMw==", isCurrent: false },
        ],
        previous: { page: 5, cursor: "Y3Vyc29yMw==", isCurrent: false },
      }}
      onClick={(cursor, page, event) => {
        event.preventDefault()
        action("onClick")(cursor, page, event)
      }}
      onNext={(event, ...rest) => {
        event.preventDefault()
        action("onNext")(event, ...rest)
      }}
    />
  )
}

Default.story = {
  name: "Pagination",
}
