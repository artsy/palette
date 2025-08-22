import { HTML } from "./HTML"

const HTML_EXAMPLE = `
<h1>H1 Headline</h1>
<h2>H2 Headline</h2>
<h3>H3 Headline</h3>
<h4>H4 Headline</h4>
<p>I’m <em>of the opinion</em> that they use <strong>no <em>inert</em> material.</strong> All their equipment and instruments are alive, in some form or other.</p>
<p>They don’t construct or build at all. The idea of making is foreign to them. They utilize existing forms. Even their ships—</p>
<ol>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ol>
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
<hr />
<pre><code>this is a code block</code></pre>
<blockquote>This is a block quote</blockquote>
`

export default {
  component: HTML,
  title: "Components/HTML",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Renders raw HTML content with Palette styling. Use the `html` prop to pass HTML markup.",
      },
    },
    controls: {
      include: ["html", "variant", "style"],
    },
  },
}

export const Default = {
  args: {
    html: HTML_EXAMPLE,
    variant: "lg-display",
    style: { border: "1px dotted" },
  },
  parameters: {
    docs: {
      description: {
        story: "Large display variant with example HTML content.",
      },
    },
  },
}

export const Small = {
  args: {
    html: HTML_EXAMPLE,
    variant: "sm",
    style: { border: "1px dotted" },
  },
  parameters: {
    docs: {
      description: {
        story: "Small variant with example HTML content.",
      },
    },
  },
}

export const ExtraSmall = {
  args: {
    html: HTML_EXAMPLE,
    variant: "xs",
    style: { border: "1px dotted" },
  },
  parameters: {
    docs: {
      description: {
        story: "Extra small variant with example HTML content.",
      },
    },
  },
}
