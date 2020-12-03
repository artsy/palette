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

  return (
    <Flex
      flexDirection="row"
      justifyContent="flex-end"
      alignItems="baseline"
      mr={-1}
    >
      {first && (
        <div>
          {renderPage(first, onClick)}
          <PageSpan mx={0.5} />
        </div>
      )}

      {around.map(pageInfo => renderPage(pageInfo, onClick))}

      {last && (
        <div>
          <PageSpan mx={0.5} />
          {renderPage(last, onClick)}
        </div>
      )}

      <Box ml={4}>
        <PrevButton
          disabled={!previous}
          onClick={() => {
            if (previous) {
              props.onClick(previous.cursor, previous.page)
            }
          }}
        />
        <NextButton disabled={!hasNextPage} onClick={() => onNext()} />
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

const PrevButton = ({ onClick, disabled }) => {
  return (
    <PrevNextContainer className={disabled ? "disabled" : null}>
      <Sans size="3" weight="medium" display="inline" mx={0.5}>
        <a onClick={() => onClick()} className="noUnderline">
          <ChevronIcon direction="left" top={0.5} /> Prev
        </a>
      </Sans>
    </PrevNextContainer>
  )
}

const NextButton = ({ onClick, disabled }) => {
  return (
    <PrevNextContainer className={disabled ? "disabled" : null}>
      <Sans size="3" weight="medium" display="inline" mx={0.5}>
        <a onClick={() => onClick()} className="noUnderline">
          Next <ChevronIcon direction="right" top={0.5} />
        </a>
      </Sans>
    </PrevNextContainer>
  )
}

const PrevNextContainer = styled.span`
  &.disabled {
    opacity: 0.1;
  }
`

// Tests
PrevButton.displayName = "PrevButton"
NextButton.displayName = "NextButton"
