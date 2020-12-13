import styled from 'styled-components'

export const TestSuiteStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 15px 0;

  /* .icon--Initial {
    background-color: lightgrey;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;

    &.pass {
      color: green;
    }
  } */

  code {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  .test-result {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 10px;
  }

  .test-result:nth-child(odd) {
    background-color: #efefef;
  }

  .test-output {
    padding: 5px 10px;
  }

  .test-output p {
    margin: 0;
  }

  .test-status-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    font-size: 16px;
    background-color: lightgrey;
    border-radius: 50%;

    .success {
      color: green;
      font-size: 22px;
    }
    .failure {
      color: red;
      font-size: 22px;
    }
  }
  /* 
  .test-status-icon > svg {
    width: 40px;
    height: 40px;
  } */
`
