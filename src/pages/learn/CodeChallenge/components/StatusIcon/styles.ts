import styled from 'styled-components'

export const CodeChallengeStatusIconStyled = styled.i`
  font-style: normal;
  width: 1rem;
  display: inline-block;

  .icon {
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    font-size: 1rem;
    margin-right: 6px;

    &.PROGRESS {
      font-size: 0.8rem;
    }

    &.OK {
      color: green;
    }
  }
`
