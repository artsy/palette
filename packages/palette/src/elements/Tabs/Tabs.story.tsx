import { action } from "@storybook/addon-actions"
import React, { useEffect, useState } from "react"
import { States } from "storybook-states"
import { ChevronIcon } from "../../svgs"
import { Sup } from "../Sup"
import { Tab, Tabs, TabsProps } from "./"
import { Box } from "../Box"
import { useCursor } from "use-cursor"
import { Button } from "../Button"

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
  const { index: initialTabIndex, handleNext } = useCursor({ max: 15 })

  useEffect(() => {
    const interval = setInterval(handleNext, 500)
    return () => clearInterval(interval)
  }, [handleNext])

  return (
    <>
      <Tabs initialTabIndex={initialTabIndex} onChange={action("onChange")}>
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

      <pre>{JSON.stringify({ initialTabIndex })}</pre>
    </>
  )
}

AutoScrolling.story = {
  parameters: { chromatic: { disable: true } },
}

export const InitialAutoScroll = () => {
  const [key, setKey] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((key) => key + 1)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Box bg="black10" height={1000} p={2}>
        The vertical scroll of this page should be at the top.
        <br />
        Scroll down to see the tabs.
        <br />
        Render: #{key}
      </Box>

      <Tabs onChange={action("onChange")} initialTabIndex={14}>
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
        <Tab name="Fifteenth">
          This tab should be active &amp; visible on mount.
        </Tab>
      </Tabs>

      <Box bg="black10" height={1000} />
    </>
  )
}

InitialAutoScroll.story = {
  parameters: { chromatic: { disable: true } },
}

// FIXME: Currently renders one step behind
export const Cached = () => {
  const [count, setCount] = useState(1)

  return (
    <>
      <Button
        variant="secondaryOutline"
        size="small"
        mb={1}
        onClick={() => {
          setCount((prevCount) => prevCount + 1)
        }}
      >
        Increment count — count: {count}
      </Button>

      <Tabs>
        <Tab name="First">First — count: {count}</Tab>
        <Tab name="Second">Second — count: {count}</Tab>
        <Tab name="Third">Third — count: {count}</Tab>
      </Tabs>
    </>
  )
}
