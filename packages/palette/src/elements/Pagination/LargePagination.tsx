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

export interface PaginationProps {
  getHref?: (page: number) => string
  hasNextPage: boolean
  onClick?: (cursor: string, page: number, event: React.MouseEvent) => void
  onNext?: (event: React.MouseEvent) => void
  pageCursors: PageCursors
  scrollTo?: string
}

/** LargePagination */
export const LargePagination = (props: PaginationProps) => {
  const {
    getHref,
    hasNextPage,
    onClick,
    onNext,
    pageCursors: { around, first, last, previous },
  } = props

  const handlePrevClick = event => {
    if (previous) {
      onClick(previous.cursor, previous.page, event)
    }
  }

  const handleNextClick = event => {
    onNext(event)
  }

  const aroundPages = around.map(pageCursor => {
    const { cursor, page } = pageCursor
    const key = cursor + page
    return (
      <Page
        key={key}
        onClick={onClick}
        pageCursor={pageCursor}
        getHref={getHref}
      />
    )
  })

  return (
    <Flex
      alignItems="baseline"
      flexDirection="row"
      justifyContent="flex-end"
      mr={-1}
    >
      {first && (
        <FirstPage onClick={onClick} pageCursor={first} getHref={getHref} />
      )}
      {aroundPages}
      {last && (
        <LastPage onClick={onClick} pageCursor={last} getHref={getHref} />
      )}

      <Box ml={4}>
        <PrevButton enabled={!!previous} onClick={handlePrevClick} />
        <NextButton enabled={hasNextPage} onClick={handleNextClick} />
      </Box>
    </Flex>
  )
}

interface PageProps {
  getHref?: (page: number) => string
  onClick?: (cursor: string, page: number, event: React.MouseEvent) => void
  pageCursor: PageCursor
}

const Page: React.FC<PageProps> = props => {
  const { getHref, onClick, pageCursor } = props
  const { cursor, isCurrent, page } = pageCursor

  const handleClick = event => {
    onClick(cursor, page, event)
  }

  const highlight = isCurrent ? "black5" : "white100"

  const href = getHref(page)

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
  const { onClick, pageCursor, getHref } = props

  return (
    <>
      <Page onClick={onClick} pageCursor={pageCursor} getHref={getHref} />
      <DotDotDot />
    </>
  )
}

const LastPage: React.FC<PageProps> = props => {
  const { onClick, pageCursor, getHref } = props

  return (
    <>
      <DotDotDot />
      <Page onClick={onClick} pageCursor={pageCursor} getHref={getHref} />
    </>
  )
}

export interface PageButton {
  enabled: boolean
  onClick: (event: React.MouseEvent) => void
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
