import React from "react"
import { ChevronIcon } from "../../svgs/ChevronIcon"
import { useThemeConfig } from "../../Theme"
import { Box, BoxProps } from "../Box"
import { Flex, FlexProps } from "../Flex"
import { Link, LinkProps } from "../Link"
import { Text } from "../Text"

interface PageCursor {
  cursor: string
  isCurrent: boolean
  page: number
}

export interface PageCursors {
  around: PageCursor[]
  first: PageCursor
  last: PageCursor
  previous: PageCursor
}

export interface PaginationProps extends FlexProps {
  getHref?: (page: number) => string
  hasNextPage: boolean
  onClick?: (cursor: string, page: number, event: React.MouseEvent) => void
  onNext?: (event: React.MouseEvent, page: number) => void
  pageCursors: PageCursors
  scrollTo?: string
}

/** LargePagination */
export const LargePagination: React.FC<PaginationProps> = ({
  getHref,
  hasNextPage,
  onClick,
  onNext,
  pageCursors: { around, first, last, previous },
  ...rest
}) => {
  const handlePrevClick = (event: React.MouseEvent) => {
    if (previous) {
      onClick(previous.cursor, previous.page, event)
    }
  }

  const handleNextClick = (event: React.MouseEvent) => {
    onNext(event, nextPage)
  }

  const nextPage = (previous?.page || 0) + 2

  const tokens = useThemeConfig({
    v2: {
      flexProps: {
        flexDirection: "row",
        justifyContent: "flex-end",
        mr: -1,
      } as FlexProps,
      order: {
        pages: 1,
        prev: 2,
        next: 3,
      },
    },
    v3: {
      flexProps: {
        justifyContent: "space-between",
      },
      order: {
        prev: 1,
        pages: 2,
        next: 3,
      },
    },
  })

  return (
    <Flex alignItems="center" {...tokens.flexProps} {...rest}>
      <Flex order={tokens.order.pages}>
        {first && (
          <>
            <Page onClick={onClick} pageCursor={first} getHref={getHref} />
            <Ellipsis />
          </>
        )}

        {around.map((pageCursor) => {
          return (
            <Page
              getHref={getHref}
              key={pageCursor.page}
              onClick={onClick}
              pageCursor={pageCursor}
            />
          )
        })}

        {last && (
          <>
            <Ellipsis />
            <Page onClick={onClick} pageCursor={last} getHref={getHref} />
          </>
        )}
      </Flex>

      <PrevButton
        order={tokens.order.prev}
        enabled={!!previous}
        getHref={getHref}
        onClick={handlePrevClick}
        page={previous?.page}
      />

      <NextButton
        order={tokens.order.next}
        enabled={hasNextPage}
        getHref={getHref}
        onClick={handleNextClick}
        page={nextPage}
      />
    </Flex>
  )
}

interface PageProps extends LinkProps {
  getHref?: (page: number) => string
  onClick?: (cursor: string, page: number, event: React.MouseEvent) => void
  pageCursor: PageCursor
}

const Page: React.FC<PageProps> = ({
  getHref,
  onClick,
  pageCursor: { cursor, isCurrent, page },
  ...rest
}) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    onClick(cursor, page, event)
  }

  const href = page && typeof getHref !== "undefined" ? getHref(page) : ""

  return (
    <Link
      href={href}
      onClick={handleClick}
      underlineBehavior="hover"
      borderRadius={2}
      px={0.5}
      display="flex"
      alignItems="center"
      bg={isCurrent ? "black5" : "white100"}
      {...rest}
    >
      <Text lineHeight={1} variant="mediumText">
        {page}
      </Text>
    </Link>
  )
}

export interface PageButtonProps extends LinkProps {
  enabled: boolean
  getHref?: (page: number) => string
  onClick: (event: React.MouseEvent) => void
  page?: number
}

const PrevButton: React.FC<PageButtonProps> = ({
  enabled,
  getHref,
  onClick,
  page,
  ...rest
}) => {
  const href =
    enabled && page && typeof getHref !== "undefined" ? getHref(page) : ""

  return (
    <Link
      href={href}
      onClick={onClick}
      underlineBehavior="hover"
      display="flex"
      alignItems="center"
      style={
        enabled
          ? {
              opacity: 1,
              pointerEvents: "inherit",
            }
          : {
              opacity: 0.1,
              pointerEvents: "none",
            }
      }
      {...rest}
    >
      <ChevronIcon direction="left" height={12} />

      <Text lineHeight={1} px={0.5} variant="mediumText">
        Prev
      </Text>
    </Link>
  )
}

const NextButton: React.FC<PageButtonProps> = ({
  enabled,
  getHref,
  onClick,
  page,
  ...rest
}) => {
  const href =
    enabled && page && typeof getHref !== "undefined" ? getHref(page) : ""

  return (
    <Link
      href={href}
      onClick={onClick}
      underlineBehavior="hover"
      display="flex"
      alignItems="center"
      style={
        enabled
          ? {
              opacity: 1,
              pointerEvents: "inherit",
            }
          : {
              opacity: 0.1,
              pointerEvents: "none",
            }
      }
      {...rest}
    >
      <Text lineHeight={1} px={0.5} variant="mediumText">
        Next
      </Text>

      <ChevronIcon direction="right" height={12} />
    </Link>
  )
}

const Ellipsis: React.FC = () => {
  return (
    <Text lineHeight={1} color="black30" mx={0.5} variant="mediumText">
      …
    </Text>
  )
}
