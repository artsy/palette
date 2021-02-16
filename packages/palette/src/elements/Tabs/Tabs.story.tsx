import { action } from "@storybook/addon-actions"
import React from "react"
import { Box } from "../Box"
import { Tab, Tabs } from "./"

export default {
  title: "Components/Tabs",
}

export const _Tabs = () => {
  return (
    <Box m={3}>
      <Tabs onChange={action("onChange")}>
        <Tab name="Overview">Overview panel</Tab>
        <Tab name="CV">CV panel</Tab>
      </Tabs>
    </Box>
  )
}

export const AutoScroll = () => {
  return (
    <Box m={3}>
      <Tabs onChange={action("onChange")}>
        {[
          "Artworks (580656)",
          "Artists (8)",
          "Collections (7)",
          "Artist Series (13)",
          "Galleries (4)",
          "Shows (3667)",
          "Categories (21)",
          "Articles (656)",
          "Auctions (23)",
          "More (46)",
        ].map((label) => {
          return (
            <Tab key={label} name={label}>
              {label} content
            </Tab>
          )
        })}
      </Tabs>
    </Box>
  )
}

AutoScroll.story = {
  name: "autoScroll",
}
