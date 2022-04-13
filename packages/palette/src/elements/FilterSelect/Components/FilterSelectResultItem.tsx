import React from "react"
import { Checkbox } from "../../Checkbox"
import { Item, useFilterSelectContext } from "./FilterSelectContext"

export const FilterSelectResultItem: React.FC<Item> = (props) => {
  const {
    renderItemLabel,
    selectedItems,
    toggleSelectedItems,
  } = useFilterSelectContext()

  const isSelected = !!selectedItems.find(
    (item: Item) => item.value === props.value
  )
  const label = renderItemLabel ? renderItemLabel(props) : props.label

  return (
    <Checkbox
      onSelect={() => toggleSelectedItems(props)}
      selected={isSelected}
      key={props.value}
      my={1}
    >
      {label}
    </Checkbox>
  )
}
