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

  return (
    <Flex
      flexDirection="row"
      justifyContent="flex-end"
      alignItems="baseline"
      mr={-1}
    >
      {first && (
        <>
          {renderPage(first, onClick)}
          <PageSpan mx={0.5} />
        </>
      )}

      {around.map(pageInfo => renderPage(pageInfo, onClick))}

      {last && (
        <>
          <PageSpan mx={0.5} />
          {renderPage(last, onClick)}
        </>
      )}

      <Box ml={4}>
        <PrevButton enabled={previous} onClick={handlePrevClick} />
        <NextButton enabled={hasNextPage} onClick={handleNextClick} />
      </Box>
    </Flex>
  )
}

const PageSpan = ({ mx }) => {
  return (
    <Sans size="3" display="inline" mx={mx} color="black30">
      ...
    </Sans>
  )
}

const renderPage = (
  pageCursor,
  onClick: (cursor: string, page: number) => void
) => {
  const { cursor, isCurrent, page } = pageCursor
  return (
    <Page
      onClick={() => onClick(cursor, page)}
      num={page}
      active={isCurrent}
      key={cursor + page}
    />
  )
}

const Page = ({ num, onClick, ...props }) => {
  return (
    <Button {...props} onClick={() => onClick()}>
      <Sans size="3" weight="medium" display="inline">
        {num}
      </Sans>
    </Button>
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
    <span style={{ opacity: opacity }}>
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
    <span style={{ opacity: opacity }}>
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
