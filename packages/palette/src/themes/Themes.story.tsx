import React from "react"
import { Box, Column, GridColumns, Join, Spacer, Text } from "../elements"
import { useTheme } from "../Theme"

export default {
  title: "Theme",
}

export const Theme = () => {
  const { theme } = useTheme()
  return <pre>{JSON.stringify(theme, null, 2)}</pre>
}

export const Colors = () => {
  const { theme } = useTheme()
  const colors = Object.entries(theme.colors)

  return (
    <Join separator={<Spacer my={2} />}>
      {colors.map(([name, value]) => {
        return (
          <GridColumns key={name} justifyContent="space-between">
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
    </Join>
  )
}

export const Spacing = () => {
  const { theme } = useTheme()

  const spacing = Object.keys(theme.space).sort(
    (a, b) => parseFloat(a) - parseFloat(b)
  )

  return (
    <Join separator={<Spacer my={2} />}>
      {spacing.map((key) => {
        const px = parseFloat(key) * 10

        return (
          <Box key={key}>
            <Text variant="title">{key}</Text>
            <Text color="black60">{px}px</Text>
            <Box width={px} height={1} bg="black60" />
          </Box>
        )
      })}
    </Join>
  )
}

export const Grid = () => {
  const { theme } = useTheme()

  return (
    <Join separator={<Spacer my={2} />}>
      <Text variant="largeTitle">Desktop</Text>

      <GridColumns width="100%" height={600}>
        {[...new Array(12)].map((_, i) => (
          <Column key={i} span={[1]} bg="black10" height="100%" />
        ))}
      </GridColumns>

      <Text variant="largeTitle">Tablet</Text>

      <GridColumns width={theme.breakpoints.sm} height={600} mx="auto">
        {[...new Array(12)].map((_, i) => (
          <Column key={i} span={[1]} bg="black10" height="100%" />
        ))}
      </GridColumns>

      <Text variant="largeTitle">Mobile</Text>

      <GridColumns width={480} gridColumnGap={1} height={600} mx="auto">
        {[...new Array(12)].map((_, i) => (
          <Column key={i} span={[1]} bg="black10" height="100%" />
        ))}
      </GridColumns>
    </Join>
  )
}
