import React from "react"
import styled from "styled-components"
import { color } from "../../helpers/color"
import { space } from "../../helpers/space"
import { ChevronIcon } from "../../svgs/ChevronIcon"
import { Flex } from "../Flex"

import { Props, PageButton } from "./LargePagination"

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
    <Flex flexDirection="row" width="100%">
      <PrevButton enabled={!!previous} onClick={handlePrevClick} />
      <NextButton enabled={hasNextPage} onClick={handleNextClick} />
    </Flex>
  )
}

const PrevButton: React.FC<PageButton> = props => {
  const { enabled, onClick } = props
  const opacity = enabled ? 1 : 0.1

  return (
    <Flex opacity={opacity} pr={0.5} width="50%">
      <ButtonWithBorder
        alignItems="center"
        justifyContent="flex-start"
        onClick={onClick}
        pl={1}
      >
        <ChevronIcon direction="left" />
      </ButtonWithBorder>
    </Flex>
  )
}

const NextButton: React.FC<PageButton> = props => {
  const { enabled, onClick } = props
  const opacity = enabled ? 1 : 0.1

  return (
    <Flex opacity={opacity} pl={0.5} width="50%">
      <ButtonWithBorder
        alignItems="center"
        justifyContent="flex-end"
        onClick={onClick}
        pr={1}
      >
        <ChevronIcon direction="right" />
      </ButtonWithBorder>
    </Flex>
  )
}

const ButtonWithBorder = styled(Flex)`
  border: ${props => props.theme.borders[1]};
  border-color: ${color("black10")};
  border-radius: 3px;
  width: 100%;
  height: ${space(4)}px;
  cursor: pointer;
`

// Tests
ButtonWithBorder.displayName = "ButtonWithBorder"
