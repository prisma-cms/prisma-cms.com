import styled from 'styled-components'

export const CodeChallengeLoaderStyled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .sk-spinner {
    color: var(--secondary-color);
  }

  &.full-screen-wrapper {
    height: calc(100vh - var(--header-height, 0px));
    .sk-spinner {
      transform: scale(2);
    }
  }
`
