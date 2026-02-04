import React from "react"
import { Text } from "../../src/elements/Text"
import { Box } from "../../src/elements/Box"
import { Spacer } from "../../src/elements/Spacer"
import { Snippet } from "./shared/Snippet"

export default {
  title: "Guides",
}

export const HowPaletteWorks = {
  name: "How Palette Works",
  render: () => {
    return (
      <Box>
        <Text as="h1" variant={"xl"}>
          How Palette Works
        </Text>

        <Spacer y={1} />

        <Text>
          When we first began building Artsy's Design System we wanted something
          that could serve as a good foundation for low and high-level
          components, while also being intuitive for our development team. Some
          of us were fascinated with{" "}
          <a
            href="https://www.htmlgoodies.com/css/brief-introduction-to-functional-css/"
            target="_blank"
            rel="noopener noreferrer"
          >
            functional css
          </a>{" "}
          but having worked with React,{" "}
          <a
            href="https://styled-components.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            styled-components
          </a>{" "}
          and various CSS-in-JS libraries, we wanted something that was less
          vanilla CSS than React props, something that we could easily use with
          TypeScript. Pretty quickly we stumbled upon a brilliant library by{" "}
          <a
            href="https://jxnblk.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Brent Jackson
          </a>{" "}
          called{" "}
          <a
            href="https://styled-system.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            styled-system
          </a>{" "}
          that combined all of these things. Fans of{" "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tailwind CSS
          </a>{" "}
          should feel right at home here.
        </Text>

        <Spacer y={2} />

        <Text as="h2" variant={"lg"}>
          Styled System
        </Text>

        <Spacer y={1} />

        <Text>
          Styled System bills itself as a way to "build custom UI components
          with constraint-based style props based on scales defined in your
          theme." There's a lot here, but in short what it means is: Take some
          values defined in a theme, define some function mixins to consume
          values in the theme, and map the output to React component props.
        </Text>

        <Spacer y={1} />

        <Text>For example:</Text>

        <Spacer y={1} />

        <Snippet
          code={`import { space } from "styled-system"
import { ThemeProvider } from "styled-components"

const Box = styled.div\`
  \${space};
\`

const theme = {
  space: {
    1: "10px",
    2: "20px",
    3: "30px",
    4: "40px",
  },
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box p={2}>This is a box with 20px padding</Box>
    </ThemeProvider>
  )
}`}
        />

        <Spacer y={1} />

        <Text>
          What we're doing is creating a new primitive component called{" "}
          <code>Box</code> that mixes-in a <code>space</code> function from{" "}
          <code>styled-system</code>. This function then "decorates" the
          component with a{" "}
          <a
            href="https://styled-system.com/api#space"
            target="_blank"
            rel="noopener noreferrer"
          >
            handful of props
          </a>{" "}
          that then read in the theme and allow the developer quick ways to
          access the values. One of those props is <code>p</code> (shorthand for{" "}
          <code>padding</code>), and by passing in <code>2</code> we're saying
          "look at <code>theme.space</code>, find the key for <code>p={2}</code>{" "}
          and return the value" - which equals <code>20px</code>. And with
          TypeScript, we get really nice intellisense as well as type-checking
          of the values passed into the prop.
        </Text>

        <Spacer y={1} />

        <Text>
          At scale and across a big dev team, this works well after the basics
          are understood. Our UI becomes like lego blocks, where the theme
          ("constraints") defines the shape of the pieces that are available.
          Design drift no more.
        </Text>

        <Spacer y={1} />

        <Text>
          A fuller example of <code>Box</code> from the Palette codebase:
        </Text>

        <Spacer y={1} />

        <Snippet
          code={`/**
 * All the system functions for Box
 */
export const boxMixin = compose(
  background,
  border,
  color,
  layout,
  position,
  space,
  textAlign
)

export const Box = styled.div\`
  \${boxMixin}
\``}
        />

        <Spacer y={1} />

        <Text>
          You can see that not only is there the <code>space</code> mixin, but
          also <code>background</code> and <code>position</code> and others,
          each providing their own set of props that we can then tap into
          directly on the <code>Box</code> component.
        </Text>

        <Spacer y={1} />

        <Text>
          Similarly, lets define a <code>Flex</code> component:
        </Text>

        <Spacer y={1} />

        <Snippet
          code={`import { flexbox } from "styled-system"

const Flex = styled.div\`
  \${flexbox};
\``}
        />

        <Spacer y={1} />

        <Text>
          Now with this defined, we can then create something more complex:
        </Text>

        <Spacer y={1} />

        <Snippet
          code={`const Banner = ({ message, isPriority }) => {
  return (
    <Flex flexDirection="row" justifyContent="space-between">
      <Box px={2} bgColor="brand">
        {message}
      </Box>

      {isPriority && <PriorityIcon />}
    </Flex>
  )
}`}
        />

        <Spacer y={1} />

        <Text>
          Under the hood we're laying out the component into a container that
          displays a message and, if <code>isPriority</code> is set, optionally
          shows an icon. The contents are distributed evenly across the
          containing space thanks to the <code>justifyContent</code> prop being
          set to <code>space-between</code> on the <code>&lt;Flex&gt;</code>{" "}
          component container. No long-hand css required, and everything is
          type-checked. In fact, unless you're building something
          unconventionally complex, you should never need to use vanilla css or
          conventional styled components again; everything you could need is
          defined within our primitives in Palette.
        </Text>

        <Spacer y={2} />

        <Text as="h2" variant={"lg"}>
          Full API
        </Text>

        <Spacer y={1} />

        <Text>
          As styled-system can do much more, check out the{" "}
          <a
            href="https://styled-system.com/api/"
            target="_blank"
            rel="noopener noreferrer"
          >
            API docs
          </a>{" "}
          for a full list of functionality.
        </Text>
      </Box>
    )
  },
}
