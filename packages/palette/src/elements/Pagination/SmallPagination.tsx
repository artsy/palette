import React from "react"
import styled from "styled-components"
import { ChevronIcon } from "../../svgs/ChevronIcon"
import { BorderBox } from "../BorderBox"
import { Flex } from "../Flex"
import { Link } from "../Link"
import { NextPrevButtonProps, PaginationProps } from "./Pagination"

/**
 * SmallPagination
 * @deprecated Use Pagination
 */
export const SmallPagination: React.FC<PaginationProps> = (props) => {
  const {
    pageCursors: { previous },
    getHref,
    onClick,
    onNext,
    hasNextPage,
  } = props

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
    <Flex flexDirection="row" height="40px" width="100%">
      <PrevButton
        disabled={!previous}
        getHref={getHref}
        onClick={handlePrevClick}
        page={previous?.page}
      />
      <NextButton
        disabled={!hasNextPage}
        getHref={getHref}
        onClick={handleNextClick}
        page={nextPage}
      />
    </Flex>
  )
}

const Wrapper = styled(BorderBox)`
  border-radius: 3px;
  border-width: 2px;
  padding: 0;
  width: 50%;

  a {
    height: 100%;
    width: 100%;

    > div {
      align-items: center;
      height: 100%;
    }
  }
`

const PrevButton: React.FC<NextPrevButtonProps> = (props) => {
  const { disabled, getHref, onClick, page } = props
  const opacity = !disabled ? 1 : 0.1
  let href = ""

  if (!disabled && page && typeof getHref !== "undefined") {
    href = getHref(page)
  }

  return (
    <Wrapper mr={0.5} opacity={opacity}>
      <Link href={href} onClick={onClick}>
        <Flex justifyContent="flex-start" pl={1}>
          <ChevronIcon direction="left" />
        </Flex>
      </Link>
    </Wrapper>
  )
}

const NextButton: React.FC<NextPrevButtonProps> = (props) => {
  const { disabled, getHref, onClick, page } = props
  const opacity = !disabled ? 1 : 0.1
  let href = ""

  if (!disabled && page && typeof getHref !== "undefined") {
    href = getHref(page)
  }

  return (
    <Wrapper ml={0.5} opacity={opacity}>
      <Link href={href} onClick={onClick}>
        <Flex justifyContent="flex-end" pr={1}>
          <ChevronIcon direction="right" />
        </Flex>
      </Link>
    </Wrapper>
  )
}
