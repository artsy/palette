import { mount } from "enzyme"
import React from "react"
import { Theme } from "../../../Theme"
import { SmallPagination } from "../SmallPagination"

describe("SmallPagination", () => {
  const previous = { page: 1, cursor: "ABC123==", isCurrent: false }
  const pageCursors = { previous }
  const onClickMock = jest.fn()
  const onNextMock = jest.fn()

  const props = {
    hasNextPage: true,
    onClick: onClickMock,
    onNext: onNextMock,
    pageCursors,
  }

  const mountWrapper = () => {
    const wrapper = mount(
      <Theme>
        <SmallPagination {...props} />
      </Theme>
    )

    return wrapper
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("when there is only a previous page", () => {
    beforeAll(() => {
      pageCursors.previous = previous
      props.hasNextPage = false
    })

    it("renders the previous button and calls the onClick function when clicked", () => {
      const wrapper = mountWrapper()
      wrapper.find("PrevButton ButtonWithBorder").simulate("click")
      expect(onClickMock).toHaveBeenCalled()
    })

    it("renders the next button as disabled and calls the onNext function when clicked", () => {
      const wrapper = mountWrapper()
      wrapper.find("NextButton ButtonWithBorder").simulate("click")
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
      wrapper.find("PrevButton ButtonWithBorder").simulate("click")
      expect(onClickMock).not.toHaveBeenCalled()
    })

    it("renders the next button and calls the onNext function when clicked", () => {
      const wrapper = mountWrapper()
      wrapper.find("NextButton ButtonWithBorder").simulate("click")
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
      wrapper.find("PrevButton ButtonWithBorder").simulate("click")
      expect(onClickMock).toHaveBeenCalled()
    })

    it("renders the next button and calls the onNext function when clicked", () => {
      const wrapper = mountWrapper()
      wrapper.find("NextButton ButtonWithBorder").simulate("click")
      expect(onNextMock).toHaveBeenCalled()
    })
  })
})
