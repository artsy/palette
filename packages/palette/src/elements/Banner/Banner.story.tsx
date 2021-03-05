import React from "react"
import { States } from "storybook-states"
import { Banner, BannerProps } from "./Banner"

export default {
  title: "Components/Banner",
}

export const Default = () => {
  return (
    <States<BannerProps>
      states={[
        { dismissable: false },
        { variant: "defaultLight" },
        { variant: "defaultDark" },
        { variant: "success" },
        { variant: "error" },
        { variant: "brand" },
      ]}
    >
      <Banner dismissable>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quae
        natus assumenda distinctio, voluptatum magni. autem sunt.
      </Banner>
    </States>
  )
}
