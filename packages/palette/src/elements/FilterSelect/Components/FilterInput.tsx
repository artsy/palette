import * as React from "react"
import CloseStrokeIcon from "@artsy/icons/CloseStrokeIcon"
import SearchIcon from "@artsy/icons/SearchIcon"
import { InputProps } from "../../Input"
import { LabeledInput } from "../../LabeledInput"
import { Clickable } from "../../Clickable"
import { useRef } from "react"
import { useFilterSelectContext } from "./FilterSelectContext"

export type FilterInputProps = InputProps

export const FilterInput: React.FC<InputProps> = (props) => {
  const { query, setQuery, placeholder } = useFilterSelectContext()
  const ref = useRef<HTMLInputElement | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleClick = () => {
    setQuery("")
    ref.current?.focus()
  }

  return (
    <LabeledInput
      ref={ref}
      role="search"
      label={
        query !== "" ? (
          // Active state
          <Clickable
            display="flex"
            onClick={handleClick}
            aria-label="Clear search input"
          >
            <CloseStrokeIcon />
          </Clickable>
        ) : (
          // Resting state
          <SearchIcon style={{ pointerEvents: "none" }} />
        )
      }
      onChange={handleChange}
      value={query}
      placeholder={placeholder}
      {...props}
    />
  )
}
