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

// import { ReflexElementProps } from 'react-reflex'

export interface DesktopLayoutProps {
  classes?: Record<string, string>
  // resizeProps: ReflexElementProps
  instructions: React.ReactNode
  challengeFile: {
    key: string
  }
  editor: React.ReactNode
  testOutput: React.ReactNode
  hasPreview: boolean
  preview: React.ReactNode
}
