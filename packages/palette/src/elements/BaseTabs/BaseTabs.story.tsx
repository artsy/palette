import { fn } from "@storybook/test"
import React from "react"
import { BaseTab, BaseTabs } from "../BaseTabs"
import { Box } from "../Box"
import { Clickable } from "../Clickable"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

// Fake `RouterLink`
const RouterLink: React.FC<React.PropsWithChildren<{ to: string }>> = ({
  to,
  children,
  ...rest
}) => {
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  )
}

export default {
  title: "Components/BaseTabs",
  component: BaseTabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "BaseTabs component for creating tabbed navigation interfaces. Provides horizontal overflow handling and supports various tab configurations including fill width and custom tab implementations.",
      },
      controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
    },
  },
}

export const Default = {
  args: {
    children: (
      <>
        <BaseTab>First</BaseTab>
        <BaseTab>Second</BaseTab>
        <BaseTab active>Active</BaseTab>
        <BaseTab>Last</BaseTab>
      </>
    ),
  },
}

export const WithFill = {
  args: {
    fill: true,
    children: (
      <>
        <BaseTab>First</BaseTab>
        <BaseTab>Second</BaseTab>
        <BaseTab active>Active</BaseTab>
        <BaseTab>Last</BaseTab>
      </>
    ),
  },
}

export const AsAnchorTags = {
  args: {
    children: (
      <>
        <BaseTab as="a" href="#overview">
          Overview
        </BaseTab>
        <BaseTab as="a" href="#cv">
          CV
        </BaseTab>
        <BaseTab as="a" href="#shows" active>
          Shows
        </BaseTab>
        <BaseTab as="a" href="#articles">
          Articles
        </BaseTab>
      </>
    ),
  },
}

export const AsClickable = {
  args: {
    children: (
      <>
        <BaseTab as={Clickable} onClick={fn()}>
          Overview
        </BaseTab>
        <BaseTab as={Clickable} onClick={fn()}>
          CV
        </BaseTab>
        <BaseTab as={Clickable} onClick={fn()} active>
          Shows
        </BaseTab>
        <BaseTab as={Clickable} onClick={fn()}>
          Articles
        </BaseTab>
      </>
    ),
  },
}

export const AsRouterLink = {
  args: {
    children: (
      <BaseTab as={RouterLink} to="#example" activeClassName="active">
        Example
      </BaseTab>
    ),
  },
}

export const Overflowing = {
  args: {
    children: (
      <>
        <BaseTab>Artworks (580656)</BaseTab>
        <BaseTab active>Artists (8)</BaseTab>
        <BaseTab>Collections (7)</BaseTab>
        <BaseTab>Artist Series (13)</BaseTab>
        <BaseTab>Galleries (4)</BaseTab>
        <BaseTab>Shows (3667)</BaseTab>
        <BaseTab>Categories (21)</BaseTab>
        <BaseTab>Articles (656)</BaseTab>
        <BaseTab>Auctions (23)</BaseTab>
        <BaseTab>More (46)</BaseTab>
      </>
    ),
  },
}

export const BreakingOutOfContainerMargin = {
  args: {
    mx: -6,
    px: 6,
    children: (
      <BaseTab active>Rail border should extend past container</BaseTab>
    ),
  },
  decorators: [
    (Story) => (
      <Box m={6} bg="mono10">
        <Story />
      </Box>
    ),
  ],
}

export const NestedChildren = {
  args: {
    children: (
      <>
        <BaseTab>First</BaseTab>
        <BaseTab>Second</BaseTab>
        <>
          <BaseTab active>Active</BaseTab>
          <BaseTab>Last</BaseTab>
        </>
      </>
    ),
  },
}
