import { Color, Flex, Text } from "@artsy/palette"
import React from "react"

export const TextSpecification: React.FC<{
  size?: "small" | "large"
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
