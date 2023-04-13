import React from "react"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Flex, FlexProps } from "../Flex"
import { Text } from "../Text"
import styled from "styled-components"
import { boxMixin, BoxProps } from "../Box"

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

export const PageLink = styled.a<BoxProps>`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  ${boxMixin}
`

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
  const handlePrevClick = (event: React.MouseEvent) => {
    if (previous) {
      onClick && onClick(previous.cursor, previous.page, event)
    }
  }

  const handleNextClick = (event: React.MouseEvent) => {
    onNext && onNext(event, nextPage)
  }

  const nextPage = (previous?.page || 0) + 2

  return (
    <Text
      as="nav"
      aria-label="Pagination"
      display="flex"
      variant="sm"
      lineHeight={1}
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      <NextPrevButton
        data-testid="prev"
        aria-label="Previous"
        getHref={getHref}
        onClick={handlePrevClick}
        page={previous?.page}
        disabled={!previous}
        pr={0.5}
      >
        <ChevronLeftIcon mr={0.5} height={12} width={12} />

        <span>Prev</span>
      </NextPrevButton>

      <Flex>
        {first && (
          <>
            <Page onClick={onClick} pageCursor={first} getHref={getHref} />
            <Flex alignItems="center" p={0.5} color="black60">
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
            <Flex alignItems="center" p={0.5} color="black60">
              …
            </Flex>

            <Page onClick={onClick} pageCursor={last} getHref={getHref} />
          </>
        )}
      </Flex>

      <NextPrevButton
        data-testid="next"
        getHref={getHref}
        onClick={handleNextClick}
        page={nextPage}
        disabled={!hasNextPage}
        pl={0.5}
      >
        <span>Next</span>

        <ChevronRightIcon ml={0.5} height={12} width={12} />
      </NextPrevButton>
    </Text>
  )
}

interface PageProps extends BoxProps {
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
    onClick && onClick(cursor, page, event)
  }

  const href = page && typeof getHref !== "undefined" ? getHref(page) : ""

  return (
    <PageLink
      href={href}
      onClick={handleClick}
      borderRadius={2}
      display="flex"
      alignItems="center"
      p={0.5}
      {...(isCurrent
        ? { color: "black100", "aria-current": "page" }
        : { color: "black60" })}
      {...rest}
    >
      {page}
    </PageLink>
  )
}

export interface NextPrevButtonProps extends BoxProps {
  disabled: boolean
  getHref?: (page: number) => string
  onClick: (event: React.MouseEvent) => void
  page?: number
}

const NextPrevButton: React.FC<NextPrevButtonProps> = ({
  disabled,
  getHref,
  onClick,
  page,
  children,
  ...rest
}) => {
  const href =
    !disabled && page && typeof getHref !== "undefined" ? getHref(page) : ""

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
    <PageLink
      href={href}
      onClick={onClick}
      display="flex"
      alignItems="center"
      py={0.5}
      style={
        !disabled
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
    </PageLink>
  )
}
