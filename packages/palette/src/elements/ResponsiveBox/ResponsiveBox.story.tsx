import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Box } from "../Box"
import { Text } from "../Text"
import { Image } from "../Image"
import {
  ResponsiveBox,
  ResponsiveBoxAspectDimensions,
  ResponsiveBoxMaxDimensions,
  ResponsiveBoxProps,
} from "./ResponsiveBox"

const Measure: React.FC<ResponsiveBoxProps> = (props) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const ref = useRef<null | HTMLDivElement>(null)

  const check = () => {
    if (!ref.current) return
    setDimensions({
      width: ref.current!.offsetWidth,
      height: ref.current!.offsetHeight,
    })
  }

  useEffect(() => {
    check()
    window.addEventListener("resize", check)
    return () => {
      window.removeEventListener("resize", check)
    }
  })

  return (
    <Box width="100%" height="100%" p={1} ref={ref as any}>
      <Text variant="xs" color="white100">
        {props.aspectWidth}:{props.aspectHeight}
        <br />
        {("maxWidth" in props || "maxHeight" in props) && (
          <>
            with max dimensions of{" "}
            {[
              (props as any).maxHeight || 0,
              (props as any).maxWidth || "_",
            ].join(" × ")}
            <br />
          </>
        )}
        Renders @ {dimensions.width} × {dimensions.height}
      </Text>
    </Box>
  )
}

const EXAMPLE_ASPECTS: ResponsiveBoxAspectDimensions[] = [
  { aspectWidth: 300, aspectHeight: 400 },
  { aspectWidth: 400, aspectHeight: 300 },
]

const EXAMPLE_MAXIMUMS: ResponsiveBoxMaxDimensions[] = [
  { maxHeight: 200, maxWidth: 200 },
  { maxHeight: 400, maxWidth: 400 },
  { maxHeight: 400 },
  { maxWidth: 400 },
  { maxHeight: 600, maxWidth: 600 },
  { maxHeight: 100, maxWidth: 600 },
  { maxHeight: 1024, maxWidth: 1024 },
]

export default { title: "Components/ResponsiveBox" }

export const Basic = () => {
  return (
    <>
      {EXAMPLE_ASPECTS.map((aspect, i) =>
        EXAMPLE_MAXIMUMS.map((maximum, j) => {
          return (
            <ResponsiveBox
              key={[i, j].join(".")}
              {...aspect}
              {...maximum}
              bg="brand"
              my={2}
            >
              <Measure {...aspect} {...maximum} />
            </ResponsiveBox>
          )
        })
      )}
    </>
  )
}

export const MaxWidth100 = () => {
  return (
    <>
      {EXAMPLE_ASPECTS.map((aspect, i) => {
        return (
          <ResponsiveBox key={i} {...aspect} maxWidth="100%" bg="brand" my={2}>
            <Measure {...aspect} maxWidth="100%" />
          </ResponsiveBox>
        )
      })}
    </>
  )
}

MaxWidth100.story = {
  name: "maxWidth: 100%",
}

const Masonry = styled(Box)`
  column-count: 3;

  * {
    break-inside: avoid;
  }
`

export const ColumnsWithResponsiveImages = () => {
  return (
    <Masonry>
      {new Array(12).fill(0).map((_, i) => {
        const orientation = i % 3 === 0 ? "portrait" : "landscape"
        const width = orientation === "portrait" ? 200 : 300
        const height = orientation === "portrait" ? 300 : 200

        return (
          // Simply being wrapped in an extra `Box` causes a image loading bug in Chrome
          <Box key={i}>
            <ResponsiveBox
              aspectWidth={width}
              aspectHeight={height}
              maxWidth="100%"
              bg="black10"
              mb={2}
            >
              <Image
                lazyLoad
                width="100%"
                height="100%"
                src={`https://picsum.photos/seed/${i}/${width}/${height}`}
                srcSet={`https://picsum.photos/seed/${i}/${width}/${height} 1x, https://picsum.photos/seed/${i}/${
                  width * 2
                }/${height * 2} 2x`}
              />
            </ResponsiveBox>
          </Box>
        )
      })}
    </Masonry>
  )
}
