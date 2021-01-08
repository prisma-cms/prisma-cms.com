//   classes: PropTypes.object.isRequired,
//   challengeFile: PropTypes.shape({
//     key: PropTypes.string
//   }),
//   editor: PropTypes.element,
//   hasPreview: PropTypes.bool,
//   instructions: PropTypes.element,
//   preview: PropTypes.element,
//   resizeProps: PropTypes.shape({
//     onStopResize: PropTypes.func,
//     onResize: PropTypes.func
//   }),
//   testOutput: PropTypes.element

import { CodeChallenge_Fragment } from 'src/modules/gql/generated'
import { TestFile } from '../../Context'
import { CodeChallengeDiscussProps } from './Discuss/interfacse'

// import { ReflexElementProps } from 'react-reflex'

export enum DesktopLayoutTabIndex {
  Root = '',
  Discuss = 'discuss',
}

export interface DesktopLayoutProps {
  // classes?: Record<string, string>
  // resizeProps: ReflexElementProps
  instructions: React.ReactNode
  // challengeFile: {
  //   key: string
  // }
  challengeFile: TestFile | null
  editor: React.ReactNode
  testOutput: React.ReactNode
  hasPreview: boolean
  preview: React.ReactNode
  tabIndex: DesktopLayoutTabIndex
  challenge: CodeChallenge_Fragment
  topicId: CodeChallengeDiscussProps['topicId']
}
