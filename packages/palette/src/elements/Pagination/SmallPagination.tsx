import React from "react"
import styled from "styled-components"
import { ChevronIcon } from "../../svgs/ChevronIcon"
import { BorderBox } from "../BorderBox"
import { Flex } from "../Flex"
import { Link } from "../Link"

import { PageButton, Props } from "./LargePagination"

/** SmallPagination */
export const SmallPagination = (props: Props) => {
  const {
    pageCursors: { previous },
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

  return (
    <Flex flexDirection="row" height="40px" width="100%">
      <PrevButton enabled={!!previous} onClick={handlePrevClick} />
      <NextButton enabled={hasNextPage} onClick={handleNextClick} />
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

const PrevButton: React.FC<PageButton> = props => {
  const { enabled, onClick } = props
  const opacity = enabled ? 1 : 0.1
  const href = ""

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

const NextButton: React.FC<PageButton> = props => {
  const { enabled, onClick } = props
  const opacity = enabled ? 1 : 0.1
  const href = ""

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
