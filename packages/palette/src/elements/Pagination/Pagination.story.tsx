import { fn } from "@storybook/test"
import React from "react"
import { Pagination, PaginationSkeleton } from "./Pagination"

const EXAMPLE_PAGE_CURSORS = {
  first: { page: 1, cursor: "Y3Vyc29yMg==", isCurrent: false },
  last: { page: 20, cursor: "Y3Vyc29yMw==", isCurrent: false },
  around: [
    { page: 6, cursor: "Y3Vyc29yMw==", isCurrent: true },
    { page: 7, cursor: "Y3Vyc29yMg==", isCurrent: false },
    { page: 8, cursor: "Y3Vyc29yMw==", isCurrent: false },
    { page: 9, cursor: "Y3Vyc29yMw==", isCurrent: false },
  ],
  previous: { page: 5, cursor: "Y3Vyc29yMw==", isCurrent: false },
}

export default {
  component: Pagination,
  title: "Components/Pagination",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A pagination component for navigating through pages of content with support for cursor-based pagination.",
      },
    },
    controls: {
      include: ["hasNextPage", "pageCursors", "onClick", "onNext"],
    },
  },
}

export const Default = {
  args: {
    hasNextPage: true,
    pageCursors: EXAMPLE_PAGE_CURSORS,
    onClick: (cursor, page, event) => {
      event.preventDefault()
      fn()(cursor, page, event)
    },
    onNext: (event, ...rest) => {
      event.preventDefault()
      fn()(event, ...rest)
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Basic pagination with next page available.",
      },
    },
  },
}

export const WithoutPrevious = {
  args: {
    hasNextPage: true,
    pageCursors: { ...EXAMPLE_PAGE_CURSORS, previous: null },
    onClick: (cursor, page, event) => {
      event.preventDefault()
      fn()(cursor, page, event)
    },
    onNext: (event, ...rest) => {
      event.preventDefault()
      fn()(event, ...rest)
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Pagination on first page without previous navigation.",
      },
    },
  },
}

export const Skeleton = {
  args: {},
  render: () => <PaginationSkeleton />,
  parameters: {
    docs: {
      description: {
        story: "Loading skeleton for pagination component.",
      },
    },
  },
}
