import { storiesOf } from "@storybook/react"
import React from "react"
import { HTML } from "../HTML"
import { ReadMore } from "./ReadMore"

storiesOf("Components/ReadMore", module)
  .add("With character cap", () => {
    return (
      <ReadMore
        maxChars={300}
        content={
          <div>
            Donald Judd, widely regarded as one of the most significant American
            artists of <a href="#">the post-war period</a>, is perhaps
            best-known for the large-scale outdoor installations and long,
            spacious interiors he designed in Marfa. Donald Judd, widely
            regarded as one of the most significant American artists of the
            post-war period, is perhaps best-known for the large-scale outdoor
            installations and long, spacious interiors he designed in Marfa.
          </div>
        }
      />
    )
  })
  .add("Short content", () => {
    return (
      <ReadMore
        maxChars={300}
        content={
          <div>
            Donald Judd, widely regarded as one of the most significant American
            artists of <a href="#">the post-war period</a>.
          </div>
        }
      />
    )
  })
  .add("As string", () => {
    return (
      <ReadMore
        maxChars={300}
        content="Donald Judd, widely regarded as one of the most significant American artists of the post-war period, is perhaps best-known for the large-scale outdoor installations and long, spacious interiors he designed in Marfa. Donald Judd, widely regarded as one of the most significant American artists of the post-war period, is perhaps best-known for the large-scale outdoor installations and long, spacious interiors he designed in Marfa."
      />
    )
  })
  .add("Character cap with html", () => {
    return (
      <ReadMore
        maxChars={300}
        content={
          <p>
            Donald Judd, widely regarded as one of the most significant American
            artists of <a href="#">the post-war period</a>, is perhaps
            best-known for the large-scale outdoor installations and long,
            spacious interiors he designed in Marfa. Donald Judd, widely
            regarded as one of the most significant American artists of the
            post-war period, is perhaps best-known for the large-scale outdoor
            installations and long, spacious interiors he designed in Marfa.
          </p>
        }
      />
    )
  })
  .add("Character cap with html (disabled)", () => {
    return (
      <ReadMore
        disabled
        maxChars={300}
        content={
          <div>
            Donald Judd, widely regarded as one of the most significant American
            artists of <a href="#">the post-war period</a>, is perhaps
            best-known for the large-scale outdoor installations and long,
            spacious interiors he designed in Marfa. Donald Judd, widely
            regarded as one of the most significant American artists of the
            post-war period, is perhaps best-known for the large-scale outdoor
            installations and long, spacious interiors he designed in Marfa.
          </div>
        }
      />
    )
  })
  .add("With default HTML styling", () => {
    return (
      <ReadMore
        Component={HTML}
        maxChars={300}
        content={
          <div>
            Donald Judd, widely regarded as one of the most significant American
            artists of <a href="#">the post-war period</a>, is perhaps
            best-known for the large-scale outdoor installations and long,
            spacious interiors he designed in Marfa. Donald Judd, widely
            regarded as one of the most significant American artists of the
            post-war period, is perhaps best-known for the large-scale outdoor
            installations and long, spacious interiors he designed in Marfa.
          </div>
        }
      />
    )
  })
  .add("With multiple paragraphs", () => {
    return (
      <ReadMore
        Component={HTML}
        variant="text"
        maxChars={300}
        content={
          <>
            <p>
              Donald Judd, widely regarded as one of the most significant
              American artists of <a href="#">the post-war period</a>, is
              perhaps best-known for the large-scale outdoor installations and
              long, spacious interiors he designed in Marfa. Donald Judd, widely
              regarded as one of the most significant American artists of the
              post-war period, is perhaps best-known for the large-scale outdoor
              installations and long, spacious interiors he designed in Marfa.
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              harum repellat! Quaerat, libero optio debitis nulla nobis
              laboriosam et cumque ipsam odio delectus inventore eaque nihil?
              Tenetur autem reprehenderit necessitatibus.
            </p>
          </>
        }
      />
    )
  })
  .add("With custom HTML styling", () => {
    return (
      <ReadMore
        Component={HTML}
        variant="largeTitle"
        maxChars={300}
        content={
          <div>
            Donald Judd, widely regarded as one of the most significant American
            artists of <a href="#">the post-war period</a>, is perhaps
            best-known for the large-scale outdoor installations and long,
            spacious interiors he designed in Marfa. Donald Judd, widely
            regarded as one of the most significant American artists of the
            post-war period, is perhaps best-known for the large-scale outdoor
            installations and long, spacious interiors he designed in Marfa.
          </div>
        }
      />
    )
  })
