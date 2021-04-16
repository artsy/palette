import React from "react"
import { ChevronIcon } from "../../svgs/ChevronIcon"
import { useThemeConfig } from "../../Theme"
import { Flex, FlexProps } from "../Flex"
import { Link, LinkProps } from "../Link"
import { Text, TextVariant } from "../Text"

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

/** Pagination */
export const Pagination: React.FC<PaginationProps> = ({
  getHref,
  hasNextPage,
  onClick,
  onNext,
  pageCursors: { around, first, last, previous },
  ...rest
}) => {
  const tokens = useThemeConfig({
    v2: {
      order: { pages: 1, prev: 2, next: 3 },
      textVariant: "mediumText" as TextVariant,
      containerProps: {
        flexDirection: "row",
        justifyContent: "flex-end",
        mr: -1,
      } as FlexProps,
      pagesProps: { pr: 4 },
      ellipsisProps: { color: "black30" },
    },
    v3: {
      order: { prev: 1, pages: 2, next: 3 },
      textVariant: "sm" as TextVariant,
      containerProps: { justifyContent: "space-between" },
      pagesProps: {},
      ellipsisProps: { color: "black60" },
    },
  })

  const handlePrevClick = (event: React.MouseEvent) => {
    if (previous) {
      onClick(previous.cursor, previous.page, event)
    }
  }

  const handleNextClick = (event: React.MouseEvent) => {
    onNext(event, nextPage)
  }

  const nextPage = (previous?.page || 0) + 2

  return (
    <Text
      as="nav"
      aria-label="Pagination"
      display="flex"
      variant={tokens.textVariant}
      lineHeight={1}
      alignItems="center"
      {...tokens.containerProps}
      {...rest}
    >
      <Flex order={tokens.order.pages} {...tokens.pagesProps}>
        {first && (
          <>
            <Page onClick={onClick} pageCursor={first} getHref={getHref} />
            <Flex alignItems="center" p={0.5} {...tokens.ellipsisProps}>
              …
            </Flex>
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
            <Flex alignItems="center" p={0.5} {...tokens.ellipsisProps}>
              …
            </Flex>
            <Page onClick={onClick} pageCursor={last} getHref={getHref} />
          </>
        )}
      </Flex>

      <NextPrevButton
        data-testid="prev"
        aria-label="Previous"
        order={tokens.order.prev}
        enabled={!!previous}
        getHref={getHref}
        onClick={handlePrevClick}
        page={previous?.page}
        disabled={!first}
        pr={0.5}
      >
        <ChevronIcon
          pr={0.5}
          direction="left"
          height={12}
          fill={"currentColor" as any}
        />

        <span>Prev</span>
      </NextPrevButton>

      <NextPrevButton
        data-testid="next"
        order={tokens.order.next}
        enabled={hasNextPage}
        getHref={getHref}
        onClick={handleNextClick}
        page={nextPage}
        disabled={!last}
        pl={0.5}
      >
        <span>Next</span>

        <ChevronIcon
          pl={0.5}
          direction="right"
          height={12}
          fill={"currentColor" as any}
        />
      </NextPrevButton>
    </Text>
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
  const tokens = useThemeConfig({
    v2: {
      states: {
        inactive: { bg: "transparent" },
        active: { bg: "black5" },
      },
    },
    v3: {
      states: {
        inactive: { color: "black60" },
        active: { color: "black100" },
      },
    },
  })

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
      display="flex"
      alignItems="center"
      p={0.5}
      {...(isCurrent
        ? { ...tokens.states.active, "aria-current": "page" }
        : tokens.states.inactive)}
      {...rest}
    >
      {page}
    </Link>
  )
}

export interface NextPrevButtonProps extends LinkProps {
  disabled?: boolean
  enabled: boolean
  getHref?: (page: number) => string
  onClick: (event: React.MouseEvent) => void
  page?: number
}

const NextPrevButton: React.FC<NextPrevButtonProps> = ({
  disabled,
  enabled,
  getHref,
  onClick,
  page,
  children,
  ...rest
}) => {
  const href =
    enabled && page && typeof getHref !== "undefined" ? getHref(page) : ""

  if (disabled) {
    return (
      <Flex
        display="flex"
        alignItems="center"
        color="black30"
        py={0.5}
        {...rest}
      >
        {children}
      </Flex>
    )
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      underlineBehavior="hover"
      display="flex"
      alignItems="center"
      py={0.5}
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
      {children}
    </Link>
  )
}

/**
 * Alias of Pagination
 * @deprecated Use `Pagination`
 */
export const LargePagination = Pagination
