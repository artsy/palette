import React from "react"
import { Box } from "../elements/Box"
import { Column, GridColumns } from "../elements/GridColumns"
import { Text } from "../elements/Text"
import { useTheme } from "../Theme"

export default {
  title: "Theme/V3",
}

export const Theme = () => {
  const { theme } = useTheme()
  return <pre>{JSON.stringify(theme, null, 2)}</pre>
}

export const Colors = () => {
  const { theme } = useTheme()
  const colors = Object.entries(theme.colors)

  return (
    <>
      {colors.map(([name, value], i) => {
        return (
          <GridColumns
            key={name}
            justifyContent="space-between"
            my={i === 0 || i === colors.length - 1 ? 0 : 3}
          >
            <Column span={3} display="flex" alignItems="center">
              <Box width={30} height={30} bg={name} borderRadius="50%" />
              <Text ml={1}>{name}</Text>
            </Column>

            <Column span={9} display="flex" alignItems="center">
              <Text color="black60">color:&nbsp;</Text>
              <Text>{value}</Text>
            </Column>
          </GridColumns>
        )
      })}
    </>
  )
}
