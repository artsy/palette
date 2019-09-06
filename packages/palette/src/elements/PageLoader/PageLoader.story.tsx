import { storiesOf } from "@storybook/react"
import React from "react"
import { PageLoader } from "./PageLoader"

storiesOf("Components/PageLoader", module)
  .add("With default value", () => {
    return <PageLoader />
  })
  .add("With starting percent", () => {
    return <PageLoader percentComplete={50} />
  })
  .add("Without background", () => {
    return <PageLoader showBackground={false} />
  })
