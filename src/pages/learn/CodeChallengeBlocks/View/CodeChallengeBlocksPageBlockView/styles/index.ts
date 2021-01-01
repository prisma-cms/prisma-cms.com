import styled from 'styled-components'

const CodeChallengeBlocksPageBlockViewStyledBase = styled.div`
  box-shadow: 0 0 2px 1px #aaa;
  margin: 10px 0;
  padding: 10px;

  .title {
    text-transform: capitalize;
    font-size: 1.2rem;
    padding: 4px;
    display: inline-block;
    &.opener {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`

export const CodeChallengeBlocksPageBlockViewStyled = styled(
  CodeChallengeBlocksPageBlockViewStyledBase
)`
  ${CodeChallengeBlocksPageBlockViewStyledBase} {
    box-shadow: none;
    margin-left: 16px;

    .title {
      &.opener {
        font-size: 1rem;
        &:hover {
          background: lightgrey;
        }
      }
    }
  }
`
