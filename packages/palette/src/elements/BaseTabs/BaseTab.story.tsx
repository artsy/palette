import { action } from "@storybook/addon-actions"
import React from "react"
import { BaseTab, BaseTabs } from "."
import { ChevronIcon } from "../../svgs"
import { Box } from "../Box"
import { Clickable } from "../Clickable"

// Fake `RouterLink`
const RouterLink: React.FC<{ to: string }> = ({ to, children, ...rest }) => {
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  )
}

export default { title: "Components/BaseTabs" }

export const Default = () => {
  return (
    <BaseTabs m={3}>
      <BaseTab>First</BaseTab>
      <BaseTab>Second</BaseTab>
      <BaseTab active>Active</BaseTab>
      <BaseTab>Last</BaseTab>
    </BaseTabs>
  )
}

export const AsA = () => {
  return (
    <BaseTabs m={3}>
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
    <BaseTabs m={3}>
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
    <BaseTabs m={3}>
      <BaseTab as={RouterLink} to="#example" activeClassName="active" garbage>
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
    <BaseTabs m={3}>
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
    <Box m={3}>
      <BaseTabs mx={-3} px={3}>
        <BaseTab active>Example</BaseTab>
      </BaseTabs>
    </Box>
  )
}

BreakingOutOfContainerMargin.story = {
  name: "Breaking out of container margin",
}

export const Centered = () => {
  return (
    <BaseTabs m={3} justifyContent="center">
      <BaseTab active>Alone</BaseTab>
    </BaseTabs>
  )
}

export const WithASeparator = () => {
  return (
    <BaseTabs
      m={3}
      separator={<ChevronIcon mx={2} fill="black30" width="12px" />}
    >
      <BaseTab>Review</BaseTab>
      <BaseTab>Confirm</BaseTab>
      <BaseTab active>Pay</BaseTab>
    </BaseTabs>
  )
}

WithASeparator.story = {
  name: "with a separator",
}

export const NestedChildren = () => {
  return (
    <BaseTabs m={3}>
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
