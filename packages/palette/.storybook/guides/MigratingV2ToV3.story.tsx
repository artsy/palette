import React from "react"
import { Text } from "../../src/elements/Text"
import { Box } from "../../src/elements/Box"
import { Spacer } from "../../src/elements/Spacer"
import { BorderBox } from "../../src/elements/BorderBox"
import { Snippet } from "./shared/Snippet"

export default {
  title: "Guides",
}

export const MigratingV2ToV3 = {
  name: "Migrating from v2 to v3",
  render: () => {
    return (
      <Box>
        <Text as="h1" variant={"xl"}>
          Migrating from v2 to v3
        </Text>

        <Spacer y={1} />

        <Text>
          In an attempt to make our brand more consistent and easier to design
          for, in 2021 we began the process of simplifying Palette to reduce the
          amount of visual information in the system. Less Typography choices,
          less spacing options, less colors. While this has largely gone
          smoothly, there are some things to be aware of.
        </Text>

        <Spacer y={1} />

        <Text>
          <strong>
            For reference, check out the difference between our v2 and v3 themes
            below:
          </strong>
        </Text>

        <Spacer y={1} />

        <Text>
          <strong>v2</strong>:{" "}
          <a
            href="https://github.com/artsy/palette/blob/main/packages/palette-tokens/src/themes/v2.tsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            palette-tokens/v2
          </a>
        </Text>

        <Spacer y={0.5} />

        <Text>
          <strong>v3</strong>:{" "}
          <a
            href="https://github.com/artsy/palette/blob/main/packages/palette-tokens/src/themes/v3.tsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            palette-tokens/v3
          </a>
        </Text>

        <Spacer y={2} />

        <Text as="h2" variant={"lg"}>
          How to Migrate
        </Text>

        <Spacer y={1} />

        <Text>
          While most migration work will be happening in{" "}
          <a
            href="https://github.com/artsy/force"
            target="_blank"
            rel="noopener noreferrer"
          >
            Force
          </a>
          , we use Palette all across Artsy, including a lighter React Native
          version in{" "}
          <a
            href="https://github.com/artsy/eigen"
            target="_blank"
            rel="noopener noreferrer"
          >
            Eigen
          </a>
          . Each app will likely have its own patterns for toggling between v2
          and v3, but in short migrating is as simple as importing the{" "}
          <code>&lt;ThemeProviderV3&gt;</code> context and placing it at the top
          of the component tree that you'd like to migrate:
        </Text>

        <Spacer y={1} />

        <Snippet
          code={`import { ThemeProviderV3 } from "@artsy/palette"

const MyApp = () => {
  return (
    <ThemeProviderV3>
      <App />
    </ThemeProviderV3>
  )
}`}
        />

        <Spacer y={1} />

        <Text>
          Alternatively, you can set the theme version using the main{" "}
          <code>&lt;Theme&gt;</code> component:
        </Text>

        <Spacer y={1} />

        <Snippet
          code={`import { Theme } from "@artsy/palette"

const MyApp = () => {
  return (
    <Theme theme="v3">
      <App />
    </Theme>
  )
}`}
        />

        <Spacer y={1} />

        <Text>
          This is useful if you're programmatically setting things, as we do in
          Force{" "}
          <a
            href="https://github.com/artsy/force/blob/main/src/v2/Apps/Artwork/artworkRoutes.tsx#L14"
            target="_blank"
            rel="noopener noreferrer"
          >
            via our route config
          </a>
          .
        </Text>

        <Spacer y={1} />

        <Text>
          Once the component tree is wrapped in the correct provider you should
          be able to access our{" "}
          <a
            href="https://github.com/artsy/palette/blob/main/packages/palette-tokens/src/themes/v3.tsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            v3 theme
          </a>
          .
        </Text>

        <Spacer y={2} />

        <Text as="h2" variant={"lg"}>
          Using the <code>useThemeConfig</code> hook
        </Text>

        <Spacer y={1} />

        <Text>
          The <code>useThemeConfig</code> hook can be used within components
          that are <em>shared</em> between v2 and v3 apps, and thus can't be
          converted wholesale to v3. (A good example of this is the Artwork
          Filter, which is a complex component used in a couple different
          places.)
        </Text>

        <Spacer y={1} />

        <Snippet
          code={`import { useThemeConfig, Box, Text, TextVariant } from "@artsy/palette"

const MyComponent = props => {
  const tokens = useThemeConfig({
    v2: {
      px: 5,
      variant: "title" as TextVariant,
    },
    v3: {
      px: 2,
      variant: "lg" as TextVariant,
    },
  })

  return (
    <Box px={tokens.px}>
      <Text variant={tokens.variant}>Hi</Text>
    </Box>
  )
}`}
        />

        <Spacer y={1} />

        <Text>
          What we're doing in the above is defining an object with two keys --{" "}
          <code>v2</code> and <code>v3</code> -- and the{" "}
          <code>useThemeConfig</code> hook will then match against the keys
          depending on which theme context is currently being used and return
          the correct values. So you can see that
        </Text>

        <Spacer y={1} />

        <Snippet
          code={`<Box px={tokens.px}>
  <Text variant={tokens.variant}>Hi</Text>
</Box>`}
        />

        <Spacer y={1} />

        <Text>
          Will return dynamic values for <code>tokens.px</code> -- either{" "}
          <code>px={5}</code> if <code>v2</code>, or <code>px={2}</code> if{" "}
          <code>v3</code>.
        </Text>

        <Spacer y={1} />

        <Text>
          (See{" "}
          <a
            href="https://github.com/artsy/force/blob/main/src/v2/Components/Footer/Footer.tsx#L219-L226"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>{" "}
          for a real-world example.)
        </Text>

        <Spacer y={2} />

        <Text as="h2" variant={"lg"}>
          Typography
        </Text>

        <Spacer y={1} />

        <Text>
          We've simplified our typography choices down to six choices, as can be
          seen in the Typography documentation.
        </Text>

        <Spacer y={1} />

        <Text>
          Variants are now generic size values (<code>sm</code>, <code>md</code>
          , <code>lg</code>, and so on) rather than context-specific names (
          <code>title</code>, <code>subTitle</code>, etc.)
        </Text>

        <Spacer y={2} />

        <Box
          as="table"
          width="100%"
          style={{
            borderCollapse: "collapse",
            border: "1px solid #e5e5e5",
            borderRadius: "4px",
          }}
        >
          <Box as="thead" bg="#f6f6f6">
            <Box as="tr">
              <Box
                as="th"
                p={1}
                textAlign="left"
                borderRight="1px solid #e5e5e5"
                borderBottom="1px solid #e5e5e5"
              >
                <Text>
                  <strong>Palette v3</strong>
                </Text>
              </Box>
              <Box
                as="th"
                p={1}
                textAlign="left"
                borderBottom="1px solid #e5e5e5"
              >
                <Text>
                  <strong>Palette v2</strong>
                </Text>
              </Box>
            </Box>
          </Box>
          <Box as="tbody">
            <Box as="tr">
              <Box
                as="td"
                p={1}
                borderRight="1px solid #e5e5e5"
                borderBottom="1px solid #e5e5e5"
              >
                <Text>xxl</Text>
              </Box>
              <Box as="td" p={1} borderBottom="1px solid #e5e5e5">
                <Text>N/A</Text>
              </Box>
            </Box>
            <Box as="tr">
              <Box
                as="td"
                p={1}
                borderRight="1px solid #e5e5e5"
                borderBottom="1px solid #e5e5e5"
              >
                <Text>xl</Text>
              </Box>
              <Box as="td" p={1} borderBottom="1px solid #e5e5e5">
                <Text>largeTitle</Text>
              </Box>
            </Box>
            <Box as="tr">
              <Box
                as="td"
                p={1}
                borderRight="1px solid #e5e5e5"
                borderBottom="1px solid #e5e5e5"
              >
                <Text>lg</Text>
              </Box>
              <Box as="td" p={1} borderBottom="1px solid #e5e5e5">
                <Text>title</Text>
              </Box>
            </Box>
            <Box as="tr">
              <Box
                as="td"
                p={1}
                borderRight="1px solid #e5e5e5"
                borderBottom="1px solid #e5e5e5"
              >
                <Text>md</Text>
              </Box>
              <Box as="td" p={1} borderBottom="1px solid #e5e5e5">
                <Text>N/A</Text>
              </Box>
            </Box>
            <Box as="tr">
              <Box
                as="td"
                p={1}
                borderRight="1px solid #e5e5e5"
                borderBottom="1px solid #e5e5e5"
              >
                <Text>sm</Text>
              </Box>
              <Box as="td" p={1} borderBottom="1px solid #e5e5e5">
                <Text>text</Text>
              </Box>
            </Box>
            <Box as="tr">
              <Box
                as="td"
                p={1}
                borderRight="1px solid #e5e5e5"
                borderBottom="1px solid #e5e5e5"
              >
                <Text>xs</Text>
              </Box>
              <Box as="td" p={1} borderBottom="1px solid #e5e5e5">
                <Text>caption</Text>
              </Box>
            </Box>
            <Box as="tr">
              <Box as="td" p={1} borderRight="1px solid #e5e5e5">
                <Text>N/A</Text>
              </Box>
              <Box as="td" p={1}>
                <Text>small</Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Spacer y={2} />

        <Text>
          If migrating from pre-v1 <code>&lt;Sans&gt;</code> or{" "}
          <code>&lt;Serif&gt;</code> components, note that we no longer use
          serif fonts and areas where those components are used should be
          replaced with <code>&lt;Text&gt;</code>.
        </Text>

        <Spacer y={1} />

        <Text>
          <strong>Some migration examples:</strong>
        </Text>

        <Spacer y={1} />

        <BorderBox display="block">
          <Text variant="md">We no longer use Serif</Text>
          <Text variant="md">We no longer use context variants</Text>
        </BorderBox>

        <Spacer y={1} />

        <Snippet
          code={`<BorderBox display="block">
  <Serif size={4}>We no longer use Serif</Serif>
  <Text variant="subTitle">We no longer use context variants</Text>
</BorderBox>`}
        />

        <Spacer y={1} />

        <Text>
          <strong>Do this instead:</strong>
        </Text>

        <Spacer y={1} />

        <BorderBox>
          <Text variant="lg-display">
            Now we use the text component across the board
          </Text>
        </BorderBox>

        <Spacer y={1} />

        <Snippet
          code={`<BorderBox>
  <Text variant="lg-display">
    Now we use the text component across the board
  </Text>
</BorderBox>`}
        />

        <Spacer y={2} />

        <Text as="h2" variant={"lg"}>
          Spacing Scale
        </Text>

        <Spacer y={1} />

        <Text>
          See our{" "}
          <a href="/?path=/story/theme--spacing">docs on Spacing</a> for the
          full list, but in particular the often-used <code>3 = 30px</code> is
          no longer available.
        </Text>

        <Spacer y={1} />

        <Text>
          If migrating a page, v2 values that no longer exist in v3 will
          collapse to zero.
        </Text>

        <Spacer y={2} />

        <Text as="h2" variant={"lg"}>
          Colors
        </Text>

        <Spacer y={1} />

        <Text>
          See our <a href="/?path=/story/theme--colors">docs on Colors</a> for
          the full list.
        </Text>
      </Box>
    )
  },
}
