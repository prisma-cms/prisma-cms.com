import useExecuteChallenge from '../hooks/useExecuteChallenge'

export interface ToolPanelProps {
  // isMobile?: boolean,
  // openResetModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  openHelpModal: Function
  openVideoModal: Function
  videoUrl: string | null | undefined
  guideUrl: string | null | undefined
  executeChallenge: ReturnType<typeof useExecuteChallenge>
}
