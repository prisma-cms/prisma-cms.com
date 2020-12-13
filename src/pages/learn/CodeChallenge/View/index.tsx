/* eslint-disable react/jsx-no-bind */
import React, { useCallback, useContext, useMemo } from 'react'
import DesktopLayout from './DesktopLayout'
import Editor from './Editor'
import { challengeTypes } from '../utils/challengeTypes'
import SidePanel from './SidePanel'
import Preview from './Preview/Preview'
import { CodeChallengeViewProps } from './interfaces'
import CodeChallengeOutputView from './Output'
import Context from '../Context'

const CodeChallengeView: React.FC<CodeChallengeViewProps> = (props) => {
  const { object } = props

  // const onResize = () => {
  //   this.setState({ resizing: true })
  // }

  // const onStopResize = () => {
  //   this.setState({ resizing: false })
  // }

  const context = useContext(Context)

  const output = useMemo(() => context?.logger.output ?? [], [
    context?.logger.output,
  ])

  const getChallengeFile = useCallback(() => {
    const { files } = object

    return files && Array.isArray(files) ? files[0] : null
  }, [object])

  const hasPreview = useMemo(() => {
    const { challengeType } = object

    return (
      challengeType === challengeTypes.html ||
      challengeType === challengeTypes.modern
    )
  }, [object])

  const saveEditorContent = () => {
    // eslint-disable-next-line no-console
    console.log('saveEditorContent')
  }

  const updateFile = () => {
    // eslint-disable-next-line no-console
    console.log('updateFile')
  }

  // const executeChallenge = useCallback((args: any) => {

  //   context?.logger.setOutput([]);

  //   // eslint-disable-next-line no-console
  //   console.log('executeChallenge args', { ...args })

  //   useExecuteChallenge

  // }, [context?.logger]);

  const setEditorFocusability = (args: any) => {
    // eslint-disable-next-line no-console
    console.log('setEditorFocusability args', { ...args })
  }

  const editor = useMemo(() => {
    const challengeFile = getChallengeFile()

    return (
      challengeFile && (
        <Editor
          saveEditorContent={saveEditorContent}
          updateFile={updateFile}
          // containerRef={containerRef}
          // ref={editorRef}
          {...challengeFile}
          // fileKey={challengeFile.key}

          // executeChallenge={executeChallenge}
          setEditorFocusability={setEditorFocusability}
        />
      )
    )
  }, [getChallengeFile])

  const sidePanel = useMemo(
    () => (
      <SidePanel
        // description={description}
        // guideUrl={getGuideUrl({ forumTopicId, title })}
        // instructions={instructions}
        // section={dasherize(blockName)}
        showToolPanel={true}
        // title={this.getBlockNameTitle()}
        // videoUrl={this.getVideoUrl()}
        className="full-height"
        object={object}
      />
    ),
    [object]
  )

  const preview = useMemo(
    () => (
      <Preview
        className="full-height"
        disableIframe={true}
        iframeStatus={true}
      />
    ),
    []
  )

  const testOutput = useMemo(() => {
    return <CodeChallengeOutputView output={output} />
  }, [output])

  return (
    <DesktopLayout
      challengeFile={getChallengeFile()}
      editor={editor}
      hasPreview={hasPreview}
      instructions={sidePanel}
      preview={preview}
      // resizeProps={this.resizeProps}
      testOutput={testOutput}
    />
  )
}

export default CodeChallengeView
