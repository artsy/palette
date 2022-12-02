import React, { useState } from "react"
import { States } from "storybook-states"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Pill, PillProps, PillVariant, PILL_VARIANT_NAMES } from "./Pill"
import { Box } from "../Box"
import { Join } from "../Join"
import { GraphIcon } from "../../svgs"
import styled from "styled-components"

export default {
  title: "Components/Pill",
}

const Display = styled(Box)``
Display.displayName = "Pill"

export const Variants = () => {
  return (
    <States<PillProps>
      states={PILL_VARIANT_NAMES.map((variant) => ({
        variant: variant as PillVariant,
      }))}
    >
      {(props) => (
        <Display
          p={1}
          overflowX="auto"
          {...(["primaryWhite", "secondaryWhite"].includes(`${props.variant}`)
            ? { bg: "black100", color: "white100" }
            : { bg: "white100", color: "black100" })}
        >
          <Flex>
            <Join separator={<Spacer x={2} />}>
              <Pill {...props}>Default</Pill>

              <Pill {...props} focus>
                Focus
              </Pill>

              <Pill {...props} hover>
                Hover
              </Pill>

              <Pill {...props} active>
                Active
              </Pill>

              <Pill {...props} selected>
                Selected
              </Pill>

              <Pill {...props} disabled>
                Disabled
              </Pill>
            </Join>
          </Flex>
        </Display>
      )}
    </States>
  )
}

export const LinkExample = () => {
  return (
    <Pill
      variant="artist"
      as="a"
      // TODO: Need a decent way of typing the threaded polymorphic `as` prop
      // @ts-expect-error  MIGRATE_STRICT_MODE
      href="#example"
    >
      Artist Name
    </Pill>
  )
}

export const LongExampleWithTruncation = () => {
  return (
    <Pill maxWidth={300}>
      Studio Museum in Harlem Artist-in-Residence (AIR) Program
    </Pill>
  )
}

export const SearchWithCount = () => {
  return (
    <States<PillProps>
      states={[
        {},
        { focus: true },
        { hover: true },
        { active: true },
        { selected: true },
        { disabled: true },
      ]}
    >
      <Pill variant="search" count={123}>
        Artist Series
      </Pill>
    </States>
  )
}

export const ArtistWithImage = () => {
  return (
    <States<PillProps>
      states={[
        {},
        { focus: true },
        { hover: true },
        { active: true },
        { selected: true },
        { disabled: true },
      ]}
    >
      <Pill
        variant="artist"
        src={[
          "https://picsum.photos/seed/isa/30/30",
          "https://picsum.photos/seed/isa/60/60",
        ]}
      >
        Isa Genzken
      </Pill>
    </States>
  )
}

export const PillWithIcon = () => {
  return (
    <States<PillProps>
      states={[
        {},
        { focus: true },
        { hover: true },
        { active: true },
        { selected: true },
        { disabled: true },
        { variant: "search" },
        { variant: "search", focus: true },
        { variant: "search", hover: true },
        { variant: "search", active: true },
        { variant: "search", selected: true },
        { variant: "search", disabled: true },
        { variant: "filter" },
        { variant: "filter", focus: true },
        { variant: "filter", hover: true },
        { variant: "filter", active: true },
        { variant: "filter", selected: true },
        { variant: "filter", disabled: true },
      ]}
    >
      <Pill variant="badge" Icon={GraphIcon}>
        Artist Series
      </Pill>
    </States>
  )
}

export const Demo = () => {
  const [selected, setSelected] = useState(false)
  return (
    <Pill
      selected={selected}
      onClick={() => setSelected((prevActive) => !prevActive)}
    >
      Example
    </Pill>
  )
}
