import React, { useState } from "react"
import styled from "styled-components"
import { color } from "../../helpers"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Join } from "../Join"
import { Link } from "../Link"
import { Sans } from "../Typography"

interface TagProps {
  name: string
  href: string
}

interface TagsProps {
  tags: TagProps[]
  displayNum?: number
}
/**
 * Use tags for genes and categories that relate to an Artist or Artwork.
 */
export const Tags: React.FC<TagsProps> = ({
  tags,
  displayNum = tags.length,
}) => {
  const [expanded, setExpanded] = useState(false)
  const sliceSize = expanded ? tags.length : displayNum
  const tagEls = tags.slice(0, sliceSize).map((tag, i) => {
    return <Tag key={i} {...tag} />
  })
  const moreButton = displayNum < tags.length && !expanded && (
    <MoreTag
      count={tags.length - displayNum}
      onClick={() => setExpanded(true)}
    />
  )
  return (
    <>
      <Flex flexWrap="wrap" mb={-0.5}>
        <Join separator={<Box pl={0.5} />}>
          {tagEls}
          {moreButton}
        </Join>
      </Flex>
    </>
  )
}

const Tag: React.FC<TagProps> = ({ name, href }) => {
  return (
    <Link href={href} underlineBehavior="none">
      <TagBox>{name}</TagBox>
    </Link>
  )
}

const tagsBoxMargins = {
  px: 1,
  py: 0.5,
  mb: 0.5,
}

const TagBox: React.FC = ({ children }) => (
  <HoverBox {...tagsBoxMargins}>
    <Sans size="2" color="black60">
      {children}
    </Sans>
  </HoverBox>
)

const MoreTag: React.FC<{ onClick: (e) => void; count: number }> = ({
  onClick,
  count,
}) => {
  return (
    <MoreBox {...tagsBoxMargins} onClick={onClick}>
      <Sans size="2" color="black60">
        +{count} more
      </Sans>
    </MoreBox>
  )
}

const HoverBox = styled(Box)`
  border: 1px solid ${color("black10")};
  background-color: ${color("black10")};
  &:hover {
    background-color: ${color("black30")};
    border-color: ${color("black30")};
  }
  transition: all 0.25s;
`

const MoreBox = styled(Box)`
  border: 1px solid ${color("black10")};
  &:hover {
    border-color: ${color("black30")};
  }
  transition: all 0.25s;
  cursor: pointer;
`
