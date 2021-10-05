import { action } from "@storybook/addon-actions"
import React, { useState } from "react"
import { States } from "storybook-states"
import { ChevronIcon } from "../../svgs"
import { Sup } from "../Sup"
import { Tab, Tabs, TabsProps } from "./"

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
        { justifyContent: "center" },
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

export const WithData = () => {
  const [data, setData] = useState({})
  return (
    <>
      <Tabs onChange={setData as any}>
        <Tab name="Overview" data={{ name: "Overview" }}>
          Overview panel
        </Tab>

        <Tab name="Works for sale" data={{ name: "Works for sale" }}>
          Works for sale panel
        </Tab>

        <Tab name="CV" data={{ name: "CV" }}>
          CV panel
        </Tab>

        <Tab name="Auction results" data={{ name: "Auction results" }}>
          Auction results panel
        </Tab>

        <Tab name="No data">No data panel</Tab>
      </Tabs>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export const Counts = () => {
  return (
    <Tabs onChange={action("onChange")}>
      <Tab
        name={
          <>
            Overview <Sup>123</Sup>
          </>
        }
      />
      <Tab
        name={
          <>
            Works for sale <Sup>123</Sup>
          </>
        }
      />
      <Tab name="CV" />
      <Tab
        name={
          <>
            Auction results <Sup>123</Sup>
          </>
        }
      />
    </Tabs>
  )
}

export const ConditionalTabs = () => {
  return (
    <Tabs onChange={action("onChange")}>
      <Tab name="First">First</Tab>
      {false && <Tab name="Second">Second</Tab>}
      <Tab name="Third">Third</Tab>
    </Tabs>
  )
}

export const AutoScrolling = () => {
  return (
    <Tabs onChange={action("onChange")}>
      <Tab name="First">First</Tab>
      <Tab name="Second">Second</Tab>
      <Tab name="Third">Third</Tab>
      <Tab name="Fourth">Fourth</Tab>
      <Tab name="Fifth">Fifth</Tab>
      <Tab name="Sixth">Sixth</Tab>
      <Tab name="Seventh">Seventh</Tab>
      <Tab name="Eighth">Eighth</Tab>
      <Tab name="Nineth">Nineth</Tab>
      <Tab name="Tenth">Tenth</Tab>
      <Tab name="Eleventh">Eleventh</Tab>
      <Tab name="Twelveth">Twelveth</Tab>
      <Tab name="Thirteenth">Thirteenth</Tab>
      <Tab name="Fourteenth">Fourteenth</Tab>
      <Tab name="Fifteenth">Fifteenth</Tab>
    </Tabs>
  )
}
