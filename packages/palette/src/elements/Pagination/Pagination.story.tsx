import { action } from "@storybook/addon-actions"
import { storiesOf } from "@storybook/react"
import React from "react"
import { LargePagination } from "./LargePagination"
import { SmallPagination } from "./SmallPagination"

storiesOf("Components/Pagination", module)
  .add("LargePagination", () => {
    return (
      <LargePagination
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
        onClick={action("onClick")}
        onNext={action("onNext")}
      />
    )
  })
  .add("SmallPagination", () => {
    return (
      <SmallPagination
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
        onClick={action("onClick")}
        onNext={action("onNext")}
      />
    )
  })
