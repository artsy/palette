import React from "react"
import PageIcon from "@artsy/icons/PageIcon"

import { Text } from "../src/elements/Text"
import { Spacer } from "../src/elements/Spacer"

export default {
  title: "Palette",
}

export const Introduction = {
  render: () => (
    <div>
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
    </div>
  ),
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
