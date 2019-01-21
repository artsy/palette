import { Box, Sans, Serif, Spacer, Tab, Tabs, Toggle } from "@artsy/palette"
import { PropsTable } from "app/components/PropsTable"
import { StatusBadge } from "app/components/StatusBadge"
import React from "react"
import styled from "styled-components"

export const ContentArea = props => {
  return (
    <Container>
      <InnerContent>
        {props.children}

        <Serif size="8" color="black100">
          Textfields <StatusBadge status="WIP" />
        </Serif>

        <Spacer mb={3} />

        <Tabs>
          <Tab name="Code">
            <Sans size="4" weight="medium">
              Usage
            </Sans>
            <Sans size="3">
              Lorem ipsum copy here. Lorem ipsum copy here. Lorem ipsum copy
              here. Lorem ipsum copy here. Lorem ipsum copy here. Lorem ipsum
              copy here. Lorem ipsum copy here.
            </Sans>

            <PropsTable />

            <Box mt={4} mb={2}>
              <Sans size="4" weight="medium">
                Usage
              </Sans>
            </Box>

            <Toggle label="Without label" expanded>
              <Sans size="3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Sans>
            </Toggle>
            <Toggle label="With label" expanded>
              <Sans size="3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Sans>
            </Toggle>
          </Tab>
          <Tab name="Guidelines">Guidelines</Tab>
          <Tab name="Notes">Notes</Tab>
        </Tabs>
      </InnerContent>
    </Container>
  )
}

const Container = styled(Box)`
  margin: 0 auto;
  flex-grow: 1;
`

const InnerContent = styled(Box).attrs({
  width: "100%",
  maxWidth: 1192,
})``
