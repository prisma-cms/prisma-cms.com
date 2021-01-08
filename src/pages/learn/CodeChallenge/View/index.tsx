import React, { useCallback, useContext, useMemo } from 'react'
import dynamic from 'next/dynamic'
import DesktopLayout from './DesktopLayout'
import Editor from './Editor'
import { challengeTypes } from '../utils/challengeTypes'
import SidePanel from './SidePanel'
import { CodeChallengeViewProps } from './interfaces'
import CodeChallengeOutputView from './Output'
import Context from '../Context'
import useExecuteChallenge from '../hooks/useExecuteChallenge'

// import Preview from './Preview'

/**
 * Не рендерим на сервере, потому что фрейм не срабатывает событие onLoad
 */
const Preview = dynamic(import('./Preview'), { ssr: false })

const CodeChallengeView: React.FC<CodeChallengeViewProps> = (props) => {
  const { object, codeChallengeCompletion, tabIndex, topicId } = props

  // const onResize = () => {
  //   this.setState({ resizing: true })
  // }

  // const onStopResize = () => {
  //   this.setState({ resizing: false })
  // }

  const context = useContext(Context)

  const challengeFile = context?.challengeData.file ?? null
  const challenge = context?.challenge

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

  const editor = challengeFile && (
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
        codeChallengeCompletion={codeChallengeCompletion}
      />
    ),
    [executeChallenge, object, codeChallengeCompletion]
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

  if (!challenge?.id) {
    return null
  }

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
      tabIndex={tabIndex}
      topicId={topicId}
      challenge={challenge}
    />
  )
}

export default CodeChallengeView
