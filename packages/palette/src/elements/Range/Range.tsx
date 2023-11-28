import { themeGet } from "@styled-system/theme-get"
import * as React from "react"
import { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"
import { FLAT_SHADOW } from "../../helpers"
import { useUpdateEffect } from "../../utils"
import { remapValue } from "../../utils/remapValue"
import { Box, BoxProps } from "../Box"
import { Flex } from "../Flex"

export const RANGE_HANDLE_SIZE = 24

export interface RangeProps extends BoxProps {
  ariaLabels?: [string, string]
  min: number
  max: number
  step: number
  value?: number[]
  onChange?: (range: [number, number]) => void
}

export const Range: React.FC<RangeProps> = ({
  ariaLabels,
  min,
  max,
  step,
  value = [0, max],
  onChange,
  ...rest
}) => {
  const minRef = useRef<HTMLInputElement | null>(null)
  const maxRef = useRef<HTMLInputElement | null>(null)

  const [values, setValues] = useState(value)

  const [maxWidth, setMaxWidth] = useState(0)

  const handleMinChange = ({
    target: { valueAsNumber: value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (value > values[1] - step) return
    setValues([value, values[1]])
    onChange?.([value, values[1]])
  }

  const handleMaxChange = ({
    target: { valueAsNumber: value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (value < values[0] + step) return
    setValues([values[0], value])
    onChange?.([values[0], value])
  }

  useEffect(() => {
    const handleResize = () => {
      if (!maxRef.current) return
      setMaxWidth(maxRef.current.offsetWidth)
    }

    requestAnimationFrame(handleResize)

    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Sync local state with value prop
  useUpdateEffect(() => {
    setValues(value)
  }, [...value])

  const selectionRectangle = `rect(0, ${remapValue(
    values[1],
    { min, max },
    { min: 0, max: maxWidth - RANGE_HANDLE_SIZE }
  )}px, 2px, ${remapValue(
    values[0],
    { min, max },
    { min: 0, max: maxWidth - RANGE_HANDLE_SIZE }
  )}px)`

  const maxRectangle = `rect(0, ${maxWidth}px, ${RANGE_HANDLE_SIZE}px, ${remapValue(
    values[1],
    { min, max },
    { min: 0, max: maxWidth - RANGE_HANDLE_SIZE }
  )}px)`

  return (
    <Track {...rest}>
      <Selection style={{ clip: selectionRectangle }} />

      <Slider
        ref={minRef as any}
        min={min}
        max={max}
        step={step}
        onInput={handleMinChange}
        value={values[0]}
        aria-label={ariaLabels?.[0]}
      />

      <Slider
        ref={maxRef as any}
        min={min}
        max={max}
        step={step}
        onInput={handleMaxChange}
        value={values[1]}
        style={{ clip: maxRectangle }}
        aria-label={ariaLabels?.[1]}
      />
    </Track>
  )
}

const Track = styled(Flex)`
  align-items: center;
  position: relative;
  height: ${RANGE_HANDLE_SIZE}px;

  &:before {
    content: "";
    display: block;
    position: absolute;
    height: 2px;
    left: 0;
    right: 0;
    top: 50%;
    margin-top: -1px;
    background-color: ${themeGet("colors.black30")};
  }
`

const Selection = styled(Box)`
  position: absolute;
  height: 2px;
  left: 0;
  right: 0;
  top: 50%;
  margin-top: -1px;
  background-color: ${themeGet("colors.brand")};
`

const railStyles = css`
  width: 100%;
  height: ${RANGE_HANDLE_SIZE}px;
`

const handleStyles = css`
  user-select: none;
  cursor: grab;
  width: ${RANGE_HANDLE_SIZE}px;
  height: ${RANGE_HANDLE_SIZE}px;
  background-color: ${themeGet("colors.white100")};
  border-radius: 50%;
  border: 1px solid ${themeGet("colors.black10")};
  box-shadow: ${FLAT_SHADOW};
`

const Slider = styled.input`
  appearance: none;
  background: transparent;
  position: relative;
  margin: 0;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;

  &::-webkit-slider-runnable-track {
    ${railStyles}
  }

  &::-moz-range-track {
    ${railStyles}
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    ${handleStyles}
  }

  &::-moz-range-thumb {
    ${handleStyles}
  }

  &:active {
    &::-webkit-slider-thumb {
      box-shadow: none;
      background-color: ${themeGet("colors.black5")};
    }

    &::-moz-range-thumb {
      box-shadow: none;
      background-color: ${themeGet("colors.black5")};
    }
  }
`

Slider.defaultProps = {
  type: "range",
}
