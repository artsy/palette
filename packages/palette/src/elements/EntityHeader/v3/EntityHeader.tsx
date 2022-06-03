import React from "react"
import { Avatar } from "../../Avatar"
import { Label } from "../../Label/Label"
import { Flex } from "../../Flex"
import { Text } from "../../Text"
import { EntityHeaderProps } from "../EntityHeader"

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
