import React from "react"
import { Avatar } from "../../Avatar"
import { Flex } from "../../Flex"
import { Text } from "../../Text"
import { EntityHeaderProps } from "../EntityHeader"

export const EntityHeader: React.FC<EntityHeaderProps> = ({
  name,
  href,
  meta,
  initials,
  imageUrl,
  smallVariant,
  FollowButton,
  ...rest
}) => {
  return (
    <Flex alignItems="center" justifyContent="space-between" {...rest}>
      <Flex
        alignItems="center"
        {...(!!href
          ? { as: "a", href, style: { textDecoration: "none" } }
          : {})}
      >
        {(imageUrl || initials) && (
          <Flex mr={1}>
            <Avatar
              size={smallVariant ? "xxs" : "xs"}
              src={imageUrl}
              initials={initials}
            />
          </Flex>
        )}

        <Flex flexDirection="column">
          <Text variant="md">{name}</Text>

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
