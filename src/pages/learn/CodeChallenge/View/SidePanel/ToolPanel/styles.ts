import styled, { css } from 'styled-components'

export const ToolPanelStyled = styled.div``

const buttonStyles = css`
  display: block;
  width: 100%;
  margin: 6px 0;
  /* padding: 10px; */
  font-size: 1.2rem;
  cursor: pointer;
  border: 2px solid grey;
  /* border-radius: 2px; */
  color: #333;
  line-height: 3rem;

  &:hover {
    background: #17528c;
    color: white;
  }
`

export const Button = styled.button`
  ${buttonStyles}
`

export const MenuItem = styled.a`
  ${buttonStyles}
`
