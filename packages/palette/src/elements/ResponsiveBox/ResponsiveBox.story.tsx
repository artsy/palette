// tslint:disable completed-docs
import { storiesOf } from "@storybook/react"
import React, { useEffect, useRef, useState } from "react"
import { ResponsiveBox, ResponsiveBoxProps } from "./ResponsiveBox"

const Measure: React.FC<{ input: ResponsiveBoxProps }> = ({ input }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const ref = useRef<null | HTMLPreElement>(null)

  const check = () => {
    if (!ref.current) return
    setDimensions({
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    })
  }

  useEffect(() => {
    check()
    window.addEventListener("resize", check)
    return () => {
      window.removeEventListener("resize", check)
    }
  })

  return (
    <pre
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        fontFamily: "monospace",
        color: "white",
        fontSize: "12px",
        lineHeight: "1",
      }}
    >
      {JSON.stringify({ input, dimensions }, null, 2)}
    </pre>
  )
}

const EXAMPLE_ASPECTS = [
  { aspectWidth: 300, aspectHeight: 400 },
  { aspectWidth: 400, aspectHeight: 300 },
]

const EXAMPLE_MAXIMUMS = [
  { maxHeight: 200, maxWidth: 200 },
  { maxHeight: 400, maxWidth: 400 },
  { maxHeight: 600, maxWidth: 600 },
  { maxHeight: 100, maxWidth: 600 },
  { maxHeight: 1024, maxWidth: 1024 },
]

storiesOf("Components/ResponsiveBox", module).add("Basic", () => {
  return (
    <>
      {EXAMPLE_ASPECTS.map((aspect, i) =>
        EXAMPLE_MAXIMUMS.map((maximum, j) => {
          return (
            <ResponsiveBox
              key={[i, j].join(".")}
              {...aspect}
              {...maximum}
              bg="purple100"
              my={2}
            >
              <Measure input={{ ...aspect, ...maximum }} />
            </ResponsiveBox>
          )
        })
      )}
    </>
  )
})
