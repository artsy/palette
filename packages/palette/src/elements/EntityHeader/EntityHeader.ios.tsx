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
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      flexWrap="nowrap"
      {...remainderProps}
    >
      {(imageUrl || initials) && (
        <Flex mr={1} justifyContent="center">
          <Avatar size="xs" src={imageUrl} initials={initials} />
        </Flex>
      )}
      <Flex justifyContent="center" width={0} flexGrow={1}>
        <Serif
          ellipsizeMode="tail"
          numberOfLines={1}
          size="3t"
          color="black100"
        >
          {name}
        </Serif>
        {!!meta && (
          <Sans ellipsizeMode="tail" numberOfLines={1} size="2" color="black60">
            {meta}
          </Sans>
        )}
      </Flex>

      {FollowButton && (
        <Flex
          ml={1}
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          {FollowButton}
        </Flex>
      )}
    </Flex>
  )
}

EntityHeader.displayName = "EntityHeader"
