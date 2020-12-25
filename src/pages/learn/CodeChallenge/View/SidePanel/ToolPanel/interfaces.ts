export interface ToolPanelProps {
  // isMobile?: boolean,
  // openResetModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  openHelpModal: Function
  openVideoModal: Function
  videoUrl: string | null | undefined
  guideUrl: string | null | undefined
}
