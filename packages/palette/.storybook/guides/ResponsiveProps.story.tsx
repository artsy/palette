import React from "react"
import { Text } from "../../src/elements/Text"
import { Box } from "../../src/elements/Box"
import { Spacer } from "../../src/elements/Spacer"
import { BorderBox } from "../../src/elements/BorderBox"
import { Snippet } from "./shared/Snippet"

export default {
  title: "Guides",
}

export const ResponsiveProps = {
  name: "Responsive Props",
  render: () => {
    return (
      <Box>
        <Text as="h1" variant={"xl"}>
          Responsive Props
        </Text>

        <Spacer y={1} />

        <Text>
          One of the core features of Palette is it's use of{" "}
          <a
            href="https://styled-system.com/responsive-styles/"
            target="_blank"
            rel="noopener noreferrer"
          >
            responsive props
          </a>{" "}
          (or{" "}
          <a
            href="https://styled-system.com/guides/array-props/"
            target="_blank"
            rel="noopener noreferrer"
          >
            array props
          </a>
          ). This unique feature was first introduced by{" "}
          <a
            href="https://styled-system.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            styled-system
          </a>
          , the underlying library we use for much of Palette's functionality,
          and allows devs to write fully responsive components by expanding
          normal react props into an array, with each slot representing a
          breakpoint.
        </Text>

        <Spacer y={2} />

        <Text as="h2" variant={"lg"}>
          Example
        </Text>

        <Spacer y={1} />

        <Text>The below will serve to clarify:</Text>

        <Spacer y={1} />

        <BorderBox width={["25%", "50%", "75%", "100%"]}>
          <Text variant={["xl", "lg", "md", "sm"]}>
            At xs the box is 25% wide, and greater than xs matches breakpoints
            going up to the largest. Scale the browser to see it in action.
          </Text>
        </BorderBox>

        <Spacer y={1} />

        <Snippet
          code={`<BorderBox width={["25%", "50%", "75%", "100%"]}>
  <Text variant={["xl", "lg", "md", "sm"]}>
    At xs the box is 25% wide, and greater than xs matches breakpoints
    going up to the largest. Scale the browser to see it in action.
  </Text>
</BorderBox>`}
        />

        <Spacer y={1} />

        <Text>
          All props in Palette are responsive like this which makes for extremely
          rapid iteration times when compared with conventional css-based media
          query approaches.
        </Text>

        <Spacer y={1} />

        <Text>
          For more info, check out the{" "}
          <a
            href="https://styled-system.com/guides/array-props/"
            target="_blank"
            rel="noopener noreferrer"
          >
            styled-system docs
          </a>
          . Also check out our comprehensive blogpost on how we handle responsive
          layouts{" "}
          <a
            href="https://artsy.github.io/blog/2019/05/24/server-rendering-responsively/"
            target="_blank"
            rel="noopener noreferrer"
          >
            when server-side rendering
          </a>
          .
        </Text>

        <Spacer y={2} />

        <Text as="h2" variant={"lg"}>
          Developer flow
        </Text>

        <Spacer y={1} />

        <Text>
          Different engineers will approach layout and responsive props in their
          own way, but a suggested approach would be to build out your layout
          using normal, non-array props, and then once the desktop version looks
          good, go back and annotate your components with array props,
          representing the mobile view. In practice this works well.
        </Text>

        <Spacer y={2} />

        <Text as="h2" variant={"lg"}>
          All Breakpoints
        </Text>

        <Spacer y={1} />

        <Box
          as="pre"
          bg="#f6f6f6"
          p={2}
          borderRadius="4px"
          overflow="auto"
          style={{ whiteSpace: "pre" }}
        >
          <code>
            {`{
  "xl": "1192px",
  "lg": "1024px",
  "md": "900px",
  "sm": "768px",
  "xs": "767px"
}`}
          </code>
        </Box>
      </Box>
    )
  },
}
