import React from "react"
import { States } from "storybook-states"
import styled from "styled-components"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Pill, PillProps } from "./Pill"

export default {
  title: "Components/Pill",
}

export const _States = () => {
  return (
    <States<PillProps> states={[{}, { hover: true }, { focus: true }]}>
      <Pill>Pill</Pill>
    </States>
  )
}

_States.story = {
  name: "States",
}

const _Demo = styled(Flex)``
_Demo.displayName = "Pill"

export const Variants = () => {
  return (
    <States<PillProps>
      states={[
        {},
        { variant: "textRound", children: "Text Pill" },
        { variant: "textSquare", children: "Text Pill" },
        { variant: "filter", children: "Filter Pill" },
        {
          variant: "artist",
          children: "Artist Name Pill",
          src: [
            "https://picsum.photos/seed/user/30/30",
            "https://picsum.photos/seed/user/60/60",
          ],
        },
        {
          variant: "artist",
          children: "Artist Name Pill",
        },
        {
          variant: "artist",
          children: "Artist Name Pill",
          src: "https://picsum.photos/seed/user/30/30",
        },
      ]}
    >
      {(props) => {
        return (
          <_Demo>
            <Pill {...props}>Pill</Pill>

            <Spacer mx={0.5} />

            <Pill {...props} focus>
              Pill
            </Pill>

            <Spacer mx={0.5} />

            <Pill {...props} hover>
              Pill
            </Pill>

            {props.variant !== "artist" && (
              <>
                <Spacer mx={0.5} />

                <Pill {...props} active>
                  Pill
                </Pill>
              </>
            )}
          </_Demo>
        )
      }}
    </States>
  )
}

export const LinkExample = () => {
  return (
    <Pill
      variant="artist"
      as="a"
      // TODO: Need a decent way of typing the threaded polymorphic `as` prop
      // @ts-ignore
      href="#example"
    >
      Artist Name
    </Pill>
  )
}
