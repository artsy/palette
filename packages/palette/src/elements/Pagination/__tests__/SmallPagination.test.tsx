import { mount } from "enzyme"
import React from "react"
import { Theme } from "../../../Theme"
import { PageCursors } from "../Pagination"
import { SmallPagination } from "../SmallPagination"

const mockGetHref = (page) => {
  const baseUrl = "http://www.example.com"

  if (page > 1) {
    return `${baseUrl}?page=${page}`
  } else {
    return baseUrl
  }
}

describe("SmallPagination", () => {
  const previous = { page: 1, cursor: "ABC123==", isCurrent: false }
  const first = { page: 1, cursor: "first==", isCurrent: false }
  const last = { page: 3, cursor: "last==", isCurrent: false }
  const around = []
  const pageCursors: PageCursors = { first, last, around, previous }
  const onClickMock = jest.fn()
  const onNextMock = jest.fn()

  const props = {
    hasNextPage: true,
    onClick: onClickMock,
    onNext: onNextMock,
    pageCursors,
  }

  const mountWrapper = (passedProps = {}) => {
    const wrapper = mount(
      <Theme>
        <SmallPagination {...props} {...passedProps} />
      </Theme>
    )

    return wrapper
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("computes the href for links", () => {
    const wrapper = mountWrapper({ getHref: () => "http://foo.com" })
    const html = wrapper.html()
    expect(html).toContain("http://foo.com")
  })

  describe("button hrefs", () => {
    it("on page 1", () => {
      const wrapper = mountWrapper({
        getHref: mockGetHref,
        hasNextPage: true,
        pageCursors: {
          ...pageCursors,
          previous: undefined,
        },
      })

      const prevButton = wrapper.find("PrevButton")
      expect(prevButton.find("Link").prop("href")).toEqual("")

      const nextButton = wrapper.find("NextButton")
      expect(nextButton.find("Link").prop("href")).toMatch("page=2")
    })

    it("on page 2", () => {
      const wrapper = mountWrapper({
        getHref: mockGetHref,
        hasNextPage: true,
        pageCursors: {
          ...pageCursors,
          previous: { page: 1, cursor: "first==", isCurrent: false },
        },
      })

      const prevButton = wrapper.find("PrevButton")
      expect(prevButton.find("Link").prop("href")).toEqual(
        "http://www.example.com"
      )

      const nextButton = wrapper.find("NextButton")
      expect(nextButton.find("Link").prop("href")).toMatch("page=3")
    })

    it("on page 3", () => {
      const wrapper = mountWrapper({
        getHref: mockGetHref,
        hasNextPage: false,
        pageCursors: {
          ...pageCursors,
          previous: { page: 2, cursor: "second==", isCurrent: false },
        },
      })

      const prevButton = wrapper.find("PrevButton")
      expect(prevButton.find("Link").prop("href")).toMatch("page=2")

      const nextButton = wrapper.find("NextButton")
      expect(nextButton.prop("disabled")).toEqual(true)
      expect(nextButton.find("Link").prop("href")).toEqual("")
    })
  })

  describe("when there is only a previous page", () => {
    beforeAll(() => {
      pageCursors.previous = previous
      props.hasNextPage = false
    })

    it("renders the previous button and calls the onClick function when clicked", () => {
      const wrapper = mountWrapper()
      wrapper.find("PrevButton Link").simulate("click")
      expect(onClickMock).toHaveBeenCalledWith("ABC123==", 1, expect.anything())
    })

    it("renders the next button as disabled and calls the onNext function when clicked", () => {
      const wrapper = mountWrapper()
      wrapper.find("NextButton Link").simulate("click")
      expect(onNextMock).toHaveBeenCalledWith(expect.anything(), 3)
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
      expect(onNextMock).toHaveBeenCalledWith(expect.anything(), 2)
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
      expect(onClickMock).toHaveBeenCalledWith("ABC123==", 1, expect.anything())
    })

    it("renders the next button and calls the onNext function when clicked", () => {
      const wrapper = mountWrapper()
      wrapper.find("NextButton Link").simulate("click")
      expect(onNextMock).toHaveBeenCalledWith(expect.anything(), 3)
    })
  })
})
