import { color, Sans, space } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

export const PropsTable = _props => {
  return (
    <Table>
      <thead>
        <tr>
          <THead>Prop</THead>
          <THead>Type</THead>
          <THead>Description</THead>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Base</td>
          <td>Bool</td>
          <td>Select open state</td>
        </tr>
        <tr>
          <td>Base</td>
          <td>Bool</td>
          <td>Select open state</td>
        </tr>
        <tr>
          <td>Base</td>
          <td>Bool</td>
          <td>Select open state</td>
        </tr>
      </tbody>
    </Table>
  )
}

const Table = styled.table`
  margin-top: ${space(2)}px;
  width: 100%;
  border-collapse: collapse;
  border-bottom: 1px solid ${color("black30")};

  th {
    text-align: left;
    padding: ${space(0.5)}px 0 ${space(0.5)}px 0;
  }

  tr {
    border: 1px solid ${color("black30")};
    border-width: 1px 0;

    &:last-child {
      border: 0;
    }
  }

  td {
    font-family: Menlo;
    font-size: 12px;
    color: ${color("black60")};
    padding: ${space(0.5)}px 0 ${space(0.5)}px 0;
  }
`

const THead = ({ children }) => {
  return (
    <th>
      <Sans size="2" weight="medium">
        {children}
      </Sans>
    </th>
  )
}
