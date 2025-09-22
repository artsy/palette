import React from "react"
import { HTML } from "../HTML"
import { ReadMore } from "./ReadMore"
import { Box } from "../Box"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: ReadMore,
  title: "Components/ReadMore",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A component that truncates content and provides a 'read more' link to expand the full content.",
      },
    },
    controls: {
      exclude: STORYBOOK_PROPS_BLOCKLIST,
    },
  },
}

export const Default = {
  args: {
    maxChars: 300,
    content: `<div>
          Donald Judd, widely regarded as one of the most significant American
          artists of <a href="#">the post-war period</a>, is perhaps best-known
          for the large-scale outdoor installations and long, spacious interiors
          he designed in Marfa. Donald Judd, widely regarded as one of the most
          significant American artists of the post-war period, is perhaps
          best-known for the large-scale outdoor installations and long,
          spacious interiors he designed in Marfa.
        </div>`,
  },
  parameters: {
    docs: {
      description: {
        story: "Read more component with character limit truncation.",
      },
    },
  },
}

export const ShortContent = {
  args: {
    maxChars: 300,
    content: `<div>
          Donald Judd, widely regarded as one of the most significant American
          artists of <a href="#">the post-war period</a>.
        </div>`,
  },
  parameters: {
    docs: {
      description: {
        story: "Read more with content shorter than the character limit.",
      },
    },
  },
}

export const AsString = {
  args: {
    maxChars: 300,
    content:
      "Donald Judd, widely regarded as one of the most significant American artists of the post-war period, is perhaps best-known for the large-scale outdoor installations and long, spacious interiors he designed in Marfa. Donald Judd, widely regarded as one of the most significant American artists of the post-war period, is perhaps best-known for the large-scale outdoor installations and long, spacious interiors he designed in Marfa.",
  },
  parameters: {
    docs: {
      description: {
        story: "Read more with plain string content instead of HTML.",
      },
    },
  },
}

export const CharacterCapWithHtml = {
  args: {
    maxChars: 300,
    content: `<p>
          Donald Judd, widely regarded as one of the most significant American
          artists of <a href="#">the post-war period</a>, is perhaps
          best-known for the large-scale outdoor installations and long,
          spacious interiors he designed in Marfa. Donald Judd, widely
          regarded as one of the most significant American artists of the
          post-war period, is perhaps best-known for the large-scale outdoor
          installations and long, spacious interiors he designed in Marfa.
        </p>
        <hr />
        <p>
          <strong>Lorem ipsum dolor</strong> sit amet consectetur adipisicing
          elit. Ducimus eligendi obcaecati voluptate
          <em>molestias vero nobis voluptatum</em>, tenetur dolorum assumenda.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          eveniet aliquid laborum fugiat quibusdam id suscipit est temporibus
          labore sint aliquam, laudantium tempore. Tenetur adipisci cumque
          alias facilis animi. Illum.
        </p>`,
  },
  parameters: {
    docs: {
      description: {
        story: "Character cap with HTML content.",
      },
    },
  },
}

export const WithCustomizableTypography = {
  render: () => (
    <HTML>
      <ReadMore
        maxChars={300}
        content={`
            <p>
              Donald Judd, widely regarded as one of the most significant
              American artists of <a href="#">the post-war period</a>, is
              perhaps best-known for the large-scale outdoor installations and
              long, spacious interiors he designed in Marfa. Donald Judd, widely
              regarded as one of the most significant American artists of the
              post-war period, is perhaps best-known for the large-scale outdoor
              installations and long, spacious interiors he designed in Marfa.
            </p>
            <hr />
            <p>
              <strong>Lorem ipsum dolor</strong> sit amet consectetur
              adipisicing elit. Ducimus eligendi obcaecati voluptate
              <em>molestias vero nobis voluptatum</em>, tenetur dolorum
              assumenda.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              eveniet aliquid laborum fugiat quibusdam id suscipit est
              temporibus labore sint aliquam, laudantium tempore. Tenetur
              adipisci cumque alias facilis animi. Illum.
            </p>`}
      />
    </HTML>
  ),
  parameters: {
    docs: {
      description: {
        story: "ReadMore with customizable typography using HTML wrapper.",
      },
    },
  },
}

export const WithCustomizableTypography2 = {
  render: () => (
    <HTML variant="lg">
      <ReadMore
        maxChars={300}
        content={`<p>
              Donald Judd, widely regarded as one of the most significant
              American artists of <a href="#">the post-war period</a>, is
              perhaps best-known for the large-scale outdoor installations and
              long, spacious interiors he designed in Marfa. Donald Judd, widely
              regarded as one of the most significant American artists of the
              post-war period, is perhaps best-known for the large-scale outdoor
              installations and long, spacious interiors he designed in Marfa.
            </p>
            <hr />
            <p>
              <strong>Lorem ipsum dolor</strong> sit amet consectetur
              adipisicing elit. Ducimus eligendi obcaecati voluptate
              <em>molestias vero nobis voluptatum</em>, tenetur dolorum
              assumenda.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              eveniet aliquid laborum fugiat quibusdam id suscipit est
              temporibus labore sint aliquam, laudantium tempore. Tenetur
              adipisci cumque alias facilis animi. Illum.
            </p>`}
      />
    </HTML>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ReadMore with customizable large typography using HTML wrapper.",
      },
    },
  },
}

export const CharacterCapWithHtmlDisabled = {
  args: {
    disabled: true,
    maxChars: 300,
    content: `<div>
          Donald Judd, widely regarded as one of the most significant American
          artists of <a href="#">the post-war period</a>, is perhaps best-known
          for the large-scale outdoor installations and long, spacious interiors
          he designed in Marfa. Donald Judd, widely regarded as one of the most
          significant American artists of the post-war period, is perhaps
          best-known for the large-scale outdoor installations and long,
          spacious interiors he designed in Marfa.
        </div>`,
  },
  parameters: {
    docs: {
      description: {
        story: "Character cap with HTML content when disabled.",
      },
    },
  },
}

export const WithBottomReadMore = {
  render: () => (
    <Box textAlign="center" width={600}>
      <HTML variant="lg">
        <ReadMore
          inlineReadMoreLink={false}
          maxChars={280}
          content={`<div>
          Donald Judd, widely regarded as one of the most significant American
          artists of <a href="#">the post-war period</a>, is perhaps best-known
          for the large-scale outdoor installations and long, spacious interiors
          he designed in Marfa. Donald Judd, widely regarded as one of the most
          significant American artists of the post-war period, is perhaps
          best-known for the large-scale outdoor installations and long,
          spacious interiors he designed in Marfa.
        </div>`}
        />
      </HTML>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "ReadMore with bottom-placed 'Read More' link.",
      },
    },
  },
}
