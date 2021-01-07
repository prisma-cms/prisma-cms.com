import React, { useCallback, useContext, useMemo } from 'react'

// import { openModal, executeChallenge } from '../redux';
import { ToolPanelProps } from './interfaces'

import { ToolPanelStyled, Button, MenuItem } from './styles'

import DropdownButton from './DropdownButton'
// import useExecuteChallenge from '../hooks/useExecuteChallenge'
import Context from '../../../Context'

// const mapStateToProps = () => ({});
// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       executeChallenge,
//       openHelpModal: () => openModal('help'),
//       openVideoModal: () => openModal('video'),
//       openResetModal: () => openModal('reset')
//     },
//     dispatch
//   );

const ToolPanel: React.FC<ToolPanelProps> = ({
  // isMobile,
  // openHelpModal,
  // openVideoModal,
  // openResetModal,
  guideUrl,
  videoUrl,
  executeChallenge,
}) => {
  // const openHelpModal = useCallback(() => {
  //   return null;
  // }, []);

  // const executeChallenge = useExecuteChallenge()

  const context = useContext(Context)

  const resetChallengeData = useCallback(() => {
    context?.resetChallengeData()
  }, [context])

  return useMemo(() => {
    const codeChallengeCompletion = context?.codeChallengeCompletion

    const user = context?.user

    const items: JSX.Element[] = []

    if (guideUrl) {
      items.push(
        <MenuItem
          key="guideUrl"
          href={guideUrl}
          target="_blank"
          rel="nofollow noindex noreferrer"
        >
          Подсказка
        </MenuItem>
      )
    }

    if (videoUrl) {
      items.push(
        <MenuItem
          // onClick={openVideoModal}
          key="videoUrl"
          href={videoUrl}
          target="_blank"
          rel="noreferrer"
        >
          Смотреть видео
        </MenuItem>
      )
    }

    return (
      <ToolPanelStyled className={'tool-panel-group button-group'}>
        <Button onClick={executeChallenge}>
          {user && !codeChallengeCompletion
            ? 'Приступить к выполнению'
            : 'Запустить тесты'}{' '}
          (Ctrl+Enter)
        </Button>

        <Button className="btn-invert" onClick={resetChallengeData}>
          Восстановить код
        </Button>

        {items.length ? (
          <DropdownButton>
            {/* <MenuItem
        onClick={openHelpModal}
      >
        Обсудить на форуме
      </MenuItem> */}
            {items}
          </DropdownButton>
        ) : null}
      </ToolPanelStyled>
    )
  }, [
    context?.codeChallengeCompletion,
    context?.user,
    executeChallenge,
    guideUrl,
    resetChallengeData,
    videoUrl,
  ])
}

ToolPanel.displayName = 'ToolPanel'

export default ToolPanel

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ToolPanel);
