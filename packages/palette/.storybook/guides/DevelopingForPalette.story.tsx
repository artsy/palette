import React from "react"
import { Text } from "../../src/elements/Text"
import { Box } from "../../src/elements/Box"
import { Spacer } from "../../src/elements/Spacer"
import { Snippet } from "./shared/Snippet"

export default {
  title: "Guides",
}

export const DevelopingForPalette = {
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
          be it adding new components, modifying the theme or updating docs.
          Read on to learn how it's done.
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
            • If adding or changing a component, make sure to update its
            stories.
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
            <code>auto/publishing-canary</code> job output to see the npm
            version number and then update the consuming app accordingly.
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
          palette-charts
        </Text>

        <Spacer y={1} />

        <Text>
          This is where our charting components live, built on top of{" "}
          <a href="https://d3js.org/" target="_blank" rel="noopener noreferrer">
            D3.js
          </a>
          .
        </Text>
      </Box>
    )
  },
}
