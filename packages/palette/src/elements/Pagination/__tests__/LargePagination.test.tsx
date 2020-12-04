import { mount } from "enzyme"
import React from "react"
import { Theme } from "../../../Theme"
import { LargePagination } from "../LargePagination"

describe("LargePagination", () => {
  describe("page numbers", () => {
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

    it("triggers on click on number click", () => {
      const spy = jest.fn()
      const wrapper = mount(
        <Theme>
          <LargePagination
            hasNextPage
            pageCursors={cursor}
            {...callbacks}
            onClick={spy}
          />
        </Theme>
      )
      wrapper
        .find("Page")
        .first()
        .simulate("click")

      expect(spy).toHaveBeenCalled()
    })

    it("renders first, last and page range", () => {
      const wrapper = mount(
        <Theme>
          <LargePagination hasNextPage pageCursors={cursor} {...callbacks} />
        </Theme>
      )
      const html = wrapper.html()
      const pages = ["1", "...", "6", "7", "8", "9", "...", "20"]
      pages.forEach(page => {
        expect(html).toContain(`>${page}<`)
      })
    })
  })

  describe("previous/next buttons", () => {
    const around = []
    const previous = { page: 1, cursor: "ABC123==", isCurrent: false }
    const pageCursors = { around, previous }
    const onClickMock = jest.fn()
    const onNextMock = jest.fn()

    const props = {
      hasNextPage: true,
      onClick: onClickMock,
      onNext: onNextMock,
      pageCursors: pageCursors,
    }

    const mountWrapper = () => {
      const wrapper = mount(
        <Theme>
          <LargePagination {...props} />
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
        wrapper.find("PrevButton a").simulate("click")
        expect(onClickMock).toHaveBeenCalled()
      })

      it("renders the next button as disabled and calls the onNext function when clicked", () => {
        const wrapper = mountWrapper()
        wrapper.find("NextButton a").simulate("click")
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
        wrapper.find("PrevButton a").simulate("click")
        expect(onClickMock).not.toHaveBeenCalled()
      })

      it("renders the next button and calls the onNext function when clicked", () => {
        const wrapper = mountWrapper()
        wrapper.find("NextButton a").simulate("click")
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
        wrapper.find("PrevButton a").simulate("click")
        expect(onClickMock).toHaveBeenCalled()
      })

      it("renders the next button and calls the onNext function when clicked", () => {
        const wrapper = mountWrapper()
        wrapper.find("NextButton a").simulate("click")
        expect(onNextMock).toHaveBeenCalled()
      })
    })
  })
})
