import React, { useCallback, useContext, useMemo } from 'react'
import DesktopLayout from './DesktopLayout'
import Editor from './Editor'
import { challengeTypes } from '../utils/challengeTypes'
import SidePanel from './SidePanel'
import Preview from './Preview'
import { CodeChallengeViewProps } from './interfaces'
import CodeChallengeOutputView from './Output'
import Context from '../Context'
import useExecuteChallenge from './SidePanel/hooks/useExecuteChallenge'

const CodeChallengeView: React.FC<CodeChallengeViewProps> = (props) => {
  const { object } = props

  // const onResize = () => {
  //   this.setState({ resizing: true })
  // }

  // const onStopResize = () => {
  //   this.setState({ resizing: false })
  // }

  const context = useContext(Context)

  const challengeFile = context?.challengeData.file ?? null

  // const contents = context?.challengeData.file.contents || ""

  const output = useMemo(() => context?.logger.output ?? [], [
    context?.logger.output,
  ])

  // const getChallengeFile = useCallback((): TestFile | null => {
  //   const { files } = object

  //   return files && Array.isArray(files) ? files[0] : null
  // }, [object])

  const hasPreview = useMemo(() => {
    const { challengeType } = object

    return (
      challengeType === challengeTypes.html ||
      challengeType === challengeTypes.modern
    )
  }, [object])

  const saveEditorContent = useCallback(() => {
    // eslint-disable-next-line no-console
    // console.log('saveEditorContent')
  }, [])

  const updateFile = useCallback(
    ({ editorValue }: { key: string; editorValue: string }) => {
      if (!context) {
        return
      }

      const challengeData = context.challengeData

      const file = challengeData.file

      context.setChallengeData({
        ...challengeData,
        file: {
          ...file,
          contents: editorValue,
        },
      })

      // const challengeData = context?.challengeData

      // context?.setContents(editorValue);
    },
    [context]
  )

  const executeChallenge = useExecuteChallenge()

  const setEditorFocusability = useCallback((_args: any) => {
    // eslint-disable-next-line no-console
    // console.log('setEditorFocusability args', { ...args })
  }, [])

  const editor = useMemo(() => {
    // const challengeFile = getChallengeFile()

    return (
      challengeFile && (
        <Editor
          {...challengeFile}
          saveEditorContent={saveEditorContent}
          updateFile={updateFile}
          // containerRef={containerRef}
          // ref={editorRef}
          // fileKey={challengeFile.key}
          contents={challengeFile.contents}
          executeChallenge={executeChallenge}
          setEditorFocusability={setEditorFocusability}
        />
      )
    )
  }, [
    challengeFile,
    executeChallenge,
    saveEditorContent,
    setEditorFocusability,
    updateFile,
  ])

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
        executeChallenge={executeChallenge}
      />
    ),
    [executeChallenge, object]
  )

  const preview = useMemo(
    () => (
      <Preview
        className="full-height"
        disableIframe={false}
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
      // challengeFile={getChallengeFile()}
      challengeFile={challengeFile}
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
