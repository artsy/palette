import React from "react"
import PageIcon from "@artsy/icons/PageIcon"

import { Text } from "../src/elements/Text"
import { Box } from "../src/elements/Box"
import { Spacer } from "../src/elements/Spacer"

export default {
  title: "Palette",
}

export const Introduction = {
  render: () => (
    <Box>
      <Text as="h1" variant={"xxl"}>
        Palette
      </Text>

      <Spacer y={1} />

      <Text>
        Palette is Artsy's design system. This is a collection of primitive,
        product-agnostic elements that help ensure consistency and quality
        across Artsy's products, both in look and feel and overall user
        experience. This project is a collaborative effort between design and
        engineering, intended to be used across all Artsy's product ecosystem.
      </Text>

      <Spacer y={2} />

      <Text>
        Have questions? Join us in #design-system on Slack, we're always happy
        to help.
      </Text>

      <Spacer y={2} />

      <Text as="h2" variant={"xl"}>
        Getting Started
      </Text>

      <Spacer y={1} />

      <Text>To add Palette into your app, install it as a package:</Text>

      <Snippet code={`yarn add @artsy/palette`} />

      <Spacer y={1} />

      <Text>
        And at the root of your component tree instantiate{" "}
        <code>{"<GlobalStyles />"}</code> and add the <code>{"<Theme>"}</code>{" "}
        provider:
      </Text>

      <Snippet
        code={`import { Theme, injectGlobalStyles } from "@artsy/palette"

const { GlobalStyles } = injectGlobalStyles(\`
  // overrides and additions
\`)

export const App = (props) => {
  return (
    <Theme theme="v3">
      <>
        <GlobalStyles />
        ...
      </>
    </Theme>
  )
}`}
      />

      <Spacer y={1} />

      <Text>
        From there you should be able to access the values from Palette's{" "}
        <a
          href="https://github.com/artsy/palette/blob/main/packages/palette/src/Theme.tsx"
          target="_blank"
          rel="noopener noreferrer"
        >
          Theme.tsx
        </a>{" "}
        file:
      </Text>

      <Snippet
        code={`import { BorderBox, Flex, Text } from '@artsy/palette'

const Artworks = props => {
  return (
    <Flex>
      <BorderBox p={2}>
        <Text variant='md'>
          About the work
        </Text>
      </BorderBox>

      <BorderBox ml={2}>
        <Text variant='sm'>
          Details
        </Text>
      </BorderBox>
    </Flex>
  )
}`}
      />

      <Spacer y={2} />

      <Text as="h2" variant={"xl"}>
        Adding Fonts
      </Text>

      <Spacer y={1} />

      <Text>
        In order to use Artsy's fonts, you'll also want to add our webfont file
        to the CSS in the header of your app. Here are a few common examples:
      </Text>

      <Spacer y={1} />

      <Text>
        Add to the <code>head</code> of your document:
      </Text>

      <Snippet
        code={`<head>
  <link
    href="https://webfonts.artsy.net/all-webfonts.css"
    rel="stylesheet"
    type="text/css"
  />
</head>`}
      />

      <Spacer y={1} />

      <Text>
        Using{" "}
        <a
          href="https://github.com/tizmagik/react-head"
          target="_blank"
          rel="noopener noreferrer"
        >
          react-head
        </a>
        :
      </Text>

      <Snippet
        code={`import { HeadProvider, Link } from "react-head"

const App = () => (
  <HeadProvider>
    <Link
      href="https://webfonts.artsy.net/all-webfonts.css"
      rel="stylesheet"
      type="text/css"
    />
  </HeadProvider>
)`}
      />

      <Spacer y={1} />

      <Text>
        Using{" "}
        <a
          href="https://github.com/nfl/react-helmet"
          target="_blank"
          rel="noopener noreferrer"
        >
          React Helmet
        </a>
        :
      </Text>

      <Snippet
        code={`import { Helmet } from "react-helmet"

const App = () => (
  <Helmet>
    <link
      href="https://webfonts.artsy.net/all-webfonts.css"
      rel="stylesheet"
      type="text/css"
    />
  </Helmet>
)`}
      />

      <Spacer y={1} />

      <Text>
        If you're using Next.js, Gatsby or any other framework the patterns
        should be similar.
      </Text>
    </Box>
  ),
}

export const Accessibility = {
  render: () => {
    return (
      <Box>
        <Text as="h1" variant={"xl"}>
          Accessibility
        </Text>

        <Spacer y={1} />

        <Text>
          In general components in Palette are built with accessibility
          best-practices in mind, however they may still have some issues. When
          encountering problems of any kind please file bugs with the{" "}
          <a
            href="https://artsyproduct.atlassian.net/jira/software/projects/DSWGW/boards/98"
            target="_blank"
            rel="noopener noreferrer"
          >
            Design System Working Group
          </a>{" "}
          or (if external to Artsy){" "}
          <a
            href="https://github.com/artsy/palette/issues/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            leave an issue on Github
          </a>
          .
        </Text>

        <Spacer y={2} />

        <Text as="h2" variant={"lg"}>
          Click handlers
        </Text>

        <Spacer y={1} />

        <Text>
          When adding click handlers to UI that aren't explicitly Palette{" "}
          <code>Button</code>s or anchor tags with valid <code>href</code>s,
          utilize the <code>Clickable</code> component. <code>Clickable</code>{" "}
          is a stripped down <code>button</code> tag which implements{" "}
          <code>Box</code>.
        </Text>

        <Spacer y={1} />

        <Text as="h3" variant={"md"}>
          Do
        </Text>

        <Spacer y={0.5} />

        <Snippet
          code={`<Clickable onClick={handleClick}>Example</Clickable>`}
        />

        <Spacer y={1} />

        <Text as="h3" variant={"md"}>
          Don't
        </Text>

        <Spacer y={0.5} />

        <Snippet code={`<Box onClick={handleClick}>Example</Box>`} />

        <Spacer y={2} />

        <Text as="h2" variant={"lg"}>
          Alternative Text
        </Text>

        <Spacer y={1} />

        <Text>
          When using inserting images ensure they have an <code>alt</code>{" "}
          attribute. The <code>alt</code> attribute should typically:
        </Text>

        <Spacer y={1} />

        <Box as="ul" pl={2}>
          <Text as="li" my={1}>
            • Be accurate and equivalent in presenting the same content and
            function of the image.
          </Text>
          <Text as="li" my={1}>
            • Be succinct. This means the correct content (if there is content)
            and function (if there is a function) of the image should be
            presented as succinctly as is appropriate. Typically no more than a
            few words are necessary, though rarely a short sentence or two may
            be appropriate.
          </Text>
          <Text as="li" my={1}>
            • NOT be redundant or provide the same information as text within
            the context of the image.
          </Text>
          <Text as="li" my={1}>
            • NOT use the phrases "image of ..." or "graphic of ..." to describe
            the image. It is usually apparent to the user that it is an image.
            And if the image is conveying content, it is typically not necessary
            that the user know that it is an image that is conveying the
            content, as opposed to text. If the fact that an image is a
            photograph or illustration, etc. is important content, it may be
            useful to include this in alternative text.
          </Text>
        </Box>

        <Spacer y={1} />

        <Text>
          (Via{" "}
          <a
            href="https://webaim.org/techniques/alttext/"
            target="_blank"
            rel="noopener noreferrer"
          >
            WebAIM guide
          </a>
          .)
        </Text>

        <Spacer y={1} />

        <Text>
          A common problem throughout Artsy's codebase is the existence of
          redundant <code>alt</code> text for images which are used more as
          large anchor surfaces which are described by the text underneath them.
          In situations like this a blank alt tag (<code>alt=""</code>) is
          acceptable.
        </Text>
      </Box>
    )
  },
}

export const Developing = {
  name: "Developing for Palette",
  render: () => {
    return (
      <Box>
        <Text as="h1" variant={"xl"}>
          Developing for Palette
        </Text>

        <Spacer y={1} />

        <Text>
          When working with Palette there are a number of things to be aware of,
          be it adding new components, modifying the theme or updating docs. Read
          on to learn how it's done.
        </Text>

        <Spacer y={2} />

        <Text as="h2" variant={"lg"}>
          Overview
        </Text>

        <Spacer y={1} />

        <Box as="ul" pl={2}>
          <Text as="li" my={1}>
            • During development most of your time will be spent in{" "}
            <a
              href="https://github.com/artsy/palette/tree/main/packages/palette"
              target="_blank"
              rel="noopener noreferrer"
            >
              <code>packages/palette</code>
            </a>
            , the main Palette library. Here you'll write new components inside
            of the <code>elements</code> folder, add tests, and define{" "}
            <a
              href="https://github.com/artsy/palette/blob/main/packages/palette/src/elements/Avatar/Avatar.story.tsx"
              target="_blank"
              rel="noopener noreferrer"
            >
              storybook stories
            </a>{" "}
            for each.
          </Text>
          <Text as="li" my={1}>
            • If adding or changing a component, make sure to update the docs in{" "}
            <a
              href="https://github.com/artsy/palette/tree/main/packages/palette-docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <code>packages/palette-docs</code>
            </a>
            .
          </Text>
          <Text as="li" my={1}>
            • If needing to modify the theme, see{" "}
            <a
              href="https://github.com/artsy/palette/tree/main/packages/palette-tokens"
              target="_blank"
              rel="noopener noreferrer"
            >
              <code>packages/palette-tokens</code>
            </a>
            .
          </Text>
          <Text as="li" my={1}>
            • New package versions are published by attaching appropriate semver
            github labels to PRs; by default, all PRs have <code>minor</code>{" "}
            automatically assigned. When a PR is merged, a new version goes out.
          </Text>
          <Text as="li" my={1}>
            • If only updating docs, remove the default <code>minor</code> label
            and attach a <code>docs</code> label. This will skip the{" "}
            <code>npm publish</code> step.
          </Text>
          <Text as="li" my={1}>
            • To publish a canary version to NPM to test in other apps, add the{" "}
            <code>canary</code> label. Once CircleCI is done running, view the{" "}
            <code>auto/publishing-canary</code> job output to see the npm version
            number and then update the consuming app accordingly.
          </Text>
          <Text as="li" my={1}>
            • Alternatively, you can use <code>yarn link</code> to test your
            changes in Force, or any other app. Run
          </Text>
        </Box>

        <Spacer y={1} />

        <Snippet
          code={`cd packages/palette
yarn link
yarn watch`}
        />

        <Spacer y={1} />

        <Text>And then back in your app, run</Text>

        <Spacer y={1} />

        <Snippet
          code={`yarn link @artsy/palette
yarn start`}
        />

        <Spacer y={1} />

        <Text>
          <strong>Note:</strong> When <code>yarn link</code>'ing Palette, there
          are some issues with type-checking that can be confusing and lead to
          false-positives. Also, when done, be sure to run{" "}
          <code>yarn unlink @artsy/palette && yarn --check-files</code> to
          re-install the latest version of Palette from NPM; many a dev has
          fallen down the rabbit hole of trying to fix type errors that aren't
          actually errors due to forgetting that Palette is currently{" "}
          <code>yarn link</code>'d.
        </Text>

        <Spacer y={2} />

        <Text as="h2" variant={"lg"}>
          Relevant Commands
        </Text>

        <Spacer y={1} />

        <Snippet
          code={`yarn storybook
yarn docs
yarn test
yarn type-check`}
        />

        <Spacer y={1} />

        <Text>
          See <code>packages/&lt;package-name&gt;/package.json</code> for
          complete list.
        </Text>

        <Spacer y={2} />

        <Text as="h2" variant={"lg"}>
          Monorepo Structure
        </Text>

        <Spacer y={1} />

        <Text>
          Palette is a{" "}
          <a
            href="https://lerna.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            monorepo
          </a>{" "}
          that is composed of a number of sub-packages:
        </Text>

        <Spacer y={1} />

        <Box as="ul" pl={2}>
          <Text as="li" my={0.5}>
            • <code>palette-tokens</code>
          </Text>
          <Text as="li" my={0.5}>
            • <code>palette</code>
          </Text>
          <Text as="li" my={0.5}>
            • <code>palette-docs</code>
          </Text>
          <Text as="li" my={0.5}>
            • <code>palette-charts</code>
          </Text>
        </Box>

        <Spacer y={2} />

        <Text as="h3" variant={"md"}>
          palette-tokens
        </Text>

        <Spacer y={1} />

        <Text>
          Starting at <code>palette-tokens</code>, we can see the{" "}
          <a
            href="https://github.com/artsy/palette/blob/main/packages/palette-tokens/src/themes/v3.tsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            theme
          </a>{" "}
          that powers all of Palette. This is a simple object with keys such as{" "}
          <code>breakpoints</code>, <code>space</code> and <code>color</code>,
          and is read in by the main <code>palette</code> lib as well as{" "}
          <a
            href="https://github.com/artsy/eigen"
            target="_blank"
            rel="noopener noreferrer"
          >
            Eigen
          </a>
          , our React Native mobile app.
        </Text>

        <Spacer y={2} />

        <Text as="h3" variant={"md"}>
          palette
        </Text>

        <Spacer y={1} />

        <Text>
          The <code>palette</code> package is where all of our components are
          defined. See the{" "}
          <a
            href="https://github.com/artsy/palette/tree/main/packages/palette/src/elements"
            target="_blank"
            rel="noopener noreferrer"
          >
            elements
          </a>{" "}
          folder for the complete list.
        </Text>

        <Spacer y={2} />

        <Text as="h3" variant={"md"}>
          palette-docs
        </Text>

        <Spacer y={1} />

        <Text>
          This is a where our docs are created, built on top of{" "}
          <a
            href="https://www.gatsbyjs.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gatsby
          </a>
          . Docs are written in <code>.mdx</code> (Markdown React) which allows
          us to create live, interactive code examples using real Palette
          components.
        </Text>

        <Spacer y={2} />

        <Text as="h3" variant={"md"}>
          palette-charts
        </Text>

        <Spacer y={1} />

        <Text>
          This is where our charting components live, built on top of{" "}
          <a
            href="https://d3js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            D3.js
          </a>
          .
        </Text>
      </Box>
    )
  },
}

export const How = {
  name: "How Palette Works",
  render: () => {
    return (
      <Box>
        <Text as="h1" variant={"xl"}>
          How Palette Works
        </Text>

        <Spacer y={1} />

        <Text>TKTK</Text>
      </Box>
    )
  },
}

export const Migrating = {
  name: "Migrating from v2 to v3",
  render: () => {
    return (
      <Box>
        <Text as="h1" variant={"xl"}>
          Migrating from v2 to v3
        </Text>

        <Spacer y={1} />

        <Text>TKTK</Text>
      </Box>
    )
  },
}

export const Responsive = {
  name: "Responsive Props",
  render: () => {
    return (
      <Box>
        <Text as="h1" variant={"xl"}>
          Responsive Props
        </Text>

        <Spacer y={1} />

        <Text>TKTK</Text>
      </Box>
    )
  },
}

const Snippet = ({ code }: { code: string }) => {
  const [isHovered, setIsHovered] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <pre
      style={{
        position: "relative",
        background: "#f6f6f6",
        padding: "1rem",
        borderRadius: "4px",
        overflowX: "auto",
      }}
    >
      <button
        onClick={handleCopy}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: isHovered ? "#e0e0e0" : "transparent",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          padding: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s ease",
        }}
        title="Copy to clipboard"
      >
        <PageIcon width={20} height={20} />
      </button>
      <code>{code}</code>
    </pre>
  )
}
