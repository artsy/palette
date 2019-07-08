import React, { SFC } from "react"
import { Avatar } from "../Avatar"
import { Flex } from "../Flex"
import { SpacerProps } from "../Spacer"
import { Sans, Serif } from "../Typography"

interface EntityHeaderProps extends SpacerProps {
  href?: string
  imageUrl?: string
  initials?: string
  meta?: string
  name: string
  FollowButton?: JSX.Element
}

/**
 * Component that is used as entity header that is paired with rich information about the entity.
 * Spec: zpl.io/aNoYM6d
 */
export const EntityHeader: SFC<EntityHeaderProps> = ({
  href,
  imageUrl,
  initials,
  name,
  meta,
  FollowButton,
  ...remainderProps
}) => {
  return (
    <Flex flexDirection="row" {...remainderProps}>
      {(imageUrl || initials) && (
        <Flex mr={1} justifyContent="center">
          <Avatar size="xs" src={imageUrl} initials={initials} />
        </Flex>
      )}
      <Flex width="150px" flexGrow={1} ml="2px" justifyContent="center">
        <Serif
          ellipsizeMode="tail"
          numberOfLines={1}
          mb="-2"
          size="3t"
          color="black100"
        >
          {name}
        </Serif>
        {!!meta && (
          <Sans mt="-2" size="3t" color="black60">
            {meta}
          </Sans>
        )}
      </Flex>

      {FollowButton && (
        <Flex ml={1} justifyContent="center">
          {FollowButton}
        </Flex>
      )}
    </Flex>
  )
}

EntityHeader.displayName = "EntityHeader"
