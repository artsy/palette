import { TextVariant } from "@artsy/palette-tokens/dist/typography/types"
import {
  TEXT_VARIANT_NAMES as V2_TEXT_VARIANT_NAMES,
  TEXT_VARIANTS as V2_TEXT_VARIANTS,
} from "@artsy/palette-tokens/dist/typography/v2"
import {
  TEXT_VARIANT_NAMES as V3_TEXT_VARIANT_NAMES,
  TEXT_VARIANTS as V3_TEXT_VARIANTS,
} from "@artsy/palette-tokens/dist/typography/v3"
import { themeGet } from "@styled-system/theme-get"
import React from "react"
import { States } from "storybook-states"
import styled from "styled-components"
import { Color, useTheme } from "../../Theme"
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
    }[size] || "black60"

  return (
    <>
      {Object.entries(treatment).map(([property, value]) => {
        return (
          value && (
            <Flex key={property}>
              <Text variant="small" textColor={textColor}>
                {property}:&nbsp;
              </Text>

              <Text variant="small" textColor={textColor}>
                {value}
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
  const { theme } = useTheme()

  const names: TextVariant[] = {
    v2: [...V2_TEXT_VARIANT_NAMES],
    v3: [...V3_TEXT_VARIANT_NAMES],
  }[theme.id]

  const variants = {
    v2: V2_TEXT_VARIANTS,
    v3: V3_TEXT_VARIANTS,
  }[theme.id]

  return (
    <Table>
      <thead>
        <tr>
          <th>
            <Text variant="small">Variant</Text>
          </th>
          {"large" in variants && (
            <th>
              <Text variant="small">Large (&gt;&nbsp;767)</Text>
            </th>
          )}
          {"small" in variants && (
            <th>
              <Text variant="small">Small (&lt;&nbsp;767)</Text>
            </th>
          )}
          {!("large" in variants && "small" in variants) && (
            <th>
              <Text variant="small">Specifications</Text>
            </th>
          )}
          <th>
            <Text variant="small">Example</Text>
          </th>
        </tr>
      </thead>

      <tbody>
        {names.map((key) => (
          <tr key={key}>
            <td>
              <Text variant="small">{key}</Text>
            </td>
            {"large" in variants && (
              <td>
                <Specification size="large" treatment={variants.large[key]} />
              </td>
            )}
            {"small" in variants && (
              <td>
                <Specification size="small" treatment={variants.small[key]} />
              </td>
            )}
            {!("large" in variants && "small" in variants) && (
              <td>
                <Specification size="default" treatment={variants[key]} />
              </td>
            )}
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
          <Text key={element} as={element} variant="text">
            This is a text component with an element set to {element}
          </Text>
        )
      })}
    </>
  )
}

export const CustomTypography = () => {
  const SPECIFICATIONS = [
    {
      fontFamily: "sans",
      fontSize: "size12",
      lineHeight: "solid",
      letterSpacing: "tightest",
    },
    {
      fontFamily: "serif",
      fontSize: "70px",
      lineHeight: "solid",
      letterSpacing: "tight",
    },
    {
      fontFamily: "sans",
      fontSize: "48px",
      lineHeight: "solid",
      letterSpacing: "tightest",
    },
    {
      fontFamily: "serif",
      fontSize: "55px",
      lineHeight: "solid",
      letterSpacing: "tightest",
    },
    {
      fontFamily: "serif",
      variant: "text",
      lineHeight: "solid",
    },
  ] as const

  return (
    <Table>
      <thead>
        <tr>
          <th>
            <Text variant="small">Specifications</Text>
          </th>
          <th>
            <Text variant="small">Example</Text>
          </th>
        </tr>
      </thead>

      <tbody>
        {SPECIFICATIONS.map((specification, i) => (
          <tr key={i}>
            <td>
              <Specification treatment={specification} />
            </td>
            <td>
              <Text {...specification}>
                All their equipment and instruments are alive
              </Text>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export const Truncation = () => {
  return (
    <States<TextProps> states={[{ overflowEllipsis: true }, { lineClamp: 2 }]}>
      <Text variant="text">
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
