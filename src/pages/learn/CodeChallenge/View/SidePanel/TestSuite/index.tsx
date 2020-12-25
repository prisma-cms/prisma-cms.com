import React, { useContext } from 'react'
import Context from '../../../Context'
import { TestSuiteProps } from './interfaces'
import { TestSuiteStyled } from './styles'

export * from './interfaces'

// import GreenPass from '../../../assets/icons/GreenPass';
// import Fail from '../../../assets/icons/Fail';
// import Initial from '../../../assets/icons/Initial';

function getAccessibleText(err: any, pass: boolean | undefined, text: string) {
  let accessibleText = 'Waiting'
  const cleanText = text.replace(/<\/?code>/g, '')

  // Determine test status (i.e. icon)
  if (err) {
    accessibleText = 'Error'
  } else if (pass) {
    accessibleText = 'Pass'
  }

  // Append the text itself
  return accessibleText + ' - ' + cleanText
}

const TestSuite: React.FC<TestSuiteProps> = ({ tests }) => {
  // console.log('TestSuite tests', tests);

  const context = useContext(Context)

  const testsResults = context?.testsResults ?? []

  return (
    <TestSuiteStyled className="challenge-test-suite">
      {tests.map(
        (
          {
            // err,
            // pass = false,
            text = '',
          },
          index
        ) => {
          const result = testsResults ? testsResults[index] : null

          // console.log('TestSuite test result', result);

          const pass = result?.pass
          const err = result?.err

          // const isInitial = !pass && !err
          const isInitial = pass === undefined

          const statusIcon = pass ? (
            <span className="success">✓</span>
          ) : (
            <span className="failure">✕</span>
          )
          return (
            <div
              aria-label={getAccessibleText(err, pass, text)}
              className="test-result"
              key={text.slice(-6) + index}
            >
              <div className="test-status-icon">
                {isInitial ? (
                  <span
                    className={['icon--Initial', pass ? 'pass' : ''].join(' ')}
                  >
                    ⌛
                  </span>
                ) : (
                  statusIcon
                )}
              </div>
              <div
                aria-hidden="true"
                className="test-output"
                dangerouslySetInnerHTML={{ __html: text }}
                // xs={10}
              />
            </div>
          )
        }
      )}
    </TestSuiteStyled>
  )
}

TestSuite.displayName = 'TestSuite'

export default TestSuite
