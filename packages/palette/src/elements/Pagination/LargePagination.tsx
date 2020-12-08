import React from "react"
import { ChevronIcon } from "../../svgs/ChevronIcon"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Link } from "../Link"
import { Text } from "../Text"

interface PageCursor {
  cursor: string
  isCurrent: boolean
  page: number
}

export interface PageCursors {
  first: PageCursor
  last: PageCursor
  around: PageCursor[]
  previous: PageCursor
}

export interface Props {
  onClick?: (cursor: string, page: number) => void
  onNext?: () => void
  pageCursors: PageCursors
  hasNextPage: boolean
  scrollTo?: string
}

/** LargePagination */
export const LargePagination = (props: Props) => {
  const {
    pageCursors: { around, first, last, previous },
    onClick,
    onNext,
    hasNextPage,
  } = props

  const handlePrevClick = () => {
    if (previous) {
      onClick(previous.cursor, previous.page)
    }
  }

  const handleNextClick = () => {
    onNext()
  }

  const aroundPages = around.map(pageCursor => {
    const { cursor, page } = pageCursor
    const key = cursor + page
    return <Page key={key} onClick={onClick} pageCursor={pageCursor} />
  })

  return (
    <Flex
      alignItems="baseline"
      flexDirection="row"
      justifyContent="flex-end"
      mr={-1}
    >
      {first && <FirstPage onClick={onClick} pageCursor={first} />}
      {aroundPages}
      {last && <LastPage onClick={onClick} pageCursor={last} />}

      <Box ml={4}>
        <PrevButton enabled={!!previous} onClick={handlePrevClick} />
        <NextButton enabled={hasNextPage} onClick={handleNextClick} />
      </Box>
    </Flex>
  )
}

interface PageProps {
  onClick?: (cursor: string, page: number) => void
  pageCursor: PageCursor
}

const Page: React.FC<PageProps> = props => {
  const { onClick, pageCursor } = props
  const { cursor, isCurrent, page } = pageCursor

  const handleClick = () => {
    onClick(cursor, page)
  }

  const highlight = isCurrent ? "black5" : "white100"
  const href = ""

  return (
    <Box bg={highlight} borderRadius={2}>
      <Link href={href} onClick={handleClick} underlineBehavior="hover">
        <Text px={0.5} variant="mediumText">
          {page}
        </Text>
      </Link>
    </Box>
  )
}

const DotDotDot = () => {
  return (
    <Text color="black30" display="inline" mx={0.5} variant="mediumText">
      ...
    </Text>
  )
}

const FirstPage: React.FC<PageProps> = props => {
  const { onClick, pageCursor } = props

  return (
    <>
      <Page onClick={onClick} pageCursor={pageCursor} />
      <DotDotDot />
    </>
  )
}

const LastPage: React.FC<PageProps> = props => {
  const { onClick, pageCursor } = props

  return (
    <>
      <DotDotDot />
      <Page onClick={onClick} pageCursor={pageCursor} />
    </>
  )
}

export interface PageButton {
  enabled: boolean
  onClick: () => void
}

const PrevButton: React.FC<PageButton> = props => {
  const { enabled, onClick } = props
  const opacity = enabled ? 1 : 0.1
  const href = ""

  return (
    <Link
      href={href}
      onClick={onClick}
      style={{ opacity }}
      underlineBehavior="hover"
    >
      <ChevronIcon direction="left" top={0.5} />
      <Text display="inline" px={0.5} variant="mediumText">
        Prev
      </Text>
    </Link>
  )
}

const NextButton: React.FC<PageButton> = props => {
  const { enabled, onClick } = props
  const opacity = enabled ? 1 : 0.1
  const href = ""

  return (
    <Link
      href={href}
      onClick={onClick}
      style={{ opacity }}
      underlineBehavior="hover"
    >
      <Text display="inline" px={0.5} variant="mediumText">
        Next
      </Text>
      <ChevronIcon direction="right" top={0.5} />
    </Link>
  )
}
