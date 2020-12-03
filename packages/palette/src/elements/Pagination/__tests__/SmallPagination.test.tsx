import { mount } from "enzyme"
import React from "react"
import { Theme } from "../../../Theme"
import { SmallPagination } from "../SmallPagination"

describe("SmallPagination", () => {
  const paginationProps = {
    cursor: {
      first: { page: 1, cursor: "Y3Vyc29yMg==", isCurrent: false },
      last: { page: 20, cursor: "Y3Vyc29yMw==", isCurrent: false },
      around: [
        { page: 6, cursor: "Y3Vyc29yMw==", isCurrent: true },
        { page: 7, cursor: "Y3Vyc29yMg==", isCurrent: false },
        { page: 8, cursor: "Y3Vyc29yMw==", isCurrent: false },
        { page: 9, cursor: "Y3Vyc29yMw==", isCurrent: false },
      ],
      previous: { page: 5, cursor: "Y3Vyc29yMw==", isCurrent: false },
      " $refType": null,
    },
    callbacks: {
      onClick: () => {
        /* */
      },
      onNext: () => {
        /* */
      },
    },
  }

  const { cursor, callbacks } = paginationProps
  let matchMedia

  beforeAll(() => {
    matchMedia = window.matchMedia
    window.matchMedia = undefined // Immediately set matching media query inMockBoot
  })

  afterAll(() => {
    window.matchMedia = matchMedia
  })

  it("triggers next callback on previous button click", () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Theme>
        <SmallPagination
          hasNextPage
          pageCursors={cursor}
          {...callbacks}
          onClick={spy}
        />
      </Theme>
    )

    wrapper
      .find("ButtonWithBorder")
      .first()
      .simulate("click")

    expect(spy).toHaveBeenCalled()
  })

  it("triggers onClick callback on next button click", () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Theme>
        <SmallPagination
          hasNextPage
          pageCursors={cursor}
          {...callbacks}
          onNext={spy}
        />
      </Theme>
    )
    wrapper
      .find("ButtonWithBorder")
      .last()
      .simulate("click")

    expect(spy).toHaveBeenCalled()
  })
})
