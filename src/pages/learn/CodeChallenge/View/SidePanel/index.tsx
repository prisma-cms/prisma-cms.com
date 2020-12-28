import React, { useCallback, useMemo } from 'react'
import { CodeChallengeTest } from '../../interfaces'
import ChallengeDescription from './ChallengeDescription'
import ChallengeTitle from './ChallengeTitle'
import { SidePanelProps } from './interfaces'
import { SidePanelStyled } from './styles'
import TestSuite from './TestSuite'
import ToolPanel from './ToolPanel'

const SidePanel: React.FC<SidePanelProps> = ({
  object,
  showToolPanel,
  executeChallenge,
}) => {
  const { forumTopicId, description, instructions, videoUrl } = object

  const openHelpModal = useCallback(() => {
    // eslint-disable-next-line no-console
    // console.log('openHelpModal')
  }, [])
  // const openResetModal = useCallback(() => {
  //   // eslint-disable-next-line no-console
  //   console.log('openResetModal')
  // }, [])
  const openVideoModal = useCallback(() => {
    // eslint-disable-next-line no-console
    // console.log('openVideoModal')
  }, [])

  const title = object.localeTitle || object.name

  const isChallengeCompleted = true

  const tests = useMemo(() => (object.tests || []) as CodeChallengeTest[], [
    object.tests,
  ])

  const toolPanel = useMemo(
    () =>
      showToolPanel ? (
        <ToolPanel
          guideUrl={
            forumTopicId
              ? `https://forum.freecodecamp.org/t/${forumTopicId}`
              : null
          }
          videoUrl={videoUrl}
          openHelpModal={openHelpModal}
          // openResetModal={openResetModal}
          openVideoModal={openVideoModal}
          executeChallenge={executeChallenge}
        />
      ) : null,
    [
      executeChallenge,
      forumTopicId,
      openHelpModal,
      openVideoModal,
      showToolPanel,
      videoUrl,
    ]
  )

  return (
    <SidePanelStyled
      className="instructions-panel"
      role="complementary"
      tabIndex={-1}
    >
      <ChallengeTitle isCompleted={isChallengeCompleted}>
        {title}
      </ChallengeTitle>
      <ChallengeDescription
        description={description || ''}
        instructions={instructions || ''}
        // section={section}
      />
      {toolPanel}
      <TestSuite tests={tests} />
    </SidePanelStyled>
  )
}

export default SidePanel
