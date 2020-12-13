import styled from 'styled-components'

export const ChallengeDescriptionStyled = styled.div`
  &.challenge-instructions {
    blockquote {
      background-color: #f5f2f0;
      color: #555;
      padding: 10px;
      width: 100%;
      margin: 0;
      margin-bottom: 1.45rem;
      font-size: 0.9rem;
    }
  }

  #description p,
  #instructions p,
  #description ul,
  #instructions ul,
  #description ol,
  #instructions ol {
    font-family: 'Lato', sans-serif;
  }

  #instructions {
    font-size: 1rem;
  }
`
