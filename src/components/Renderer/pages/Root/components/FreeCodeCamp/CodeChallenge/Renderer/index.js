import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DesktopLayout from './DesktopLayout'
import Editor from './Editor'
import { challengeTypes } from '../utils/challengeTypes'
import SidePanel from './SidePanel/SidePanel'
import Preview from './Preview/Preview'

class CodeChallengeRenderer extends PureComponent {
  static propTypes = {
    object: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor() {
    super()

    this.resizeProps = {
      onStopResize: this.onStopResize.bind(this),
      onResize: this.onResize.bind(this),
    }

    this.state = {
      resizing: false,
      focused: false,
    }

    this.containerRef = React.createRef()
    this.editorRef = React.createRef()
  }

  onResize() {
    this.setState({ resizing: true })
  }

  onStopResize() {
    this.setState({ resizing: false })
  }

  getObject() {
    const { object } = this.props

    // console.log('getChallengeFile getObject', object);

    return object
  }

  getChallenge = () => this.getObject()

  getChallengeFile() {
    const { files } = this.getObject() || {}
    // return first(Object.keys(files).map(key => files[key]));

    // console.log('getChallengeFile files', files);

    return files ? files[0] : null
  }

  hasPreview() {
    const { challengeType } = this.getChallenge()

    // console.log('challengeType', challengeType, challengeTypes.html, challengeTypes.modern);

    return (
      challengeType === challengeTypes.html ||
      challengeType === challengeTypes.modern
    )
  }

  renderEditor() {
    // const { files } = this.props;
    // const challengeFile = first(Object.keys(files).map(key => files[key]));

    const challengeFile = this.getChallengeFile()

    return (
      challengeFile && (
        <Editor
          containerRef={this.containerRef}
          ref={this.editorRef}
          {...challengeFile}
          fileKey={challengeFile.key}
          executeChallenge={this.executeChallenge()}
          setEditorFocusability={this.setEditorFocusability()}
        />
      )
    )
  }

  renderInstructionsPanel() {
    const {
      // fields: { blockName },
      description,
      // instructions
    } = this.getChallenge()

    // const { forumTopicId, title } = this.getChallenge();
    return (
      <SidePanel
        className="full-height"
        description={description}
        // guideUrl={getGuideUrl({ forumTopicId, title })}
        // instructions={instructions}
        // section={dasherize(blockName)}
        // showToolPanel={showToolPanel}
        // title={this.getBlockNameTitle()}
        // videoUrl={this.getVideoUrl()}
      />
    )
  }

  renderPreview() {
    return (
      <Preview className="full-height" disableIframe={this.state.resizing} />
    )
  }

  renderTestOutput() {
    // const { output } = this.props;

    const message = `
    /**
    * Your test output will go here.
    */
    `

    return (
      <pre
        className="output-text"
        dangerouslySetInnerHTML={{ __html: message }}
      />
    )

    //     return (
    //       <Output
    //         defaultOutput={`
    // /**
    // * Your test output will go here.
    // */
    // `}
    //         output={output}
    //       />
    //     );
  }

  executeChallenge = () => () => {
    // console.log('executeChallenge args', { ...args });
  }

  setEditorFocusability = () => () => {
    // console.log('setEditorFocusability args', { ...args });
  }

  render() {
    // console.log('CodeChallengeRenderer object', object);

    return (
      <DesktopLayout
        challengeFile={this.getChallengeFile()}
        editor={this.renderEditor()}
        hasPreview={this.hasPreview()}
        instructions={this.renderInstructionsPanel({
          showToolPanel: true,
        })}
        preview={this.renderPreview()}
        resizeProps={this.resizeProps}
        testOutput={this.renderTestOutput()}
      />
    )
  }
}

export default CodeChallengeRenderer
