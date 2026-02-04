import React from "react"
import { Text } from "../../src/elements/Text"
import { Box } from "../../src/elements/Box"
import { Spacer } from "../../src/elements/Spacer"
import { Snippet } from "./shared/Snippet"

export default {
  title: "Guides",
}

export const Accessibility = {
  name: "Accessibility",
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
