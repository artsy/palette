import { fn } from "@storybook/test"
import React, { useEffect, useState } from "react"
import { States } from "storybook-states"
import { Sup } from "../Sup"
import { Tab, Tabs, TabsProps } from "./"
import { Box } from "../Box"
import { useCursor } from "use-cursor"
import { Button } from "../Button"
import { Input } from "../Input"
import { STYLED_SYSTEM_PROPS_BLACKLIST } from "../../shared/PropsBlacklist"

export default {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Tabs component provides a tabbed interface for organizing content into separate panels. Supports keyboard navigation, custom initial tab selection, and flexible layout options.",
      },
      controls: {
        exclude: STYLED_SYSTEM_PROPS_BLACKLIST,
      },
    },
  },
}

export const Default = {
  args: {
    onChange: fn(),
    children: [
      <Tab name="Overview" key="overview">
        Overview panel
      </Tab>,
      <Tab name="Works for sale" key="works">
        Works for sale panel
      </Tab>,
      <Tab name="CV" key="cv">
        CV panel
      </Tab>,
      <Tab name="Auction results" key="auctions">
        Auction results panel
      </Tab>,
    ],
  },
}

export const WithStates = {
  render: () => {
    return (
      <States<Partial<TabsProps>>
        states={[{}, { initialTabIndex: 2 }, { justifyContent: "center" }]}
      >
        <Tabs onChange={fn()}>
          <Tab name="Overview">Overview panel</Tab>
          <Tab name="Works for sale">Works for sale panel</Tab>
          <Tab name="CV">CV panel</Tab>
          <Tab name="Auction results">Auction results panel</Tab>
        </Tabs>
      </States>
    )
  },
}

export const WithData = {
  render: () => {
    const [data, setData] = useState({ name: "Pending" })

    return (
      <>
        <Tabs
          onChange={(tabInfo) => {
            if (!tabInfo) return

            setData(tabInfo.data)
          }}
        >
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
  },
}

export const Counts = {
  render: () => {
    return (
      <Tabs onChange={fn()}>
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
  },
}

export const ConditionalTabs = {
  render: () => {
    return (
      <Tabs onChange={fn()}>
        <Tab name="First">First</Tab>
        {false && <Tab name="Second">Second</Tab>}
        <Tab name="Third">Third</Tab>
      </Tabs>
    )
  },
}

export const AutoScrolling = {
  render: () => {
    const { index: initialTabIndex, handleNext } = useCursor({ max: 15 })

    useEffect(() => {
      const interval = setInterval(handleNext, 500)
      return () => clearInterval(interval)
    }, [handleNext])

    return (
      <>
        <Tabs initialTabIndex={initialTabIndex} onChange={fn()}>
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
  },
  parameters: { chromatic: { disable: true } },
}

export const InitialAutoScroll = {
  render: () => {
    const [key, setKey] = useState(1)

    useEffect(() => {
      const interval = setInterval(() => {
        setKey((key) => key + 1)
      }, 500)

      return () => clearInterval(interval)
    }, [])

    return (
      <>
        <Box bg="mono10" height={1000} p={2}>
          The vertical scroll of this page should be at the top.
          <br />
          Scroll down to see the tabs.
          <br />
          Render: #{key}
        </Box>

        <Tabs onChange={fn()} initialTabIndex={14}>
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

        <Box bg="mono10" height={1000} />
      </>
    )
  },
  parameters: { chromatic: { disable: true } },
}

// FIXME: Currently renders one step behind
export const Cached = {
  render: () => {
    const [count, setCount] = useState(1)

    return (
      <>
        <Button
          variant="secondaryBlack"
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
  },
}

export const WithInputs = {
  render: () => {
    const [value, setValue] = useState("")
    const [value2, setValue2] = useState("")

    return (
      <Tabs>
        <Tab name="First">
          <pre>{JSON.stringify({ value })}</pre>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Tab>

        <Tab name="Second">
          <pre>{JSON.stringify({ value2 })}</pre>
          <Input value={value2} onChange={(e) => setValue2(e.target.value)} />
        </Tab>
      </Tabs>
    )
  },
}
