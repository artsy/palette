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
  .add("Character cap with HTML", () => {
    return (
      <ReadMore
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
            <hr />
            <p>
              <strong>Lorem ipsum dolor</strong> sit amet consectetur
              adipisicing elit. Ducimus eligendi obcaecati voluptate{" "}
              <em>molestias vero nobis voluptatum</em>, tenetur dolorum
              assumenda.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              eveniet aliquid laborum fugiat quibusdam id suscipit est
              temporibus labore sint aliquam, laudantium tempore. Tenetur
              adipisci cumque alias facilis animi. Illum.
            </p>
          </>
        }
      />
    )
  })
  .add("With customizable typography", () => {
    return (
      <HTML>
        <ReadMore
          maxChars={300}
          content={
            <>
              <p>
                Donald Judd, widely regarded as one of the most significant
                American artists of <a href="#">the post-war period</a>, is
                perhaps best-known for the large-scale outdoor installations and
                long, spacious interiors he designed in Marfa. Donald Judd,
                widely regarded as one of the most significant American artists
                of the post-war period, is perhaps best-known for the
                large-scale outdoor installations and long, spacious interiors
                he designed in Marfa.
              </p>
              <hr />
              <p>
                <strong>Lorem ipsum dolor</strong> sit amet consectetur
                adipisicing elit. Ducimus eligendi obcaecati voluptate{" "}
                <em>molestias vero nobis voluptatum</em>, tenetur dolorum
                assumenda.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                eveniet aliquid laborum fugiat quibusdam id suscipit est
                temporibus labore sint aliquam, laudantium tempore. Tenetur
                adipisci cumque alias facilis animi. Illum.
              </p>
            </>
          }
        />
      </HTML>
    )
  })
  .add("With customizable typography (2)", () => {
    return (
      <HTML variant="largeTitle">
        <ReadMore
          maxChars={300}
          content={
            <>
              <p>
                Donald Judd, widely regarded as one of the most significant
                American artists of <a href="#">the post-war period</a>, is
                perhaps best-known for the large-scale outdoor installations and
                long, spacious interiors he designed in Marfa. Donald Judd,
                widely regarded as one of the most significant American artists
                of the post-war period, is perhaps best-known for the
                large-scale outdoor installations and long, spacious interiors
                he designed in Marfa.
              </p>
              <hr />
              <p>
                <strong>Lorem ipsum dolor</strong> sit amet consectetur
                adipisicing elit. Ducimus eligendi obcaecati voluptate{" "}
                <em>molestias vero nobis voluptatum</em>, tenetur dolorum
                assumenda.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                eveniet aliquid laborum fugiat quibusdam id suscipit est
                temporibus labore sint aliquam, laudantium tempore. Tenetur
                adipisci cumque alias facilis animi. Illum.
              </p>
            </>
          }
        />
      </HTML>
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
