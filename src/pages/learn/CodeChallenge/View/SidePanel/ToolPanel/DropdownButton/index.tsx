import React, { useCallback, useMemo, useState } from 'react'

import { Button } from '../styles'

import { DropdownButtonStyled } from './styles'

const DropdownButton: React.FC = ({ children }) => {
  const [opened, setOpened] = useState(false)

  const content = useMemo(() => {
    if (!opened) {
      return null
    }

    return <div className="DropdownButton--menu-wrapper">{children}</div>
  }, [children, opened])

  const toggleOpener = useCallback(() => {
    setOpened(!opened)
  }, [opened])

  return (
    <DropdownButtonStyled>
      <Button onClick={toggleOpener}>Помощь</Button>
      {content}
    </DropdownButtonStyled>
  )
}

export default DropdownButton
