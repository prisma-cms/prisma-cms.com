import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Button } from '../styles'

import { DropdownButtonStyled } from './styles'

const DropdownButton: React.FC = ({ children }) => {
  const [opened, setOpened] = useState(false)

  /**
   * Если меню открыто
   */
  useEffect(() => {
    if (!opened) {
      return
    }

    const close = () => setOpened(false)

    global.document.addEventListener('click', close)

    return () => {
      global.document.removeEventListener('click', close)
    }
  })

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
