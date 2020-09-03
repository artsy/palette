import { mount } from "enzyme"
import React from "react"
import { Box } from "../../Box"
import { Swiper } from "../Swiper"

describe("Swiper", () => {
  it("renders correctly", () => {
    const wrapper = mount(
      <Swiper snap="center">
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </Swiper>
    )

    // Renders all cells
    expect(wrapper.find(Box).length).toBe(3)
    expect(wrapper.html()).toContain("scroll-snap-align: center")
  })

  it("accepts a customizable Rail", () => {
    const wrapper = mount(
      <Swiper
        Rail={({ children, ...rest }) => {
          return (
            <Box {...rest}>
              <div>
                I have {React.Children.toArray(children).length} beautiful
                children
              </div>

              {children}
            </Box>
          )
        }}
      >
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
      </Swiper>
    )

    const html = wrapper.html()

    expect(html).toContain("I have 3 beautiful children")
    expect(html.match(/\<li\s/g).length).toBe(3)
  })

  it("accepts a customizable Cell", () => {
    const wrapper = mount(
      <Swiper
        Cell={React.forwardRef(({ children, ...rest }, ref) => {
          return (
            <Box ref={ref as any} {...rest}>
              beautiful number {children}
            </Box>
          )
        })}
      >
        <>1</>
        <>2</>
        <>3</>
      </Swiper>
    )

    const html = wrapper.html()

    expect(html).toContain("beautiful number 1")
    expect(html).toContain("beautiful number 2")
    expect(html).toContain("beautiful number 3")
  })
})
