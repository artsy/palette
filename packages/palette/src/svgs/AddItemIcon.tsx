import React from "react"
import { color } from "../helpers"
import { Icon, IconProps, Path, Title } from "./Icon"

/** AddItemIcon */
export const AddItemIcon: React.FC<IconProps> = ({
  title = "Submit your artwork",
  ...props
}) => {
  return (
    <Icon {...props} viewBox="0 0 125 161">
      <Title>{title}</Title>
      <Path
        fill={color(props.fill!)}
        d="M10.48 20.893a3.75 3.75 0 00-3.75 3.75v11.254h7.5v-7.504H24.24v-7.5H10.48zM58.631 20.893H31.115v7.5H58.63v-7.5zM93.024 20.893H65.507v7.5h27.517v-7.5zM113.658 20.893H99.9v7.5h10.008v7.504h7.5V24.643a3.75 3.75 0 00-3.75-3.75zM117.408 64.03V41.52h-7.5V64.03h7.5zM6.73 41.521V64.03h7.5V41.522h-7.5zM6.73 69.654v22.508h7.5V69.654h-7.5zM117.408 92.162V69.654h-7.5v22.508h7.5zM6.73 97.787v22.508h7.5V97.787h-7.5zM117.408 120.295V97.787h-7.5v22.508h7.5zM117.408 137.174V125.92h-7.5v7.504H99.9v7.5h13.758a3.75 3.75 0 003.75-3.75zM6.73 125.92v11.254a3.75 3.75 0 003.75 3.75H24.24v-7.5H14.23v-7.504h-7.5zM31.115 140.924H58.63v-7.5H31.115v7.5zM65.507 140.924h27.517v-7.5H65.507v7.5zM62.48 56.643a4 4 0 014 4v16.444h16a4 4 0 010 8h-16v15.556a4 4 0 01-8 0V85.087h-16a4 4 0 110-8h16V60.643a4 4 0 014-4z"
      />
    </Icon>
  )
}
