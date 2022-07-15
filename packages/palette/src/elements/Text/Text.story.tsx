import {
  TEXT_VARIANT_NAMES,
  TEXT_VARIANTS,
} from "@artsy/palette-tokens/dist/typography/v3"
import { themeGet } from "@styled-system/theme-get"
import React from "react"
import { States } from "storybook-states"
import styled from "styled-components"
import { Color } from "../../Theme"
import { Flex } from "../Flex"
import { Text, TextProps } from "./Text"

const Table = styled.table`
  width: 100%;
  border: 1px solid ${themeGet("colors.black10")};
  border-collapse: collapse;

  > thead > tr > th {
    text-align: left;
    font-weight: normal;
  }

  > thead > tr > th,
  > tbody > tr > td {
    border-bottom: 1px solid ${themeGet("colors.black10")};
    border-left: 1px solid ${themeGet("colors.black10")};
    padding: ${themeGet("space.1")};
  }
`

const Specification: React.FC<{
  size?: "small" | "large" | "default"
  treatment: any
}> = ({ size, treatment }) => {
  const textColor =
    {
      small: ["purple100", "black60"] as Color[],
      large: ["black60", "purple100"] as Color[],
    }[size || "small"] || "black60"

  return (
    <>
      {Object.entries(treatment).map(([property, value]) => {
        return (
          value && (
            <Flex key={property}>
              <Text variant="xs" textColor={textColor}>
                {property}:&nbsp;
              </Text>

              <Text variant="xs" textColor={textColor}>
                {value as any}
              </Text>
            </Flex>
          )
        )
      })}
    </>
  )
}

export default { title: "Components/Text" }

export const Variants = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th>
            <Text variant="sm-display">Variant</Text>
          </th>

          <th>
            <Text variant="sm-display">Specifications</Text>
          </th>

          <th>
            <Text variant="sm-display">Example</Text>
          </th>
        </tr>
      </thead>

      <tbody>
        {TEXT_VARIANT_NAMES.map((key) => (
          <tr key={key}>
            <td>
              <Text variant="sm-display">{key}</Text>
            </td>

            <td>
              <Specification size="default" treatment={TEXT_VARIANTS[key]} />
            </td>

            <td>
              <Text variant={key}>
                All their equipment and instruments are alive
              </Text>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export const As = () => {
  const ELEMENTS = ["h1", "h2", "h3", "p"] as Array<keyof JSX.IntrinsicElements>

  return (
    <>
      {ELEMENTS.map((element) => {
        return (
          <Text key={element} as={element} variant="sm">
            This is a text component with an element set to {element}
          </Text>
        )
      })}
    </>
  )
}

export const Truncation = () => {
  return (
    <States<TextProps> states={[{ overflowEllipsis: true }, { lineClamp: 2 }]}>
      <Text variant="sm">
        All their equipment and instruments are alive. All their equipment and
        instruments are alive. All their equipment and instruments are alive.
        All their equipment and instruments are alive. All their equipment and
        instruments are alive. All their equipment and instruments are alive.
        All their equipment and instruments are alive. All their equipment and
        instruments are alive. All their equipment and instruments are alive.
      </Text>
    </States>
  )
}

export const Caps = () => {
  return (
    <States<TextProps>
      states={[
        {},
        { textTransform: "uppercase" },
        { textTransform: "capitalize" },
      ]}
    >
      <Text variant="xs">Hello world</Text>
    </States>
  )
}
