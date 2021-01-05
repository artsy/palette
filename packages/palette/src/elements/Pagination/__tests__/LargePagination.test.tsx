import { mount } from "enzyme"
import React from "react"
import { Theme } from "../../../Theme"
import { LargePagination } from "../LargePagination"

describe("LargePagination", () => {
  const first = { page: 1, cursor: "Y3Vyc29yMg==", isCurrent: false }
  const last = { page: 20, cursor: "Y3Vyc29yMw==", isCurrent: false }
  const around = [
    { page: 6, cursor: "Y3Vyc29yMw==", isCurrent: true },
    { page: 7, cursor: "Y3Vyc29yMg==", isCurrent: false },
    { page: 8, cursor: "Y3Vyc29yMw==", isCurrent: false },
    { page: 9, cursor: "Y3Vyc29yMw==", isCurrent: false },
  ]
  const previous = { page: 5, cursor: "Y3Vyc29yMw==", isCurrent: false }
  const pageCursors = {
    around,
    first,
    last,
    previous,
  }
  const onClickMock = jest.fn()
  const onNextMock = jest.fn()

  const props = {
    hasNextPage: true,
    onClick: onClickMock,
    onNext: onNextMock,
    pageCursors,
    getHref: (x) => x,
  }

  const mountWrapper = (passedProps = {}) => {
    const wrapper = mount(
      <Theme>
        <LargePagination {...props} {...passedProps} />
      </Theme>
    )

    return wrapper
  }

  afterEach(() => {
    jest.clearAllMocks()
    props.pageCursors = pageCursors
  })

  it("computes the href for links", () => {
    const wrapper = mountWrapper({ getHref: () => "http://foo.com" })
    const html = wrapper.html()
    expect(html).toContain("http://foo.com")
  })

  describe("page numbers", () => {
    describe("with some around pages", () => {
      beforeAll(() => {
        props.pageCursors.first = null
        props.pageCursors.last = null
        props.pageCursors.around = around
      })

      it("renders those pages and calls the onClick function when clicked", () => {
        const wrapper = mountWrapper()
        const html = wrapper.html()
        const pages = ["6", "7", "8", "9"]
        pages.forEach((page) => {
          expect(html).toContain(`>${page}<`)
        })
        wrapper.find("Link").first().simulate("click")
        expect(onClickMock).toHaveBeenCalled()
      })
    })

    describe("when there is no first page", () => {
      beforeAll(() => {
        props.pageCursors.first = null
        props.pageCursors.last = last
        props.pageCursors.around = around
      })

      it("skips rendering the first page and dot dot dot", () => {
        const wrapper = mountWrapper()
        const html = wrapper.html()
        const pages = ["6", "7", "8", "9", "...", "20"]
        pages.forEach((page) => {
          expect(html).toContain(`>${page}<`)
        })
      })
    })

    describe("when there is no last page", () => {
      beforeAll(() => {
        props.pageCursors.first = first
        props.pageCursors.last = null
        props.pageCursors.around = around
      })

      it("skips rendering the last page and dot dot dot", () => {
        const wrapper = mountWrapper()
        const html = wrapper.html()
        const pages = ["1", "...", "6", "7", "8", "9"]
        pages.forEach((page) => {
          expect(html).toContain(`>${page}<`)
        })
      })
    })

    describe("when there are first, last and around pages", () => {
      beforeAll(() => {
        props.pageCursors.first = first
        props.pageCursors.last = last
        props.pageCursors.around = around
      })

      it("renders the first, last and dot dot dots plus around pages", () => {
        const wrapper = mountWrapper()
        const html = wrapper.html()
        const pages = ["1", "...", "6", "7", "8", "9", "...", "20"]
        pages.forEach((page) => {
          expect(html).toContain(`>${page}<`)
        })
      })
    })
  })

  describe("previous/next buttons", () => {
    describe("when there is only a previous page", () => {
      beforeAll(() => {
        pageCursors.previous = previous
        props.hasNextPage = false
      })

      it("renders the previous button and calls the onClick function when clicked", () => {
        const wrapper = mountWrapper()
        wrapper.find("PrevButton Link").simulate("click")
        expect(onClickMock).toHaveBeenCalled()
      })

      it("renders the next button as disabled and calls the onNext function when clicked", () => {
        const wrapper = mountWrapper()
        wrapper.find("NextButton Link").simulate("click")
        expect(onNextMock).toHaveBeenCalled()
      })
    })

    describe("when there is only a next page", () => {
      beforeAll(() => {
        pageCursors.previous = null
        props.hasNextPage = true
      })

      it("renders the previous button as disabled and does not call the onClick function when clicked", () => {
        const wrapper = mountWrapper()
        wrapper.find("PrevButton Link").simulate("click")
        expect(onClickMock).not.toHaveBeenCalled()
      })

      it("renders the next button and calls the onNext function when clicked", () => {
        const wrapper = mountWrapper()
        wrapper.find("NextButton Link").simulate("click")
        expect(onNextMock).toHaveBeenCalled()
      })
    })

    describe("when there are previous and next pages", () => {
      beforeAll(() => {
        pageCursors.previous = previous
        props.hasNextPage = true
      })

      it("renders the previous button and calls the onClick function when clicked", () => {
        const wrapper = mountWrapper()
        wrapper.find("PrevButton Link").simulate("click")
        expect(onClickMock).toHaveBeenCalled()
      })

      it("renders the next button and calls the onNext function when clicked", () => {
        const wrapper = mountWrapper()
        wrapper.find("NextButton Link").simulate("click")
        expect(onNextMock).toHaveBeenCalled()
      })
    })
  })
})
