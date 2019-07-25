import React, { SFC } from "react"
import { Dimensions } from "react-native"
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
  const viewWidth = Dimensions.get("window").width
  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      flexWrap="nowrap"
      width={viewWidth - 40}
      {...remainderProps}
    >
      {(imageUrl || initials) && (
        <Flex mr={1} justifyContent="center">
          <Avatar size="xs" src={imageUrl} initials={initials} />
        </Flex>
      )}
      <Flex ml="2px" justifyContent="center" width={viewWidth - 190}>
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
          <Sans
            ellipsizeMode="tail"
            numberOfLines={1}
            mt="-2"
            size="3t"
            color="black60"
          >
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
