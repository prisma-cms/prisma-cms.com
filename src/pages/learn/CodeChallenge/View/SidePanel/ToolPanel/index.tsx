import React from 'react'

// import { openModal, executeChallenge } from '../redux';
import { ToolPanelProps } from './interfaces'

import { ToolPanelStyled, Button, MenuItem } from './styles'

import DropdownButton from './DropdownButton'
import useExecuteChallenge from '../hooks/useExecuteChallenge'

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
  openResetModal,
  guideUrl,
  videoUrl,
}) => {
  // const openHelpModal = useCallback(() => {
  //   return null;
  // }, []);

  const executeChallenge = useExecuteChallenge()

  return (
    <ToolPanelStyled className={'tool-panel-group button-group'}>
      <Button onClick={executeChallenge}>Запустить тесты</Button>
      <Button className="btn-invert" onClick={openResetModal}>
        Восстановить код
      </Button>
      <DropdownButton>
        {guideUrl ? (
          <MenuItem
            href={guideUrl}
            target="_blank"
            rel="nofollow noindex noreferrer"
          >
            Подсказка
          </MenuItem>
        ) : null}
        {videoUrl ? (
          <MenuItem
            // onClick={openVideoModal}
            href={videoUrl}
            target="_blank"
            rel="noreferrer"
          >
            Смотреть видео
          </MenuItem>
        ) : null}
        {/* <MenuItem
          onClick={openHelpModal}
        >
          Обсудить на форуме
        </MenuItem> */}
      </DropdownButton>
    </ToolPanelStyled>
  )
}

ToolPanel.displayName = 'ToolPanel'

export default ToolPanel

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ToolPanel);
