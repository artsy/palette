// @ts-check

/**
 * Components added here should be available globally, both to the Playground as
 * well as to NetlifyCMS. Since it is shared across both systems, it has to exist
 * outside of the normal .tsx pipeline.
 */

import React from "react"
import { Sans, Serif, Box } from "@artsy/palette"
import * as Palette from "@artsy/palette"
// import * as RP from "react-powerplug"

export const PaletteComponents = Palette

// Components in this list represent all the various elements that can be rendered
// in markdown. Still need to fill this out a bit!
export const MarkdownComponents = {
  h1: props => (
    <Serif size="8" color="black100">
      {props.children}
    </Serif>
  ),
  h2: props => (
    <Serif size="6" color="black100">
      {props.children}
    </Serif>
  ),
  h3: props => (
    <Serif size="5" color="black100">
      {props.children}
    </Serif>
  ),
  h4: props => (
    <Serif size="4" color="black100">
      {props.children}
    </Serif>
  ),
  p: props => (
    <Box my={1}>
      <Sans size="3" color="black100">
        {props.children}
      </Sans>
    </Box>
  ),
}
