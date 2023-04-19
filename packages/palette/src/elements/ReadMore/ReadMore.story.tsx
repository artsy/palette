import React from "react"
import { HTML } from "../HTML"
import { ReadMore } from "./ReadMore"

export default {
  title: "Components/ReadMore",
}

export const WithCharacterCap = () => {
  return (
    <ReadMore
      maxChars={300}
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
  )
}

WithCharacterCap.story = {
  name: "With character cap",
}

export const ShortContent = () => {
  return (
    <ReadMore
      maxChars={300}
      content={`<div>
          Donald Judd, widely regarded as one of the most significant American
          artists of <a href="#">the post-war period</a>.
        </div>`}
    />
  )
}

ShortContent.story = {
  name: "Short content",
}

export const AsString = () => {
  return (
    <ReadMore
      maxChars={300}
      content="Donald Judd, widely regarded as one of the most significant American artists of the post-war period, is perhaps best-known for the large-scale outdoor installations and long, spacious interiors he designed in Marfa. Donald Judd, widely regarded as one of the most significant American artists of the post-war period, is perhaps best-known for the large-scale outdoor installations and long, spacious interiors he designed in Marfa."
    />
  )
}

AsString.story = {
  name: "As string",
}

export const CharacterCapWithHtml = () => {
  return (
    <ReadMore
      maxChars={300}
      content={`<p>
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
        </p>`}
    />
  )
}

CharacterCapWithHtml.story = {
  name: "Character cap with HTML",
}

export const WithCustomizableTypography = () => {
  return (
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
  )
}

WithCustomizableTypography.story = {
  name: "With customizable typography",
}

export const WithCustomizableTypography2 = () => {
  return (
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
  )
}

WithCustomizableTypography2.story = {
  name: "With customizable typography (2)",
}

export const CharacterCapWithHtmlDisabled = () => {
  return (
    <ReadMore
      disabled
      maxChars={300}
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
  )
}

CharacterCapWithHtmlDisabled.story = {
  name: "Character cap with html (disabled)",
}
