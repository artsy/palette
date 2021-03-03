import React from "react"
import styled from "styled-components"
import { Color } from "../../Theme"
import { Avatar } from "../Avatar"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Link } from "../Link"
import { SpacerProps } from "../Spacer"
import { Text } from "../Text"

export interface EntityHeaderProps extends SpacerProps {
  href?: string
  imageUrl?: string
  initials?: string
  meta?: string
  name: string
  FollowButton?: JSX.Element
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  smallVariant?: boolean
}

interface ContainerComponentProps {
  color?: Color
  href?: string
  noUnderline?: boolean
}

/**
 * Component that is used as entity header that is paired with rich information about the entity.
 */
export const EntityHeader: React.FC<EntityHeaderProps> = ({
  href,
  imageUrl,
  initials,
  name,
  meta,
  FollowButton,
  smallVariant,
  ...remainderProps
}) => {
  const ContainerComponent = href ? FlexLink : Flex

  const containerProps: ContainerComponentProps = href
    ? { color: "black100", noUnderline: true, href }
    : {}

  return (
    <ContainerComponent {...remainderProps} {...containerProps}>
      {(imageUrl || initials) && (
        <Flex mr={1}>
          <Avatar
            size={smallVariant ? "xxs" : "xs"}
            src={imageUrl}
            initials={initials}
          />
        </Flex>
      )}

      {smallVariant ? (
        <Flex alignItems="center" width="100%">
          <Text variant="text">{name}</Text>

          <Text variant="text">
            {FollowButton && (
              <>
                {
                  <Text variant="text" mx={0.3} display="inline-block">
                    •
                  </Text>
                }
                <Box
                  display="inline-block"
                  onClick={(event) => {
                    // Capture click event so that interacting with Follow doesn't
                    // trigger Container's link.
                    event.stopPropagation()
                  }}
                >
                  {FollowButton}
                </Box>
              </>
            )}
          </Text>
        </Flex>
      ) : (
        <Flex flexDirection="column" justifyContent="center" width="100%">
          <Text variant="mediumText" color="black100">
            {name}
          </Text>

          <Text variant="text" color="black60">
            {!!meta && <span>{meta}</span>}

            {FollowButton && (
              <>
                {meta && (
                  <Text
                    variant="text"
                    color="black60"
                    mx={0.3}
                    display="inline-block"
                  >
                    •
                  </Text>
                )}
                <Box
                  display="inline-block"
                  onClick={(event) => {
                    // Capture click event so that interacting with Follow doesn't
                    // trigger Container's link.
                    event.stopPropagation()
                  }}
                >
                  {FollowButton}
                </Box>
              </>
            )}
          </Text>
        </Flex>
      )}
    </ContainerComponent>
  )
}

const FlexLink = styled(Link)`
  display: flex;
`

EntityHeader.displayName = "EntityHeader"
