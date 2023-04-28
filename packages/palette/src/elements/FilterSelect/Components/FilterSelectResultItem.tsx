import React from "react"
import { Checkbox } from "../../Checkbox"
import { Item, useFilterSelectContext } from "./FilterSelectContext"
import { Radio } from "../../Radio"

export const FilterSelectResultItem: React.FC<Item> = (props) => {
  const {
    renderItemLabel,
    selectedItems,
    toggleSelectedItem,
    multiselect,
  } = useFilterSelectContext()

  const isSelected = !!selectedItems.find(
    (item: Item) => item.value === props.value
  )
  const label = renderItemLabel ? renderItemLabel(props) : props.label
  const Component = multiselect ? Checkbox : Radio

  return (
    <Component
      onSelect={() => toggleSelectedItem(props)}
      selected={isSelected}
      key={props.value}
      my={1}
    >
      {label}
    </Component>
  )
}
