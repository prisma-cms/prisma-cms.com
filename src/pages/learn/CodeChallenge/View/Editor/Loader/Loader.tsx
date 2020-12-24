import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types';
// import Spinner from 'react-spinkit';

import Spinner from 'material-ui/Progress/CircularProgress'

import { CodeChallengeLoaderStyled } from './styles'
import { LoaderProps } from './interfaces'

const Loader: React.FC<LoaderProps> = ({ fullScreen, timeout }) => {
  const [showSpinner, setShowSpinner] = useState(!timeout)
  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined
    if (!showSpinner) {
      timerId = setTimeout(() => setShowSpinner(true), timeout)
    }
    return () => {
      timerId && clearTimeout(timerId)
    }
  }, [setShowSpinner, showSpinner, timeout])
  return (
    <CodeChallengeLoaderStyled
      className={`fcc-loader ${fullScreen ? 'full-screen-wrapper' : ''}`}
    >
      {showSpinner && <Spinner className="line-scale-pulse-out" />}
    </CodeChallengeLoaderStyled>
  )
}

Loader.displayName = 'Loader'
// Loader.propTypes = {
//   fullScreen: PropTypes.bool,
//   timeout: PropTypes.number
// };

export default Loader
