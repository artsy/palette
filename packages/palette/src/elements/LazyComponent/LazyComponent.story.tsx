import { storiesOf } from "@storybook/react"
import React from "react"
import { LazyComponent } from "./LazyComponent"

storiesOf("Components/LazyComponent", module).add("Example", () => (
  <>
    {[...new Array(100)].map((_, i) => (
      <div>
        eager #{i + 1}
        <LazyComponent rootMargin="1000px">
          <div>lazy #{i + 1}</div>
        </LazyComponent>
      </div>
    ))}
  </>
))
