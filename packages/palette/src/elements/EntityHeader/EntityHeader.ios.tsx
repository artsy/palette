import React, { SFC } from "react"
import { Avatar } from "../Avatar"
import { Box } from "../Box"
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
  const containerProps = href
    ? { color: "black100", noUnderline: true, href }
    : {}
  return (
    <Flex
      justifyContent="space-between"
      flexDirection="row"
      {...remainderProps}
      {...containerProps}
    >
      <Flex justifyContent="space-between" flexDirection="row">
        {(imageUrl || initials) && (
          <Flex mr={1}>
            <Avatar
              size="xs"
              width={45}
              height={45}
              src={imageUrl}
              initials={initials}
            />
          </Flex>
        )}
        {!!meta && (
          <Flex ml="10" flexDirection="column">
            <Serif mb="-2" size="3t" color="black100">
              {name}
            </Serif>

            <Sans mt="-2" size="3t" color="black60">
              {meta}
            </Sans>
          </Flex>
        )}
        {!meta && (
          <Flex ml="10" flexDirection="column" justifyContent="center">
            <Serif size="3t" color="black100">
              {name}
            </Serif>
          </Flex>
        )}
      </Flex>

      <Flex>
        {FollowButton && (
          <Box width={102} height={34}>
            {FollowButton}
          </Box>
        )}
      </Flex>
    </Flex>
  )
}

EntityHeader.displayName = "EntityHeader"
