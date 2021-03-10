import { action } from "@storybook/addon-actions"
import React from "react"
import { States } from "storybook-states"
import { BaseTab, BaseTabs } from "."
import { ChevronIcon } from "../../svgs"
import { Box } from "../Box"
import { Clickable } from "../Clickable"
import { BaseTabProps } from "./BaseTab"
import { BaseTabsProps } from "./BaseTabs"

// Fake `RouterLink`
const RouterLink: React.FC<{ to: string }> = ({ to, children, ...rest }) => {
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  )
}

export default { title: "Components/BaseTabs" }

export const _BaseTab = () => {
  return (
    <States<BaseTabProps>
      states={[{}, { focus: true }, { hover: true }, { active: true }]}
    >
      <BaseTab>Example</BaseTab>
    </States>
  )
}

export const Default = () => {
  return (
    <States<Partial<BaseTabsProps>>
      states={[
        {},
        { fill: true },
        { separator: <ChevronIcon mx={2} fill="black30" width="12px" /> },
        { justifyContent: "center" },
      ]}
    >
      <BaseTabs>
        <BaseTab>First</BaseTab>
        <BaseTab>Second</BaseTab>
        <BaseTab active>Active</BaseTab>
        <BaseTab>Last</BaseTab>
      </BaseTabs>
    </States>
  )
}

export const AsA = () => {
  return (
    <BaseTabs>
      <BaseTab as="a" href="#overview">
        Overview
      </BaseTab>

      <BaseTab as="a" href="#cv">
        CV
      </BaseTab>

      <BaseTab as="a" href="#shows" active>
        Shows
      </BaseTab>

      <BaseTab as="a" href="#auction-results">
        Auction Results
      </BaseTab>

      <BaseTab as="a" href="#articles">
        Articles
      </BaseTab>

      <BaseTab as="a" href="#related-artists">
        Related Artists
      </BaseTab>
    </BaseTabs>
  )
}

AsA.story = {
  name: 'as="a"',
}

export const AsClickable = () => {
  return (
    <BaseTabs>
      <BaseTab as={Clickable} onClick={action("onClick")}>
        Overview
      </BaseTab>

      <BaseTab as={Clickable} onClick={action("onClick")}>
        CV
      </BaseTab>

      <BaseTab as={Clickable} onClick={action("onClick")} active>
        Shows
      </BaseTab>

      <BaseTab as={Clickable} onClick={action("onClick")}>
        Auction Results
      </BaseTab>

      <BaseTab as={Clickable} onClick={action("onClick")}>
        Articles
      </BaseTab>

      <BaseTab as={Clickable} onClick={action("onClick")}>
        Related Artists
      </BaseTab>
    </BaseTabs>
  )
}

AsClickable.story = {
  name: "as={Clickable}",
}

export const AsRouterLink = () => {
  return (
    <BaseTabs>
      <BaseTab
        as={RouterLink}
        // @ts-ignore
        to="#example"
        activeClassName="active"
        garbage
      >
        Example
      </BaseTab>
    </BaseTabs>
  )
}

AsRouterLink.story = {
  name: "as={RouterLink}",
}

export const Overflowing = () => {
  return (
    <BaseTabs>
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
      ].map((label, i) => {
        return (
          <BaseTab key={label} active={i === 1}>
            {label}
          </BaseTab>
        )
      })}
    </BaseTabs>
  )
}

export const Fill = () => {
  return (
    <Box m={3}>
      <BaseTabs fill my={3}>
        <BaseTab as="a" href="#">
          One
        </BaseTab>
      </BaseTabs>

      <BaseTabs fill my={3}>
        <BaseTab as="a" href="#">
          One
        </BaseTab>

        <BaseTab as="a" href="#" active>
          Two
        </BaseTab>
      </BaseTabs>

      <BaseTabs fill my={3}>
        <BaseTab as="a" href="#">
          One
        </BaseTab>

        <BaseTab as="a" href="#" active>
          Two
        </BaseTab>

        <BaseTab as="a" href="#">
          Three
        </BaseTab>
      </BaseTabs>
    </Box>
  )
}

export const BreakingOutOfContainerMargin = () => {
  return (
    <Box m={6} bg="black10">
      <BaseTabs mx={-6} px={6}>
        <BaseTab active>
          Rail border should extend past black10 background
        </BaseTab>
      </BaseTabs>
    </Box>
  )
}

BreakingOutOfContainerMargin.story = {
  name: "Breaking out of container margin",
}

export const NestedChildren = () => {
  return (
    <BaseTabs>
      <>
        <BaseTab>First</BaseTab>
        <BaseTab>Second</BaseTab>
        <>
          <BaseTab active>Active</BaseTab>
          <BaseTab>Last</BaseTab>
        </>
      </>
    </BaseTabs>
  )
}

NestedChildren.story = {
  name: "nested children",
}
