import React from "react"
import styled, { css } from "styled-components"
import { color } from "../../helpers/color"
import { ChevronIcon } from "../../svgs/ChevronIcon"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Sans } from "../Typography"

export interface Props {
  onClick?: (cursor: string, page: number) => void
  onNext?: () => void
  pageCursors: any
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
        <PrevButton enabled={previous} onClick={handlePrevClick} />
        <NextButton enabled={hasNextPage} onClick={handleNextClick} />
      </Box>
    </Flex>
  )
}

const Page = ({ onClick, pageCursor }) => {
  const { cursor, isCurrent, page } = pageCursor

  const handleClick = () => {
    onClick(cursor, page)
  }

  return (
    <Button active={isCurrent} onClick={handleClick}>
      <Sans size="3" weight="medium" display="inline">
        {page}
      </Sans>
    </Button>
  )
}

const DotDotDot = () => {
  return (
    <Sans size="3" display="inline" mx={0.5} color="black30">
      ...
    </Sans>
  )
}

const FirstPage = ({ onClick, pageCursor }) => {
  return (
    <>
      <Page onClick={onClick} pageCursor={pageCursor} />
      <DotDotDot />
    </>
  )
}

const LastPage = ({ onClick, pageCursor }) => {
  return (
    <>
      <DotDotDot />
      <Page onClick={onClick} pageCursor={pageCursor} />
    </>
  )
}

const activeButton = css`
  background: ${color("black5")};
  border-radius: 2px;
  border: 0;
`

const Button = styled.button<{ active?: boolean }>`
  cursor: pointer;
  width: min-content;
  height: 25px;
  background: transparent;
  border: 0;

  outline: 0;

  ${p => p.active && activeButton};

  &:hover {
    ${activeButton};
  }
`

const PrevButton = ({ enabled, onClick }) => {
  const opacity = enabled ? 1 : 0.1

  return (
    <span style={{ opacity }}>
      <Sans size="3" weight="medium" display="inline" mx={0.5}>
        <a onClick={onClick} className="noUnderline">
          <ChevronIcon direction="left" top={0.5} /> Prev
        </a>
      </Sans>
    </span>
  )
}

const NextButton = ({ enabled, onClick }) => {
  const opacity = enabled ? 1 : 0.1

  return (
    <span style={{ opacity }}>
      <Sans size="3" weight="medium" display="inline" mx={0.5}>
        <a onClick={onClick} className="noUnderline">
          Next <ChevronIcon direction="right" top={0.5} />
        </a>
      </Sans>
    </span>
  )
}

// Tests
PrevButton.displayName = "PrevButton"
NextButton.displayName = "NextButton"
