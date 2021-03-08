import { action } from "@storybook/addon-actions"
import React from "react"
import { States } from "storybook-states"
import { ChevronIcon } from "../../svgs"
import { Tab, Tabs } from "./"
import { TabsProps } from "./Tabs"

export default {
  title: "Components/Tabs",
}

export const Default = () => {
  return (
    <States<Partial<TabsProps>>
      states={[
        {},
        { initialTabIndex: 2 },
        { separator: <ChevronIcon mx={2} fill="black30" width="12px" /> },
      ]}
    >
      <Tabs onChange={action("onChange")}>
        <Tab name="Overview">Overview panel</Tab>
        <Tab name="Works for sale">Works for sale panel</Tab>
        <Tab name="CV">CV panel</Tab>
        <Tab name="Auction results">Auction results panel</Tab>
      </Tabs>
    </States>
  )
}
