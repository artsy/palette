import React from "react"
import { Label, LabelProps } from "../Label"
import { Flex, FlexProps } from "../Flex"
import { ImageProps } from "../Image"
import { Avatar } from "../Avatar"
import { Text } from "../Text"

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
 * @deprecated: Use EntityHeader fragment container patterns within Force instead
 */

export const EntityHeader: React.FC<EntityHeaderProps> = ({
  name,
  href,
  meta,
  initials,
  imageUrl,
  image,
  smallVariant,
  FollowButton,
  labels,
  ...rest
}) => {
  return (
    <Flex alignItems="center" justifyContent="space-between" {...rest}>
      <Flex
        alignItems="center"
        {...(href ? { as: "a", href, style: { textDecoration: "none" } } : {})}
      >
        {(imageUrl || image || initials) && (
          <Flex mr={1}>
            <Avatar
              size={smallVariant ? "xxs" : "xs"}
              src={imageUrl}
              initials={initials}
              {...image}
            />
          </Flex>
        )}

        <Flex flexDirection="column" mr={1}>
          <Text variant="sm-display">{name}</Text>

          <Text variant="sm-display">
            {labels?.map((label, i) => (
              <React.Fragment key={i}>
                <Label {...label} />{" "}
              </React.Fragment>
            ))}
          </Text>

          {meta && (
            <Text variant="xs" color="black60">
              {meta}
            </Text>
          )}
        </Flex>
      </Flex>

      {FollowButton}
    </Flex>
  )
}

EntityHeader.displayName = "EntityHeader"
