import React from "react"
import { useThemeConfig } from "../../Theme"
import { LabelProps } from "../Label/Label"
import { FlexProps } from "../Flex"
import { ImageProps } from "../Image"
import { EntityHeader as EntityHeaderV2 } from "./v2/EntityHeader"
import { EntityHeader as EntityHeaderV3 } from "./v3/EntityHeader"

export interface EntityHeaderProps extends FlexProps {
  href?: string
  /** @deprecated: use `image` instead */
  imageUrl?: string
  /** Pass props to the underlying `Image` in `Avatar` */
  image?: Partial<ImageProps>
  initials?: string
  meta?: string
  name: string
  labels?: LabelProps[]
  smallVariant?: boolean
  FollowButton?: JSX.Element
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}
/**
 * Component that is used as entity header that is paired with rich information about the entity.
 */
export const EntityHeader: React.FC<EntityHeaderProps> = (props) => {
  return useThemeConfig({
    v2: <EntityHeaderV2 {...props} />,
    v3: <EntityHeaderV3 {...props} />,
  })
}

EntityHeader.displayName = "EntityHeader"
